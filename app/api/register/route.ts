import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Prisma Client
import { auth } from '@/app/firebase/config'; // Firebase
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { hash } from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { email, password, code } = await req.json();

    if (!email || !password || !code) {
      return NextResponse.json({ error: 'Brak wymaganych pól' }, { status: 400 });
    }

    // **Sprawdzenie czy kod istnieje w bazie `player_codes` i czy nie był użyty**
    const validCode = await prisma.playerCode.findFirst({
      where: {
        code: code,
        used: false, // Kod nie może być już użyty!
      },
    });

    if (!validCode) {
      return NextResponse.json({ error: 'Kod jest nieprawidłowy lub został już wykorzystany' }, { status: 400 });
    }

    // **Sprawdzenie czy użytkownik już istnieje w MySQL**
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Użytkownik już istnieje' }, { status: 400 });
    }

    // **Tworzenie użytkownika w Firebase Authentication**
    const firebaseUser = await createUserWithEmailAndPassword(auth, email, password);

    // **Hashowanie hasła przed zapisaniem do MySQL**
    const hashedPassword = await hash(password, 10);

    // **Tworzenie użytkownika w MySQL i ustawienie jego `name` na wartość z `PlayerCode`**
    const newUser = await prisma.user.create({
      data: {
        email,
        firebaseId: firebaseUser.user.uid,
        password: hashedPassword,
        name: validCode.name || 'Nowy użytkownik', // Jeśli `name` istnieje, przypisz je do User
      },
    });

    // **Oznaczamy kod jako użyty**
    await prisma.playerCode.update({
      where: { code: code },
      data: { used: true },
    });

    return NextResponse.json({ message: 'Rejestracja zakończona sukcesem!', user: newUser }, { status: 201 });
  } catch (error) {
    console.error('Błąd rejestracji:', error);
    
    let errorMessage = 'Wewnętrzny błąd serwera';
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
