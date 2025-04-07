import { readNewsData } from '@/app/lib/newsData';

export type NewsCategory = 'ogłoszenie' | 'konkurs' | 'event' | 'aktualizacja';

export interface NewsData {
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

// Pobierz dane newsów
const newsData = readNewsData();
const news = newsData.news;

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