import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { orderId, amount, service_name, name, status } = await req.json();

    if (!orderId || !amount || !service_name || !name || !status) {
      return NextResponse.json({ error: "Brak wymaganych pól" }, { status: 400 });
    }

    // **Tworzymy zamówienie w bazie**
    const newOrder = await prisma.orders.create({
      data: {
        orderId,
        amount,
        service_name,
        name, // ✅ Zapisujemy nazwę gracza
        status,
      },
    });

    return NextResponse.json({ message: "Zamówienie utworzone!", order: newOrder }, { status: 201 });
  } catch (error) {
    console.error("❌ Błąd tworzenia zamówienia:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
