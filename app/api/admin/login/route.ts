import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    console.log('Otrzymano żądanie logowania');
    const { username, password } = await request.json();
    console.log('Dane logowania:', { username, password: '***' });
    console.log('Oczekiwane dane:', { 
      expectedUsername: process.env.ADMINPANEL_LOGIN, 
      expectedPassword: process.env.ADMINPANEL_PASSWORD ? '***' : 'brak' 
    });

    // Sprawdź dane logowania z pliku .env
    if (
      username === process.env.ADMINPANEL_LOGIN &&
      password === process.env.ADMINPANEL_PASSWORD
    ) {
      console.log('Dane logowania poprawne, ustawiam sesję');
      
      // Twórz odpowiedź
      const response = NextResponse.json({ success: true });
      
      // Ustaw prosty token sesji
      response.cookies.set('admin_session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 godziny
        path: '/'
      });

      console.log('Cookie ustawione, zwracam odpowiedź');
      return response;
    }

    console.log('Nieprawidłowe dane logowania');
    return NextResponse.json(
      { error: 'Nieprawidłowe dane logowania' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Błąd podczas logowania:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas logowania' },
      { status: 500 }
    );
  }
} 