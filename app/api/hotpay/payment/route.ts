import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    console.log("🔴 API HOTPAY START 🔴");

    const SECRET_KEY = process.env.HOTPAY_KEY;
    const SECRET_PASSWORD = process.env.HOTPAY_PASSWORD;

    if (!SECRET_KEY || !SECRET_PASSWORD) {
      console.error("❌ Brak kluczy w .env!");
      return NextResponse.json({ error: "Missing Secret Key or Password" }, { status: 500 });
    }

    const body = await req.json().catch(() => null);
    console.log("📩 ODEBRANY REQUEST:", body);
    
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const { KWOTA, NAZWA_USLUGI, ADRES_WWW, ID_ZAMOWIENIA, EMAIL = "" } = body;
    if (!KWOTA || !NAZWA_USLUGI || !ID_ZAMOWIENIA) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    // 🔥 Generujemy hash dynamicznie
    const hashString = `${SECRET_PASSWORD.toString()};${KWOTA};${NAZWA_USLUGI};${ADRES_WWW};${ID_ZAMOWIENIA};${SECRET_KEY.toString()}`;
    console.log("📜 HASH STRING DO SHA256:", `"${hashString}"`);

    const HASH = crypto.createHash("sha256").update(hashString, "utf8").digest("hex");
    console.log("🔐 Wygenerowany HASH:", HASH);

    // 🔥 Tworzymy dynamiczny formularz, który sam się wysyła
    const formHtml = `
      <html>
      <head>
        <meta http-equiv="Content-Security-Policy" content="script-src 'self'">
        <script src="/redirect.js" defer></script>
      </head>
      <body>
        <h2 style="text-align: center;">Przekierowanie do HotPay...</h2>
        <form id="hotpay-form" action="https://platnosc.hotpay.pl" method="POST">
          <input type="hidden" name="SEKRET" value="${SECRET_KEY}" />
          <input type="hidden" name="KWOTA" value="${KWOTA}" />
          <input type="hidden" name="NAZWA_USLUGI" value="${NAZWA_USLUGI}" />
          <input type="hidden" name="ADRES_WWW" value="${ADRES_WWW}" />
          <input type="hidden" name="ID_ZAMOWIENIA" value="${ID_ZAMOWIENIA}" />
          <input type="hidden" name="EMAIL" value="${EMAIL}" />
          <input type="hidden" name="HASH" value="${HASH}" />
          <p style="text-align: center;">Jeśli nie nastąpi przekierowanie, <button type="submit">kliknij tutaj</button></p>
        </form>
      </body>
      </html>
    `;

    return new NextResponse(formHtml, {
      headers: { "Content-Type": "text/html" },
    });
  } catch (error) {
    console.error("❌ Błąd płatności:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// 🔥 GET – odbieramy status płatności 🔥
export async function GET(req: NextRequest) {
  try {
    console.log("🔴 HOTPAY CALLBACK – ODBIERANIE STATUSU PŁATNOŚCI 🔴");

    const url = new URL(req.url);
    const params = Object.fromEntries(url.searchParams.entries());

    console.log("📩 ODEBRANE PARAMETRY:", params);

    const SECRET_KEY = process.env.HOTPAY_KEY?.trim();
    const SECRET_PASSWORD = process.env.HOTPAY_PASSWORD?.trim();

    if (!SECRET_KEY || !SECRET_PASSWORD) {
      console.error("❌ Brak kluczy w .env!");
      return NextResponse.json({ error: "Missing Secret Key or Password" }, { status: 500 });
    }

    const { KWOTA, STATUS, ID_ZAMOWIENIA, ID_PLATNOSCI, SECURE, SEKRET, HASH } = params;

    if (!KWOTA || !STATUS || !ID_ZAMOWIENIA || !ID_PLATNOSCI || !SECURE || !SEKRET || !HASH) {
      console.error("❌ Brak wymaganych parametrów!");
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    // 🔥 Sprawdzamy poprawność HASH – TAK JAK NA GITHUBIE 🔥
    const hashString = `${SECRET_PASSWORD};${KWOTA};${ID_PLATNOSCI};${ID_ZAMOWIENIA};${STATUS};${SECURE};${SEKRET}`;
    console.log("📜 HASH STRING DO SHA256:", `"${hashString}"`);

    const generatedHash = crypto.createHash("sha256").update(hashString, "utf8").digest("hex").toUpperCase();
    console.log("🔐 Wygenerowany HASH:", generatedHash);
    console.log("💾 Otrzymany HASH od HotPay:", HASH);

    if (generatedHash !== HASH) {
      console.error("❌ BŁĄD WALIDACJI HASH! Transakcja nieprawidłowa.");
      return NextResponse.json({ error: "Invalid hash" }, { status: 400 });
    }

    // 🔥 Jeśli STATUS to SUCCESS → uznajemy płatność
    if (STATUS === "SUCCESS") {
      console.log(`✅ Płatność zaakceptowana! ID zamówienia: ${ID_ZAMOWIENIA}`);
      return NextResponse.json({ message: "Payment successful" }, { status: 200 });
    } else if (STATUS === "PENDING") {
      console.log(`⏳ Płatność oczekująca... ID zamówienia: ${ID_ZAMOWIENIA}`);
      return NextResponse.json({ message: "Payment pending" }, { status: 200 });
    } else {
      console.log(`❌ Płatność odrzucona! ID zamówienia: ${ID_ZAMOWIENIA}`);
      return NextResponse.json({ error: "Payment failed" }, { status: 400 });
    }
  } catch (error) {
    console.error("❌ Błąd obsługi callbacka HotPay:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

