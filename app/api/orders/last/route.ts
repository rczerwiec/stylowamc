import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const lastPurchase = await prisma.orders.findFirst({
      where: { 
        status: "SUCCESS" 
      },
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        name: true,
        service_name: true,
        createdAt: true
      }
    });

    if (!lastPurchase) {
      return NextResponse.json({ lastPurchase: null }, { status: 200 });
    }

    return NextResponse.json({ lastPurchase }, { status: 200 });
  } catch (error) {
    console.error("❌ Błąd pobierania ostatniego zakupu:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd podczas pobierania danych" },
      { status: 500 }
    );
  }
} 