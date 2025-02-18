import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function formatPlayTime(ticks: bigint | number): string {
  // Konwersja ticków (przyjmujemy, że ticki to sekundy) na minuty
  const totalMinutes = typeof ticks === "bigint" ? Number(ticks) / 60 : ticks / 60;
  const days = Math.floor(totalMinutes / 1440); // 1 dzień = 1440 minut
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = Math.floor(totalMinutes % 60);
  return `${days > 0 ? `${days}d ` : ""}${hours}h ${minutes}m`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const uuid = searchParams.get("uuid");

  if (!uuid) {
    return NextResponse.json({ error: "Brak uuid" }, { status: 400 });
  }

  try {
    const stats = await prisma.mode1Stats.findUnique({
      where: { uuid },
    });

    if (stats) {
      const statsWithFormattedPlaytime = {
        ...stats,
        playtime: formatPlayTime(stats.playtime),
      };
      return NextResponse.json({ stats: statsWithFormattedPlaytime }, { status: 200 });
    } else {
      return NextResponse.json({ stats: null }, { status: 200 });
    }
  } catch (error) {
    console.error("Błąd pobierania statystyk gracza:", error);
    return NextResponse.json({ error: "Błąd pobierania danych" }, { status: 500 });
  }
}
