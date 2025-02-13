import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const SECRET_KEY = process.env.HOTPAY_SECRET_KEY;
    if (!SECRET_KEY) {
      return NextResponse.json({ error: "Missing Secret Key" }, { status: 500 });
    }

    const body = await req.formData();
    const SEKRET = body.get("SEKRET");
    const KWOTA = body.get("KWOTA");
    const STATUS = body.get("STATUS");
    const ID_ZAMOWIENIA = body.get("ID_ZAMOWIENIA");
    const ID_PLATNOSCI = body.get("ID_PLATNOSCI");
    const SECURE = body.get("SECURE");
    const HASH = body.get("HASH");

    if (!SEKRET || !KWOTA || !STATUS || !ID_ZAMOWIENIA || !ID_PLATNOSCI || !SECURE || !HASH) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    // Tworzenie własnego hasha dla weryfikacji autentyczności
    const hashString = `${SECRET_KEY};${KWOTA};${ID_PLATNOSCI};${ID_ZAMOWIENIA};${STATUS};${SECURE};${SEKRET}`;
    const encoder = new TextEncoder();
    const hashBuffer = await crypto.subtle.digest("SHA-256", encoder.encode(hashString));
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const calculatedHash = hashArray.map(byte => byte.toString(16).padStart(2, "0")).join("");

    if (calculatedHash !== HASH) {
      return NextResponse.json({ error: "Invalid hash" }, { status: 403 });
    }

    if (STATUS === "SUCCESS") {
      console.log(`✅ Płatność zaakceptowana! ID zamówienia: ${ID_ZAMOWIENIA}`);
      // Tutaj dodaj aktualizację bazy danych
    } else if (STATUS === "PENDING") {
      console.log(`⌛ Płatność oczekuje na potwierdzenie. ID zamówienia: ${ID_ZAMOWIENIA}`);
    } else {
      console.log(`❌ Płatność odrzucona. ID zamówienia: ${ID_ZAMOWIENIA}`);
    }

    return NextResponse.json({ message: "Notification received" }, { status: 200 });
  } catch (error) {
    console.error("Błąd obsługi webhooka:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}