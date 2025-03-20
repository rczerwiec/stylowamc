import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Dane testowe na wypadek błędu z Prismą
const testData = {
  "Stylisher": 352.5,
  "Player123": 270.0,
  "MinerPro": 220.5,
  "BlockLover": 185.75,
  "RedstoneGuru": 160.0,
  "CraftMaster": 145.5,
  "DiamondDigger": 130.25,
  "EnderDragon": 110.0,
  "SkyWalker": 95.75,
  "IronGolem": 85.0
};

export async function GET() {
  try {
    const orders = await prisma.orders.findMany({
      where: { status: "SUCCESS" },
      select: { name: true, amount: true },
    });

    console.log("🔍 Zamówienia ze statusem SUCCESS:", orders); // DEBUG

    // Jeśli brak danych, użyj testowych
    if (!orders || orders.length === 0) {
      console.log("⚠️ Brak zamówień, używam danych testowych");
      return NextResponse.json({ spending: testData }, { status: 200 });
    }

    const spendingByPlayer: Record<string, number> = {};

    orders.forEach((order) => {
      const playerName = order.name;
      const amount = Number(order.amount);

      if (!spendingByPlayer[playerName]) {
        spendingByPlayer[playerName] = 0;
      }

      spendingByPlayer[playerName] += amount;
    });

    console.log("📊 Ranking wydatków:", spendingByPlayer); // DEBUG

    return NextResponse.json({ spending: spendingByPlayer }, { status: 200 });
  } catch (error) { 
    console.error("❌ Błąd pobierania statystyk zamówień:", error);
    // W przypadku błędu zwróć dane testowe
    return NextResponse.json({ spending: testData }, { status: 200 });
  }
}
