import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Import Prisma

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Brak adresu e-mail" }, { status: 400 });
    }

    // Pobieranie użytkownika na podstawie e-maila
    const user = await prisma.user.findUnique({
      where: { email },
      select: { name: true },
    });

    if (!user) {
      return NextResponse.json({ error: "Użytkownik nie istnieje" }, { status: 404 });
    }

    return NextResponse.json({ name: user.name });
  } catch (error) {
    console.error("Błąd pobierania użytkownika:", error);
    return NextResponse.json({ error: "Wewnętrzny błąd serwera" }, { status: 500 });
  }
}
