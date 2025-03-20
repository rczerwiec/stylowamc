export interface NewsData {
  id: string;
  title: string;
  date: string;
  category: 'ogłoszenie' | 'konkurs' | 'event' | 'aktualizacja';
  shortDescription: string;
  fullDescription: string;
  image?: string;
  gallery?: string[];
  important: boolean;
  author: string;
  links?: {
    text: string;
    url: string;
  }[];
}

export const news: Record<string, NewsData> = {
  'news-20-marzec-2025': {
    id: 'news-20-marzec-2025',
    title: 'Redesign strony i więcej!',
    date: '2025-03-20',
    category: 'aktualizacja',
    shortDescription: 'Nowy redesign strony oraz zła wiadomość odnośnie serwera Survival!',
    fullDescription: `Cześć!

Dziś zaktualizowaliśmy stronę, poprawiając wiele wizualnych elementów i zmieniając jej layout. Usunęliśmy również liczne błędy, które mogliście wcześniej napotkać.

Dodaliśmy wyszukiwarkę graczy oraz nowy system newsów – właśnie z niego korzystacie! Kolejnym krokiem będzie rozbudowa i ulepszenie systemu statystyk 😉

Niestety, mamy też mniej pozytywną wiadomość – start serwera Survival, który był zaplanowany na 28 marca, niemal na pewno zostanie opóźniony.`,
    image: '',
    important: true,
    author: 'Stylowy',
    links: [
    ]
  },
  'news-15-marzec-2025': {
    id: 'news-15-marzec-2025',
    title: 'Tydzień od startu serwera!',
    date: '2025-03-15',
    category: 'ogłoszenie',
    shortDescription: 'Minał właśnie tydzień od startu serwera, a my już w tym możemy pochwalić się bardzo dobrymi wynikami!',
    fullDescription: `Minał właśnie tydzień od startu serwera, a my już w tym możemy pochwalić się bardzo dobrymi wynikami!
W zaledwie tydzień od startu, udało nam się zwrócić koszty wystartowania serwera oraz przyciągnąć łącznie 400 graczy! Stale rozwijamy nasz serwer OneBlock o nowe funkcję oraz na bieżąco poprawiamy błędy i zmieniamy rzeczy, które mogą się Wam nie podobać.
  Jeszcze raz wielkie dzięki za tak ogromne zainteresowanie serwerem!`,
    image: '',
    important: true,
    author: 'Stylowy',
    links: [
    ]
  },
  'news-8-marzec-2025': {
    id: 'news-8-marzec-2025',
    title: 'Start tuż tuż!',
    date: '2025-03-08',
    category: 'ogłoszenie',
    shortDescription: 'Już dzisiaj startuje nasz serwer OneBlock! Nasz serwer jak i strona są w wersji Beta, co oznacza, że mogą pojawiać się na nim...',
    fullDescription: ` Już dzisiaj startuje nasz serwer OneBlock! Nasz serwer jak i strona są w wersji Beta, co oznacza, że mogą pojawiać się na nim błędy (szczególnie na stronie). 
         Pracujemy również nad nowymi metodami płatności oraz zwiększeniem ilości benefitów płynących z rang. 
         W dniu 09.03.2025 pojawi się nowa zakładka w sklepie z rozpiską wszystkich dostępnych rang.`,
    image: '',
    important: true,
    author: 'Stylowy',
    links: [
    ]
  },
  'news-12-luty-2025': {
    id: 'news-12-luty-2025',
    title: 'Witaj Świecie!',
    date: '2025-02-12',
    category: 'ogłoszenie',
    shortDescription: 'Cześć! Intensywnie pracujemy nad nową edycją serwera, która jest już na zaawansowanym etapie. Wkrótce podzielimy się z wami szczegółami. Śledźcie nasze...',
    fullDescription: `
 Cześć! Intensywnie pracujemy nad nową edycją serwera, która jest już na zaawansowanym etapie. Wkrótce podzielimy się z wami szczegółami. Śledźcie nasze kanały społecznościowe, aby być na bieżąco.
Udostępniliśmy Wam już jednak pierwszą wersję nowej strony internetowej, na której w przyszłości będziecie mogli korzystać z wielu ciekawych funkcji.
    `,
    image: '',
    important: true,
    author: 'Stylowy',
    links: [
      {
        text: 'Strona serwera',
        url: 'https://www.stylowamc.pl'
      }
    ]
  },
};

export const getLatestNews = (count: number = 5) => {
  return Object.values(news)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
};

export const getNewsByCategory = (category: NewsData['category']) => {
  return Object.values(news)
    .filter(item => item.category === category)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getNewsById = (id: string): NewsData | undefined => {
  return news[id];
}; 