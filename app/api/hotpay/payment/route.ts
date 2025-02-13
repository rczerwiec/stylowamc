import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const SECRET_KEY = process.env.HOTPAY_KEY; // Zmieniono na zmienną bez `NEXT_PUBLIC_`
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

    // Tworzenie danych dla HotPay
    const params = new URLSearchParams();
    params.append("SEKRET", SECRET_KEY);
    params.append("KWOTA", KWOTA);
    params.append("NAZWA_USLUGI", NAZWA_USLUGI);
    params.append("ADRES_WWW", ADRES_WWW);
    params.append("ID_ZAMOWIENIA", ID_ZAMOWIENIA);
    params.append("HASH", HASH);

    if (EMAIL) {
      params.append("EMAIL", EMAIL);
    }

    // Wysłanie żądania do HotPay
    const response = await fetch("https://platnosc.hotpay.pl/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to initialize payment" }, { status: response.status });
    }

    const paymentUrl = await response.text();
    if (!paymentUrl.startsWith("http")) {
      return NextResponse.json({ error: "Invalid response from HotPay" }, { status: 500 });
    }

    return NextResponse.json({ payment_url: paymentUrl });
  } catch (error) {
    console.error("Błąd płatności:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
