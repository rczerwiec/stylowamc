# 📰 System Newsów

## 📝 Opis
System newsów pozwala na zarządzanie aktualnościami na stronie. Administratorzy mogą dodawać, edytować i usuwać newsy poprzez panel administracyjny.

## 💾 Struktura Danych
```typescript
interface NewsData {
  id: string;
  title: string;
  date: string;
  category: NewsCategory;
  shortDescription: string;
  fullDescription: string;
  image: string;
  gallery: string[];
  important: boolean;
  author: string;
  links: string[];
}

type NewsCategory = 'ogłoszenie' | 'konkurs' | 'event' | 'aktualizacja';
```

## 🔄 Endpointy API
- `GET /api/admin/news` - Pobieranie listy wszystkich newsów
- `POST /api/admin/news` - Dodawanie nowego newsa
- `GET /api/admin/news/[id]` - Pobieranie szczegółów newsa
- `PUT /api/admin/news/[id]` - Aktualizacja newsa
- `DELETE /api/admin/news/[id]` - Usuwanie newsa

## 📁 Struktura Plików
- `app/admin/news/page.tsx` - Strona z listą newsów
- `app/admin/news/create/page.tsx` - Formularz tworzenia newsa
- `app/admin/news/edit/[id]/page.tsx` - Formularz edycji newsa
- `app/api/admin/news/route.ts` - Endpointy API dla newsów
- `app/lib/newsData.ts` - Funkcje pomocnicze do zarządzania danymi
- `app/data/news.json` - Plik przechowujący dane newsów

## 🎯 Funkcjonalności
1. **Lista Newsów**
   - Wyświetlanie wszystkich newsów w tabeli
   - Sortowanie po dacie
   - Filtrowanie po kategorii
   - Akcje: edycja i usuwanie

2. **Tworzenie Newsa**
   - Formularz z polami:
     - Tytuł
     - Data
     - Kategoria
     - Krótki opis
     - Pełny opis
     - Autor
     - Znacznik "Ważny news"

3. **Edycja Newsa**
   - Te same pola co przy tworzeniu
   - Możliwość usunięcia newsa
   - Podgląd aktualnych danych

4. **Przechowywanie Danych**
   - Dane zapisywane w pliku JSON
   - Automatyczne generowanie ID
   - Walidacja danych przed zapisem

## 🔒 Bezpieczeństwo
- Dostęp tylko dla zalogowanych administratorów
- Walidacja sesji przy każdym żądaniu
- Sprawdzanie uprawnień przed wykonaniem operacji

## 🔗 Powiązane
- [[Panel Administratora]]
- [[API Endpoints]]
- [[Komponenty]] 