import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const orders = await prisma.orders.findMany({
      where: { status: "SUCCESS" },
      select: { name: true, amount: true },
    });

    console.log("🔍 Zamówienia ze statusem SUCCESS:", orders); // DEBUG

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
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
