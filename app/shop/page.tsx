"use client"

import React, { useState } from "react";
import Image from "next/image";

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
    description: "Najwyższy poziom rangi, dostęp do wszystkiego co tylko możliwe dla Vipa. Ranga na 60 dni!",
    price: "99.99 PLN",
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
    <div className="flex flex-col w-full bg-gray-900 text-white p-6 rounded-lg gap-6 max-w-[1400px] mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Sklep</h2>

      {/* Informacja o płatnościach */}
      <div className="bg-yellow-500 text-gray-900 p-4 rounded-md mb-6">
        <h3 className="font-bold">Pracujemy nad zaimplementowaniem nowych sposobów płatności do naszej strony.</h3>
        <p>
          Jeśli chcesz zakupić rangę przez <strong>paysafecard</strong> lub <strong>paypal</strong>, to załóż ticketa na naszym discordzie - <a href="https://dc.stylowamc.pl" className="text-blue-600 underline">dc.stylowamc.pl</a> lub skontaktuj się z właścicielem serwera - <strong>Stylowy (Stylisher)</strong>. Aktualnie jedynymi metodami platnosci jest BLIK oraz przelew.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl">
        {items.map((item: Item) => (
          <div key={item.id} className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center text-center h-full">
            <Image src={item.image} alt={item.name} className="mb-4" height={80} width={80}/>
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-gray-400 text-sm mt-2 flex-grow">{item.description}</p>
            <p className="text-yellow-400 font-bold text-lg mt-3">{item.price}</p>
            <button
        onClick={() => openModal(item)}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-semibold transition duration-200"
      >
        Kup teraz
      </button>
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
            <button onClick={handlePurchase} className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-semibold">
              Potwierdź
            </button>
          </div>
        </div>
      )}
    </div>
  );
}