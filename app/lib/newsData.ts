import fs from 'fs';
import path from 'path';
import { NewsData, NewsCategory } from '@/app/news/data';

// Ścieżka do pliku z danymi
const dataFilePath = path.join(process.cwd(), 'app/data', 'news.json');

// Funkcja pomocnicza do generowania ID newsa
function generateNewsId(title: string, date: string): string {
  // Format daty: YYYY-MM-DD
  const [year, month, day] = date.split('-');
  const monthNames: Record<string, string> = {
    '01': 'styczen',
    '02': 'luty',
    '03': 'marzec',
    '04': 'kwiecien',
    '05': 'maj',
    '06': 'czerwiec',
    '07': 'lipiec',
    '08': 'sierpien',
    '09': 'wrzesien',
    '10': 'pazdziernik',
    '11': 'listopad',
    '12': 'grudzien'
  };
  
  const monthName = monthNames[month] || 'unknown';
  return `news-${day}-${monthName}-${year}`;
}

// Funkcja do odczytu danych z pliku
export function readNewsData(): { news: Record<string, NewsData> } {
  try {
    // Sprawdź czy plik istnieje
    if (!fs.existsSync(dataFilePath)) {
      // Jeśli nie istnieje, utwórz go z domyślnymi danymi
      const defaultData = {
        news: {
          "1": {
            id: "1",
            title: "Witaj w panelu administracyjnym",
            date: "2023-04-01",
            category: "ogłoszenie" as NewsCategory,
            shortDescription: "Pierwszy news w systemie zarządzania treścią.",
            fullDescription: "To jest pierwszy news w systemie zarządzania treścią. Możesz go edytować lub usunąć, aby zobaczyć jak działa system.",
            image: "/images/news/default.jpg",
            gallery: [],
            important: true,
            author: "Stylowy",
            links: []
          }
        }
      };
      
      // Utwórz katalog jeśli nie istnieje
      const dir = path.dirname(dataFilePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      // Zapisz domyślne dane
      fs.writeFileSync(dataFilePath, JSON.stringify(defaultData, null, 2));
      return defaultData;
    }
    
    // Odczytaj dane z pliku
    const fileContent = fs.readFileSync(dataFilePath, 'utf8');
    const data = JSON.parse(fileContent);
    
    // Upewnij się, że wszystkie kategorie są zgodne z typem NewsCategory
    Object.keys(data.news).forEach(key => {
      const news = data.news[key];
      if (typeof news.category === 'string' && !isValidNewsCategory(news.category)) {
        // Jeśli kategoria nie jest prawidłowa, ustaw domyślną wartość
        news.category = 'ogłoszenie' as NewsCategory;
      }
    });
    
    return data;
  } catch (error) {
    console.error('Błąd podczas odczytu danych newsów:', error);
    return { news: {} };
  }
}

// Funkcja pomocnicza do sprawdzania, czy kategoria jest prawidłowa
function isValidNewsCategory(category: string): category is NewsCategory {
  return ['ogłoszenie', 'konkurs', 'event', 'aktualizacja'].includes(category);
}

// Funkcja do zapisu danych do pliku
export function writeNewsData(data: { news: Record<string, NewsData> }): boolean {
  try {
    // Zapisz dane do pliku
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Błąd podczas zapisu danych newsów:', error);
    return false;
  }
}

// Funkcja do pobrania wszystkich newsów
export function getAllNews(): NewsData[] {
  const data = readNewsData();
  return Object.values(data.news);
}

// Funkcja do pobrania newsa po ID
export function getNewsById(id: string): NewsData | null {
  const data = readNewsData();
  return data.news[id] || null;
}

// Funkcja do dodania nowego newsa
export function addNews(newsData: Omit<NewsData, 'id'>): NewsData | null {
  try {
    const data = readNewsData();
    
    // Generowanie ID na podstawie tytułu i daty
    const newsId = generateNewsId(newsData.title, newsData.date);
    
    // Tworzenie nowego obiektu newsa
    const newNews: NewsData = {
      ...newsData,
      id: newsId
    };
    
    // Dodawanie do kolekcji
    data.news[newsId] = newNews;
    
    // Zapis do pliku
    if (writeNewsData(data)) {
      return newNews;
    }
    
    return null;
  } catch (error) {
    console.error('Błąd podczas dodawania newsa:', error);
    return null;
  }
}

// Funkcja do aktualizacji newsa
export function updateNews(id: string, newsData: Partial<NewsData>): boolean {
  try {
    const data = readNewsData();
    
    // Sprawdź czy news istnieje
    if (!data.news[id]) {
      return false;
    }
    
    // Aktualizuj news
    data.news[id] = {
      ...data.news[id],
      ...newsData,
      id, // Zachowaj oryginalne ID
    };
    
    // Zapisz zmiany
    return writeNewsData(data);
  } catch (error) {
    console.error('Błąd podczas aktualizacji newsa:', error);
    return false;
  }
}

// Funkcja do usunięcia newsa
export function deleteNews(id: string): boolean {
  try {
    const data = readNewsData();
    
    // Sprawdź czy news istnieje
    if (!data.news[id]) {
      return false;
    }
    
    // Usuń news
    delete data.news[id];
    
    // Zapisz zmiany
    return writeNewsData(data);
  } catch (error) {
    console.error('Błąd podczas usuwania newsa:', error);
    return false;
  }
} 