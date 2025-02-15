"use client";

import { useEffect, useState } from "react";
import { FaMedal, FaSpinner } from "react-icons/fa";

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

        // 🔥 Przekształcamy dane do formatu { name, amount }
        const rankingArray = Object.entries(data.spending)
          .map(([name, amount]) => ({ name, amount: Number(amount) }))
          .sort((a, b) => b.amount - a.amount) // Sortujemy od największej kwoty
          .slice(0, 10); // TOP 10

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
    <aside className="w-full md:w-2/7 p-4 md:p-6 bg-[#1A1A1A] rounded-xl border border-gray-700 shadow-strong font-alegreya-sans">
      <h2 className="text-lg md:text-xl font-bold mb-4 text-primary flex items-center justify-center md:justify-start">
        <FaMedal className="mr-2 text-yellow-400" />
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
        <ul className="space-y-2 md:space-y-3 w-full">
          {ranking.map((player, index) => (
            <li
              key={index}
              className="flex gap-3 md:gap-1 items-center justify-between bg-gray-800 px-4 py-3 md:px-3 md:py-2 rounded-lg shadow-md w-full"
            >
              <div className="flex items-center space-x-3 md:space-x-3 w-full">
                <img
                  src={`https://minotar.net/avatar/${player.name}/32`}
                  alt={player.name}
                  className="w-8 h-8 md:w-8 md:h-8 rounded-md"
                />
                <span className="text-text-light font-medium flex-1">
                  {index + 1}. {player.name}
                </span>
                <span className="text-primary font-bold">{player.amount} PLN</span>
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
