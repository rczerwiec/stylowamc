import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Prisma Client
import { auth } from '@/app/firebase/config'; // Firebase
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { hash } from 'bcryptjs';

export async function POST(req: Request) {
  try {
    console.log("START: Odbieranie żądania rejestracji");

    const bodyText = await req.text();
    console.log("Odebrane ciało żądania:", bodyText);

    if (!bodyText) {
      console.error("Błąd: Puste ciało żądania");
      return NextResponse.json({ error: 'Brak ciała żądania' }, { status: 400 });
    }

    const { email, password, code } = JSON.parse(bodyText);
    console.log("Parsed body:", { email, password, code });

    if (!email || !password || !code) {
      console.error("Błąd: Brak wymaganych pól", { email, password, code });
      return NextResponse.json({ error: 'Brak wymaganych pól' }, { status: 400 });
    }

    console.log("Sprawdzanie kodu w bazie...");
    const validCode = await prisma.playerCode.findFirst({
      where: {
        code: code,
        used: false,
      },
    });
    console.log("Wynik sprawdzania kodu:", validCode);

    if (!validCode) {
      console.error("Błąd: Kod nieprawidłowy lub już użyty");
      return NextResponse.json({ error: 'Kod jest nieprawidłowy lub został już wykorzystany' }, { status: 400 });
    }

    console.log("Sprawdzanie, czy użytkownik już istnieje...");
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    console.log("Wynik sprawdzania użytkownika:", existingUser);

    if (existingUser) {
      console.error("Błąd: Użytkownik już istnieje");
      return NextResponse.json({ error: 'Użytkownik już istnieje' }, { status: 400 });
    }

    console.log("Tworzenie użytkownika w Firebase Authentication...");
    const firebaseUser = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Firebase user:", firebaseUser.user);

    console.log("Hashowanie hasła...");
    const hashedPassword = await hash(password, 10);
    console.log("Hashed password:", hashedPassword);

    console.log("Tworzenie użytkownika w bazie MySQL...");
    const newUser = await prisma.user.create({
      data: {
        email,
        firebaseId: firebaseUser.user.uid,
        password: hashedPassword,
        name: validCode.name || 'Nowy użytkownik',
        // Ustawiamy uuid zawsze na firebaseUser.user.uid
        uuid: validCode.uuid,
      },
    });
    console.log("Nowy użytkownik utworzony:", newUser);

    console.log("Oznaczanie kodu jako użyty...");
    await prisma.playerCode.update({
      where: { code: code },
      data: { used: true },
    });
    console.log("Kod oznaczony jako użyty.");

    const responsePayload = { message: 'Rejestracja zakończona sukcesem!', user: newUser };
    console.log("Wysyłanie odpowiedzi:", responsePayload);
    return NextResponse.json(responsePayload, { status: 201 });
  } catch (error) {
    console.error('Błąd rejestracji:', error);
    let errorMessage = 'Wewnętrzny błąd serwera';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    const errorPayload = { error: errorMessage };
    console.log("Wysyłanie błędnej odpowiedzi:", errorPayload);
    return NextResponse.json(errorPayload, { status: 500 });
  }
}
