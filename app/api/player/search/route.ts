import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query || query.length < 3) {
    return NextResponse.json(
      { error: "Zapytanie musi mieć co najmniej 3 znaki" },
      { status: 400 }
    );
  }

  try {
    const players = await prisma.playerStats.findMany({
      where: {
        name: {
          contains: query
        }
      },
      select: {
        uuid: true,
        name: true,
        last_seen: true
      },
      take: 5 // Limit wyników do 5
    });

    return NextResponse.json({ players });
  } catch (error) {
    console.error("Błąd podczas wyszukiwania graczy:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd podczas wyszukiwania graczy" },
      { status: 500 }
    );
  }
} 