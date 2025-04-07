import { NextRequest, NextResponse } from 'next/server';
import { getAllNews, addNews } from '@/app/lib/newsData';
import { NewsData } from '@/app/news/data';

// Funkcja pomocnicza do sprawdzania autoryzacji
function checkAuth(request: NextRequest): boolean {
  const sessionToken = request.cookies.get('sessionToken')?.value;
  return sessionToken === process.env.ADMIN_SESSION_TOKEN;
}

// GET - pobierz listę newsów
export async function GET(request: NextRequest) {
  try {
    // Sprawdź autoryzację
    if (!checkAuth(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Pobierz listę newsów
    const news = getAllNews();
    return NextResponse.json({ news });
  } catch (error) {
    console.error('Błąd podczas pobierania listy newsów:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST - dodaj nowy news
export async function POST(request: NextRequest) {
  try {
    // Sprawdź autoryzację
    if (!checkAuth(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Pobierz dane z requestu
    const newsData = await request.json();

    // Dodaj nowy news
    const newNews = addNews(newsData);
    if (!newNews) {
      return NextResponse.json({ error: 'Failed to add news' }, { status: 500 });
    }

    return NextResponse.json({ news: newNews });
  } catch (error) {
    console.error('Błąd podczas dodawania newsa:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 