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