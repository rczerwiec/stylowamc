"use client";

import { useEffect, useState } from "react";
import { FaMedal, FaSpinner } from "react-icons/fa";
import Image from "next/image";

interface Player {
  name: string;
  amount: number;
}

const RankingList = () => {
  const [ranking, setRanking] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch("/api/orders/stats");

        if (!response.ok) {
          throw new Error("Błąd pobierania rankingu");
        }

        const data = await response.json();

        const rankingArray = Object.entries(data.spending)
          .map(([name, amount]) => ({ name, amount: Number(amount) }))
          .sort((a, b) => b.amount - a.amount)
          .slice(0, 10);

        setRanking(rankingArray);
      } catch (error) {
        console.error("❌ Błąd pobierania rankingu:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRanking();
  }, []);

  return (
    <aside className="w-full lg:w-96 p-4 md:p-6 bg-[#1A1A1A] rounded-xl border border-gray-700 shadow-strong font-alegreya-sans">
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-primary flex items-center justify-center">
        <FaMedal className="mr-3 text-yellow-400" />
        Ranking ItemShop&apos;a
      </h2>

      {loading ? (
        <div className="flex justify-center items-center mt-4">
          <FaSpinner className="animate-spin text-yellow-400 text-2xl" />
          <p className="ml-2 text-gray-400">Ładowanie rankingu...</p>
        </div>
      ) : error ? (
        <p className="text-center text-red-400">Błąd ładowania rankingu.</p>
      ) : ranking.length > 0 ? (
        <ul className="space-y-3">
          {ranking.map((player, index) => (
            <li
              key={index}
              className="flex items-center bg-gray-800 px-4 py-3 rounded-lg shadow-md hover:bg-gray-750 transition-colors duration-200"
            >
              <div className="flex items-center min-w-0 w-full">
                {/* Pozycja w rankingu */}
                <span className="text-gray-400 font-medium min-w-[30px]">
                  #{index + 1}
                </span>

                {/* Avatar gracza */}
                <div className="flex-shrink-0 mx-3">
                  <Image
                    src={`https://minotar.net/avatar/${player.name}/32`}
                    alt={player.name}
                    className="rounded-md"
                    width={32}
                    height={32}
                  />
                </div>

                {/* Nazwa gracza */}
                <span className="text-text-light font-medium truncate flex-1">
                  {player.name}
                </span>

                {/* Kwota */}
                <span className="text-primary font-bold ml-3 flex-shrink-0">
                  {player.amount.toFixed(2)} PLN
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-400">Brak danych...</p>
      )}
    </aside>
  );
};

export default RankingList;
