'use client'

import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function PaymentSuccessful() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center w-full bg-gray-900 text-white p-6">
      {/* Karta powiadomienia */}
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg text-center max-w-md animate-fade-in">
        {/* Ikona sukcesu */}
        <FaCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />

        {/* Nagłówek */}
        <h2 className="text-2xl font-bold text-green-400">Płatność zakończona! </h2>
        <p className="text-gray-300 mt-2">Dziękujemy za zakup! Twój zamówiony produkt zostanie aktywowany po zaksięgowaniu płatności. Zazwyczaj trwa to do 5 minut.</p>
        <p className="text-gray-300 mt-2">W razie problemów skontaktuj się z nami w celu wyjaśnienia. Pamiętaj o przygotowaniu potwierdzenie zakupu!.</p>
        <p className="text-gray-300 mt-2">Mail kontaktowy: stylowamc.wsparcie@gmail.com</p>
        <p className="text-gray-300 mt-2">Ticket na discordzie: dc.stylowamc.pl</p>
        {/* Przycisk powrotu */}
        <button
          onClick={() => router.push("/")}
          className="mt-6 px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-200"
        >
          Powrót do strony głównej
        </button>
      </div>
    </div>
  );
}
