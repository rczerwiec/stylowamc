"use client"

import React, { useState } from "react";
import Image from "next/image";
import { FaDiscord } from "react-icons/fa";
import Link from "next/link";

interface Item {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

const items = [
  {
    id: 1,
    name: "Ranga VIP",
    description: "Dostęp do ekskluzywnych przywilejów i komend VIP.",
    price: "9.99 PLN",
    image: "/images/logo.png",
  },
  {
    id: 2,
    name: "Ranga SVIP",
    description: "Jeszcze więcej funkcji i specjalne gadżety na serwerze!",
    price: "24.99 PLN",
    image: "/images/logo.png",
  },
  {
    id: 3,
    name: "Ranga MVP",
    description: "Ogromna ilość funkcji, dostęp do unikalnych komend. Ranga na 45 dni!",
    price: "44.99 PLN",
    image: "/images/logo.png",
  },
  {
    id: 4,
    name: "Ranga UVIP",
    description: "Najwyższy poziom rangi, dostęp do wszystkiego co tylko możliwe dla Vipa. Ranga na 75 dni!",
    price: "89.99 PLN",
    image: "/images/logo.png",
  },
  {
    id: 5,
    name: "10 SMCoinów",
    description: "Zasil swoje konto w grze dodatkową ilością monet!",
    price: "9.99 PLN",
    image: "/images/sunflower.gif",
  },
  {
    id: 6,
    name: "25 SMCoinów",
    description: "Zasil swoje konto w grze dodatkową ilością monet!",
    price: "23.99 PLN",
    image: "/images/sunflower.gif",
  },
  {
    id: 7,
    name: "50 SMCoinów",
    description: "Zasil swoje konto w grze dodatkową ilością monet!",
    price: "46.99 PLN",
    image: "/images/sunflower.gif",
  },
  {
    id: 8,
    name: "100 SMCoinów",
    description: "Zasil swoje konto w grze dodatkową ilością monet!",
    price: "89.99 PLN",
    image: "/images/sunflower.gif",
  },
  {
    id: 9,
    name: "Fly na Wyspie",
    description: "Wykup sobie możliwość latania na swojej wyspie na 30 dni!",
    price: "9.99 PLN",
    image: "/images/fly.png",
  },
];

export default function Shop() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [nickname, setNickname] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (item: Item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNickname("");
  };

  const handlePurchase = async () => {
    if (!selectedItem || !nickname) return;
  
    const orderId = `order_${Date.now()}`;
    const amount = selectedItem.price.replace(" PLN", "");
  
    const requestBody = {
      orderId,
      amount,
      service_name: selectedItem.name,
      name: nickname, // ✅ Dodajemy nazwę gracza
      status: "PENDING",
      KWOTA: amount,
      NAZWA_USLUGI: selectedItem.name,
      ADRES_WWW: "https://www.stylowamc.pl/shop/successful",
      ID_ZAMOWIENIA: orderId,
      EMAIL: "test@example.com",
    };
  
    try {
      // 1️⃣ **Najpierw zapisujemy zamówienie w bazie**
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          amount,
          service_name: selectedItem.name,
          name: nickname, // ✅ Przekazujemy nazwę gracza
          status: "PENDING",
        }),
      });
  
      // 2️⃣ **Następnie przekierowujemy do HotPay**
      const response = await fetch("/api/hotpay/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
  
      const html = await response.text();
  
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.open();
        newWindow.document.write(html);
        newWindow.document.close();
      }
    } catch (error) {
      console.error("❌ Błąd płatności:", error);
      alert("❌ Wystąpił błąd, spróbuj ponownie");
    }
  };
  
  return (
    <div className="w-full">
      {/* Nagłówek */}
      <div className="w-full bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 mb-6">
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-yellow-500 to-yellow-300 bg-clip-text text-transparent">
          🛒 Sklep
        </h2>
      </div>

      {/* Informacja o płatnościach */}
      <div className="w-full bg-yellow-500/10 backdrop-blur-sm border border-yellow-500/30 p-6 rounded-lg mb-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Informacja o płatnościach */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-yellow-400 mb-3 flex items-center gap-2">
              ⚠️ Dostępne metody płatności
            </h3>
            <p className="text-white/90 leading-relaxed">
              Aktualnie obsługujemy płatności poprzez <strong className="text-yellow-400">BLIK</strong> oraz <strong className="text-yellow-400">przelew online</strong>.
              <br />
              Chcesz zapłacić przez <strong className="text-yellow-400">paysafecard</strong>? Napisz prywatną wiadomość do <strong className="text-yellow-400">Styles (Stylisher)</strong> na Discordzie lub utwórz ticket:
            </p>
            <div className="flex flex-wrap gap-4 mt-3">
              <a 
                href="https://dc.stylowamc.pl" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] text-white px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium"
              >
                <FaDiscord className="text-lg" />
                Discord
              </a>
              <a 
                href="mailto:stylowamc.wsparcie@gmail.com"
                className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium"
              >
                ✉️ Email
              </a>
            </div>
          </div>

          {/* Informacja o rangach */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-blue-400 mb-3 flex items-center gap-2">
              ℹ️ Opis rang i przywilejów
            </h3>
            <p className="text-white/90 leading-relaxed">
              Chcesz dowiedzieć się więcej o dostępnych rangach i ich przywilejach? Sprawdź szczegółowy opis każdej rangi:
            </p>
            <div className="mt-3">
              <Link
                href="https://docs.google.com/spreadsheets/d/1dzcaZ_wtZOlHw3BcOiQzo-FkXHSuTrbckFp0pRP05cM/edit?gid=0#gid=0"
                target="_blank"
                className="text-yellow-500 hover:text-yellow-400 transition-colors"
              >
                Sprawdź szczegółowy opis rang
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Lista przedmiotów */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item: Item) => (
          <div 
            key={item.id} 
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-6 rounded-lg flex flex-col items-center text-center h-full transition-all duration-300 hover:border-gray-700 hover:transform hover:scale-[1.02]"
          >
            <div className="relative w-20 h-20 mb-4">
              <Image 
                src={item.image} 
                alt={item.name} 
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
            <p className="text-gray-400 text-sm flex-grow">{item.description}</p>
            <p className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-300 bg-clip-text text-transparent my-4">
              {item.price}
            </p>
            <button
              onClick={() => openModal(item)}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Kup teraz
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50" onClick={closeModal}>
          <div 
            className="bg-gray-900/90 backdrop-blur-sm border border-gray-800 p-8 rounded-lg w-full max-w-md mx-4" 
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
              Kupujesz: {selectedItem.name}
            </h2>
            <p className="text-gray-400 mb-4">Podaj swój nick z serwera:</p>
            <input
              type="text"
              className="w-full px-4 py-3 mb-6 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Wpisz swój nick"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <div className="flex gap-4">
              <button 
                onClick={closeModal}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition-all duration-200"
              >
                Anuluj
              </button>
              <button 
                onClick={handlePurchase} 
                className="flex-1 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Potwierdź
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}