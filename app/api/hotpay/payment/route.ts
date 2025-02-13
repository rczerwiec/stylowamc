import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const SECRET_KEY = process.env.HOTPAY_SECRET_KEY;
    if (!SECRET_KEY) {
      return NextResponse.json({ error: "Missing Secret Key" }, { status: 500 });
    }

    const body = await req.json();
    const { KWOTA, NAZWA_USLUGI, ADRES_WWW, ID_ZAMOWIENIA, EMAIL } = body;

    if (!KWOTA || !NAZWA_USLUGI || !ADRES_WWW || !ID_ZAMOWIENIA) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    // Tworzenie hash dla autoryzacji
    const hashString = `${SECRET_KEY};${KWOTA};${NAZWA_USLUGI};${ADRES_WWW};${ID_ZAMOWIENIA};${SECRET_KEY}`;
    const HASH = crypto.createHash("sha256").update(hashString).digest("hex");

    // Tworzenie danych formularza dla HotPay
    const formData = new FormData();
    formData.append("SEKRET", SECRET_KEY);
    formData.append("KWOTA", KWOTA);
    formData.append("NAZWA_USLUGI", NAZWA_USLUGI);
    formData.append("ADRES_WWW", ADRES_WWW);
    formData.append("ID_ZAMOWIENIA", ID_ZAMOWIENIA);
    formData.append("HASH", HASH);

    if (EMAIL) {
      formData.append("EMAIL", EMAIL);
    }

    // Wysłanie żądania do HotPay
    const response = await fetch("https://platnosc.hotpay.pl/", {
      method: "POST",
      body: formData, // **WAŻNE** – Fetch automatycznie ustawi `Content-Type: multipart/form-data`
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to initialize payment" }, { status: response.status });
    }

    const paymentUrl = await response.text();
    return NextResponse.json({ payment_url: paymentUrl });
  } catch (error) {
    console.error("Błąd płatności:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
