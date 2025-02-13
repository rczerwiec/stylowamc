"use client"

import React, { useState } from "react";


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
    price: "19.99 PLN",
    image: "/images/logo.png",
  },
  {
    id: 2,
    name: "Ranga SVIP",
    description: "Jeszcze więcej funkcji i specjalne gadżety na serwerze!",
    price: "29.99 PLN",
    image: "/images/logo.png",
  },
  {
    id: 3,
    name: "Ranga MVP",
    description: "Ogromna ilość funkcji, dostęp do unikalnych komend.",
    price: "49.99 PLN",
    image: "/images/logo.png",
  },
  {
    id: 4,
    name: "Ranga UVIP",
    description: "Najwyższy poziom rangi, dostęp do wszystkiego co tylko możliwe dla Vipa",
    price: "99.99 PLN",
    image: "/images/logo.png",
  },
  {
    id: 5,
    name: "10 SMCoinów",
    description: "Zasil swoje konto w grze dodatkową ilością monet!",
    price: "14.99 PLN",
    image: "/images/sunflower.gif",
  },
  {
    id: 6,
    name: "25 SMCoinów",
    description: "Zasil swoje konto w grze dodatkową ilością monet!",
    price: "14.99 PLN",
    image: "/images/sunflower.gif",
  },
  {
    id: 7,
    name: "50 SMCoinów",
    description: "Zasil swoje konto w grze dodatkową ilością monet!",
    price: "14.99 PLN",
    image: "/images/sunflower.gif",
  },
  {
    id: 8,
    name: "100 SMCoinów",
    description: "Zasil swoje konto w grze dodatkową ilością monet!",
    price: "14.99 PLN",
    image: "/images/sunflower.gif",
  },
  {
    id: 9,
    name: "Klucz do Skrzyni Legend",
    description: "Otwórz skrzynię i zdobądź epickie nagrody!",
    price: "9.99 PLN",
    image: "/images/key.png",
  },
  {
    id: 10,
    name: "Klucz do Skrzyni Premium",
    description: "Zdobądź rzadkie przedmioty i bonusy!",
    price: "7.99 PLN",
    image: "/images/key.png",
  },
  {
    id: 11,
    name: "Zestaw Startowy",
    description: "Idealny pakiet dla nowych graczy: broń, narzędzia, zbroja.",
    price: "24.99 PLN",
    image: "/images/iron-pickaxe.png",
  },
  {
    id: 12,
    name: "Elitarny Zestaw",
    description: "Najlepsze przedmioty dla doświadczonych graczy!",
    price: "59.99 PLN",
    image: "/images/diamond-pickaxe.png",
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
    const serviceName = selectedItem.name;
  
    const requestBody = {
      KWOTA: amount,
      NAZWA_USLUGI: serviceName,
      ADRES_WWW: "https://web.stylowamc.pl/thanks",
      ID_ZAMOWIENIA: orderId,
      EMAIL: "test@example.com",
    };
  
    try {
      const response = await fetch("/api/hotpay/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
  
      const data = await response.json();
  
      if (data.payment_url) {
        console.log("Przekierowanie do płatności:", data.payment_url);
        window.location.href = data.payment_url;
      } else {
        alert("Błąd podczas inicjalizacji płatności");
      }
    } catch (error) {
      console.error("Błąd płatności:", error);
      alert("Wystąpił błąd, spróbuj ponownie");
    }
  };


  return (
    <div className="flex flex-col items-center justify-center w-full bg-gray-900 text-white p-6 rounded-xl">
      <h2 className="text-3xl font-bold mb-6">🎁 Sklep 🎁</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl">
        {items.map((item: Item) => (
          <div
            key={item.id}
            className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center text-center h-full"
          >
            <img src={item.image} alt={item.name} className="w-20 h-20 mb-4" />
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-gray-400 text-sm mt-2 flex-grow">{item.description}</p>
            <p className="text-yellow-400 font-bold text-lg mt-3">{item.price}</p>
            <div className="mt-auto">
              <button
                onClick={() => openModal(item)}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-semibold transition duration-200"
              >
                Kup teraz
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={closeModal}>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96 text-center" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">Kupujesz: {selectedItem.name}</h2>
            <p className="text-gray-400 mb-4">Podaj swój nick z serwera:</p>
            <input
              type="text"
              className="w-full p-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Wpisz swój nick"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <div className="mt-4 flex justify-between">
              <button
                onClick={closeModal}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md font-semibold transition duration-200"
              >
                Anuluj
              </button>
              <button
                onClick={handlePurchase}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-semibold transition duration-200"
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

