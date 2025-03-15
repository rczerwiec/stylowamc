import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { Rcon } from "rcon-client";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    console.log("🔴 HOTPAY CALLBACK – ODBIERANIE STATUSU PŁATNOŚCI 🔴");

    // 🔥 Pobieramy zmienne środowiskowe
    const SECRET_PASSWORD = process.env.HOTPAY_PASSWORD;
    const RCON_HOST = process.env.RCON_HOST ?? "localhost";
    const RCON_PORT = parseInt(process.env.RCON_PORT ?? "25575", 10);
    const RCON_PASSWORD = process.env.RCON_PASSWORD ?? "";

    if (!SECRET_PASSWORD) {
      console.error("❌ Brak `HOTPAY_PASSWORD` w .env!");
      return NextResponse.json({ error: "Missing Secret Key" }, { status: 500 });
    }

    // 🔥 Pobieramy dane od HotPay
    const body = await req.formData();
    const KWOTA = body.get("KWOTA");
    const ID_PLATNOSCI = body.get("ID_PLATNOSCI");
    const ID_ZAMOWIENIA = body.get("ID_ZAMOWIENIA");
    const STATUS = body.get("STATUS");
    const SEKRET = body.get("SEKRET");
    const SECURE = body.get("SECURE");
    const HASH = body.get("HASH");

    if (!KWOTA || !ID_PLATNOSCI || !ID_ZAMOWIENIA || !STATUS || !SEKRET || !SECURE || !HASH) {
      console.error("❌ Brak wymaganych parametrów!");
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    // 🔥 Generujemy poprawny HASH
    const hashString = `${SECRET_PASSWORD};${KWOTA};${ID_PLATNOSCI};${ID_ZAMOWIENIA};${STATUS};${SECURE};${SEKRET}`;
    const generatedHash = crypto.createHash("sha256").update(hashString, "utf8").digest("hex");

    if (generatedHash !== HASH) {
      console.error("❌ BŁĄD WALIDACJI HASH! Transakcja nieprawidłowa.");
      return NextResponse.json({ error: "Invalid hash" }, { status: 400 });
    }

    // 🔥 Pobieramy dane z zamówienia
    const order = await prisma.orders.findUnique({
      where: { orderId: ID_ZAMOWIENIA.toString() },
    });

    if (!order) {
      console.error("❌ Zamówienie nie znalezione!");
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const playerName = order.name;
    const serviceName = order.service_name;

    const serviceCommands: Record<string, string> = {
      "Ranga VIP": `lp user ${playerName} parent addtemp vip 30d`,
      "Ranga SVIP": `lp user ${playerName} parent addtemp svip 30d`,
      "Ranga MVIP": `lp user ${playerName} parent addtemp mvip 45d`,
      "Ranga UVIP": `lp user ${playerName} parent addtemp uvip 75d`,
      "10 SMCoinów": `smc dodaj 10 ${playerName}`,
      "25 SMCoinów": `smc dodaj 25 ${playerName}`,
      "50 SMCoinów": `smc dodaj 50 ${playerName}`,
      "100 SMCoinów": `smc dodaj 100 ${playerName}`,
      "Fly na Wyspie": `lp user ${playerName} permission settemp smbento.fly true 30d`,
    };

    const command = serviceCommands[serviceName];

    if (!command) {
      console.error("❌ Nieznana usługa:", serviceName);
      return NextResponse.json({ error: "Unknown service" }, { status: 400 });
    }

    // 🔥 Aktualizujemy status zamówienia w bazie
    if (STATUS === "SUCCESS") {
      console.log(`✅ Płatność zaakceptowana! ID zamówienia: ${ID_ZAMOWIENIA}`);

      try {
        const rcon = await Rcon.connect({
          host: RCON_HOST,
          port: RCON_PORT,
          password: RCON_PASSWORD,
        });

        console.log(`🚀 Wysyłanie komendy: ${command}`);
        const response = await rcon.send(command);
        console.log("✅ Odpowiedź serwera MC:", response);

        await rcon.end();
      } catch (rconError) {
        console.error("❌ Błąd RCON:", rconError);
        return NextResponse.json({ error: "Błąd komunikacji z RCON" }, { status: 500 });
      }

      // 🔥 Aktualizacja statusu na `SUCCESS`
      await prisma.orders.update({
        where: { orderId: ID_ZAMOWIENIA.toString() },
        data: { status: "SUCCESS" },
      });

      return NextResponse.json({ message: "Płatność zaakceptowana i komenda wysłana do Minecrafta" }, { status: 200 });
    } else if (STATUS === "FAILURE") {
      console.log(`❌ Płatność odrzucona! ID zamówienia: ${ID_ZAMOWIENIA}`);

      // 🔥 Aktualizacja statusu na `FAILED`
      await prisma.orders.update({
        where: { orderId: ID_ZAMOWIENIA.toString() },
        data: { status: "FAILED" },
      });

      return NextResponse.json({ status: "failure", error: "Payment failed" }, { status: 400 });
    }

    return NextResponse.json({ status: "unknown", message: "Unknown status" }, { status: 400 });
  } catch (error) {
    console.error("❌ Błąd obsługi callbacka HotPay:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
