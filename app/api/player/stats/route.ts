import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const uuid = searchParams.get("uuid");
  const username = searchParams.get("username");

  if (!uuid && !username) {
    return NextResponse.json(
      { error: "Nie podano UUID ani nazwy użytkownika" },
      { status: 400 }
    );
  }

  try {
    let playerStats;
    
    if (username) {
      // Jeśli podano nazwę użytkownika, najpierw znajdź gracza po nazwie
      playerStats = await prisma.playerStats.findFirst({
        where: { name: username }
      });
    } else {
      // Jeśli podano UUID, użyj go bezpośrednio
      playerStats = await prisma.playerStats.findUnique({
        where: { uuid: uuid! }
      });
    }

    if (!playerStats) {
      return NextResponse.json(
        { error: "Nie znaleziono statystyk gracza" },
        { status: 404 }
      );
    }

    // Pobieramy wszystkie statystyki gracza równolegle
    const [mode0Stats, mode1Stats, mode2Stats, mode3Stats, mode4Stats, mode5Stats] = await Promise.all([
            // Statystyki z trybu OneBlock
      prisma.mode0Stats.findUnique({
        where: { uuid: playerStats.uuid }
      }),
      // Statystyki z trybu OneBlock
      prisma.mode1Stats.findUnique({
        where: { uuid: playerStats.uuid }
      }),
      // Statystyki z trybu Survival
      prisma.mode2Stats.findUnique({
        where: { uuid: playerStats.uuid }
      }),
      // Statystyki z trybu 3
      prisma.mode3Stats.findUnique({
        where: { uuid: playerStats.uuid }
      }),
      // Statystyki z trybu 4
      prisma.mode4Stats.findUnique({
        where: { uuid: playerStats.uuid }
      }),
      // Statystyki z trybu 5
      prisma.mode5Stats.findUnique({
        where: { uuid: playerStats.uuid }
      })
    ]);

    // Zsumuj playtime ze wszystkich trybów
    const totalPlaytime = [
      Number(mode0Stats?.playtime) || 0,
      Number(mode1Stats?.playtime) || 0,
      Number(mode2Stats?.playtime) || 0,
      Number(mode3Stats?.playtime) || 0,
      Number(mode4Stats?.playtime) || 0,
      Number(mode5Stats?.playtime) || 0
    ].reduce((acc, time) => acc + time, 0);

    // Łączymy wszystkie statystyki w jeden obiekt
    const combinedStats = {
      // Podstawowe informacje o graczu
      uuid: playerStats.uuid,
      name: playerStats.name,
      join_date: playerStats.join_date,
      last_seen: playerStats.last_seen,
      money_spent_pln: playerStats.money_spent_pln,
      achievements_count: playerStats.achievements_count,

      // Ogólne statystyki
      general: {
        money: playerStats.money,
        playtime: totalPlaytime,
        smcoins: playerStats.smcoins,
      },

      // Statystyki z poszczególnych trybów
      oneblock: mode1Stats ? {
        ...mode1Stats,
        playtime: Number(mode1Stats.playtime),
      } : null,

      survival: mode2Stats ? {
        ...mode2Stats,
        playtime: Number(mode2Stats.playtime),
      } : null,

      mode0: mode0Stats ? {
        ...mode0Stats,
        playtime: Number(mode0Stats.playtime),
      } : null,
      mode3: mode3Stats ? {
        ...mode3Stats,
        playtime: Number(mode3Stats.playtime),
      } : null,
      mode4: mode4Stats ? {
        ...mode4Stats,
        playtime: Number(mode4Stats.playtime),
      } : null,
      mode5: mode5Stats ? {
        ...mode5Stats,
        playtime: Number(mode5Stats.playtime),
      } : null
    };

    return NextResponse.json({ stats: combinedStats });
  } catch (error) {
    console.error("Błąd podczas pobierania statystyk:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd podczas pobierania statystyk" },
      { status: 500 }
    );
  }
}
