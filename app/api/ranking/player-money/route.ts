import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const ranking = await prisma.playerMoneyRanking.findMany({
      orderBy: { money: "desc" },
      take: 15, // 🔥 Pobieramy TOP 15
    });

    return NextResponse.json({ ranking }, { status: 200 });
  } catch (error) {
    console.error("❌ Błąd pobierania rankingu hajsu:", error);
    return NextResponse.json({ error: "Błąd pobierania danych" }, { status: 500 });
  }
}
