import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 🔥 Funkcja do formatowania czasu gry
const formatPlayTime = (ticks: bigint) => {
    const totalMinutes = Number(ticks) / 60; // Konwersja ticków na minuty
    const days = Math.floor(totalMinutes / 1440); // 1 dzień = 1440 minut
    const hours = Math.floor((totalMinutes % 1440) / 60);
    const minutes = Math.floor(totalMinutes % 60);
  
    return `${days > 0 ? `${days}d` : ""}${hours}h${minutes}m`;
  };

export async function GET() {
  try {
    const ranking = await prisma.playerTimeRanking.findMany({
      orderBy: { time_played: "desc" },
      take: 15, // 🔥 Pobieramy TOP 15
    });

    // 🔥 Konwersja ticków na czas w `hh:mm:ss`
    const formattedRanking = ranking.map((player) => ({
      uuid: player.uuid,
      name: player.name,
      time_played: formatPlayTime(player.time_played), // ✅ Używamy nowej funkcji
    }));

    return NextResponse.json({ ranking: formattedRanking }, { status: 200 });
  } catch (error) {
    console.error("❌ Błąd pobierania rankingu czasu gry:", error);
    return NextResponse.json({ error: "Błąd pobierania danych" }, { status: 500 });
  }
}
