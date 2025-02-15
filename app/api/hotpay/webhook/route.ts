import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { Rcon } from "rcon-client";

export async function POST(req: NextRequest) {
  try {
    console.log("🔴 HOTPAY CALLBACK – ODBIERANIE STATUSU PŁATNOŚCI 🔴");

    // 🔥 Pobieramy zmienne środowiskowe
    const SECRET_PASSWORD = process.env.HOTPAY_PASSWORD;
    const RCON_HOST = process.env.RCON_HOST ?? "localhost";
    const RCON_PORT = process.env.RCON_PORT ?? "22575";
    const RCON_PASSWORD = process.env.RCON_PASSWORD ?? "";

    if (!SECRET_PASSWORD) {
      console.error("❌ Brak `HOTPAY_PASSWORD` w .env!");
      return NextResponse.json(
        { error: "Missing Secret Key" },
        { status: 500 }
      );
    }

    // 🔥 Pobieramy dane od HotPay
    const body = await req.formData(); // HotPay wysyła dane jako `multipart/form-data`

    const KWOTA = body.get("KWOTA");
    const ID_PLATNOSCI = body.get("ID_PLATNOSCI");
    const ID_ZAMOWIENIA = body.get("ID_ZAMOWIENIA");
    const STATUS = body.get("STATUS");
    const SEKRET = body.get("SEKRET");
    const SECURE = body.get("SECURE");
    const HASH = body.get("HASH");

    // 🔍 Sprawdzamy, czy mamy wszystkie parametry
    if (
      !KWOTA ||
      !ID_PLATNOSCI ||
      !ID_ZAMOWIENIA ||
      !STATUS ||
      !SEKRET ||
      !SECURE ||
      !HASH
    ) {
      console.error("❌ Brak wymaganych parametrów!");
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // 🔥 Generujemy poprawny HASH tak jak w PHP
    const hashString = `${SECRET_PASSWORD};${KWOTA};${ID_PLATNOSCI};${ID_ZAMOWIENIA};${STATUS};${SECURE};${SEKRET}`;
    console.log("📜 HASH STRING DO SHA256:", `"${hashString}"`);

    const generatedHash = crypto
      .createHash("sha256")
      .update(hashString, "utf8")
      .digest("hex");
    console.log("🔐 Wygenerowany HASH:", generatedHash);
    console.log("💾 Otrzymany HASH od HotPay:", HASH);

    // 🔍 Sprawdzamy, czy hash się zgadza
    if (generatedHash !== HASH) {
      console.error("❌ BŁĄD WALIDACJI HASH! Transakcja nieprawidłowa.");
      return NextResponse.json({ error: "Invalid hash" }, { status: 400 });
    }

    // 🔥 Zwracamy status płatności, który frontend zapisze w localStorage
    if (STATUS === "SUCCESS") {
      console.log(`✅ Płatność zaakceptowana! ID zamówienia: ${ID_ZAMOWIENIA}`);

      try {
        // 🔥 Łączymy się z RCON
        const rcon = await Rcon.connect({
          host: RCON_HOST,
          port: Number(RCON_PORT),
          password: RCON_PASSWORD,
        });

        // **Tu wysyłasz komendę do serwera MC!**
        const playerName = "Stylowy"; // TODO: Pobierz nazwę gracza z bazy danych lub zamówienia
        const command = `lp user ${playerName} parent set vip`; // Przykład: nadanie rangi VIP

        console.log(`🚀 Wysyłanie komendy: ${command}`);
        const response = await rcon.send(command);
        console.log("✅ Odpowiedź serwera MC:", response);

        // **Zamykamy połączenie RCON**
        await rcon.end();
      } catch (rconError) {
        console.error("❌ Błąd RCON:", rconError);
        return NextResponse.json(
          { error: "Błąd komunikacji z RCON" },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { message: "Płatność zaakceptowana i komenda wysłana do Minecrafta" },
        { status: 200 }
      );
    } else if (STATUS === "FAILURE") {
      console.log(`❌ Płatność odrzucona! ID zamówienia: ${ID_ZAMOWIENIA}`);
      return NextResponse.json(
        { status: "failure", error: "Payment failed" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { status: "unknown", message: "Unknown status" },
      { status: 400 }
    );
  } catch (error) {
    console.error("❌ Błąd obsługi callbacka HotPay:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
