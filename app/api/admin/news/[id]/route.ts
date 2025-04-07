import { NextRequest, NextResponse } from 'next/server';
import { getNewsById, updateNews, deleteNews } from '@/app/lib/newsData';

// Funkcja pomocnicza do sprawdzania autoryzacji
function checkAuth(request: NextRequest): boolean {
  const sessionToken = request.cookies.get('sessionToken')?.value;
  return sessionToken === process.env.ADMIN_SESSION_TOKEN;
}

// GET - pobierz news po ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Sprawdź autoryzację
    if (!checkAuth(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Pobierz news po ID
    const news = getNewsById(params.id);
    if (!news) {
      return NextResponse.json({ error: 'News not found' }, { status: 404 });
    }

    return NextResponse.json({ news });
  } catch (error) {
    console.error('Błąd podczas pobierania newsa:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PUT - zaktualizuj news
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Sprawdź autoryzację
    if (!checkAuth(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Pobierz dane z requestu
    const newsData = await request.json();

    // Zaktualizuj news
    const success = updateNews(params.id, newsData);
    if (!success) {
      return NextResponse.json({ error: 'Failed to update news' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Błąd podczas aktualizacji newsa:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE - usuń news
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Sprawdź autoryzację
    if (!checkAuth(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Usuń news
    const success = deleteNews(params.id);
    if (!success) {
      return NextResponse.json({ error: 'Failed to delete news' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Błąd podczas usuwania newsa:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 