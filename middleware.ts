import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Sprawdź czy ścieżka zaczyna się od /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    console.log('Middleware: Sprawdzam ścieżkę:', request.nextUrl.pathname);
    console.log('Middleware: Wszystkie cookies:', request.cookies.getAll());
    
    // Pomiń stronę logowania
    if (request.nextUrl.pathname === '/admin') {
      console.log('Middleware: Pomijam stronę logowania');
      return NextResponse.next();
    }

    const session = request.cookies.get('admin_session');
    console.log('Middleware: Session cookie:', session ? 'istnieje' : 'brak');

    if (!session || session.value !== 'authenticated') {
      console.log('Middleware: Brak sesji lub nieprawidłowa sesja, przekierowuję do logowania');
      const response = NextResponse.redirect(new URL('/admin', request.url));
      return response;
    }

    console.log('Middleware: Sesja poprawna');
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
}; 