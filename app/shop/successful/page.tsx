"use client";

import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaBan  } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function PaymentStatus() {
  const [status, setStatus] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Pobieramy status płatności z localStorage
    const paymentStatus = localStorage.getItem("payment_status");

    if (paymentStatus) {
      setStatus(paymentStatus);
      localStorage.removeItem("payment_status"); // Usuwamy, żeby nie było zapamiętywane na stałe
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-900 text-white p-6">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg text-center max-w-md animate-fade-in">
        {status === "success" ? (
          <>
            <FaCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-400">Płatność zakończona sukcesem! ✅</h2>
            <p className="text-gray-300 mt-2">Dziękujemy za zakup! Twój zamówiony produkt został aktywowany.</p>
          </>
        ) : status === "failure" ? (
          <>
            <FaBan className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-red-400">Płatność nie powiodła się! ❌</h2>
            <p className="text-gray-300 mt-2">Coś poszło nie tak. Spróbuj ponownie lub skontaktuj się z administracją.</p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-yellow-400">Brak informacji o płatności!</h2>
            <p className="text-gray-300 mt-2">Nie znaleziono informacji o płatności. Może upłynął czas sesji?</p>
          </>
        )}

        <button
          onClick={() => router.push("/")}
          className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
        >
          Powrót do strony głównej
        </button>
      </div>
    </div>
  );
}
