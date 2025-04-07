import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Twórz odpowiedź
    const response = NextResponse.json({ success: true });

    // Usuń cookie w odpowiedzi
    response.cookies.delete('admin_token');

    return response;
  } catch (error) {
    console.error('Błąd podczas wylogowywania:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas wylogowywania' },
      { status: 500 }
    );
  }
} 