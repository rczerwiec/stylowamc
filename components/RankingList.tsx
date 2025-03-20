"use client";

import { useEffect, useState } from "react";
import { FaMedal, FaSpinner, FaCrown, FaCoins, FaChartLine, FaGift } from "react-icons/fa";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Player {
  name: string;
  amount: number;
}

const getMedalColor = (position: number) => {
  switch (position) {
    case 0:
      return "text-yellow-400";
    case 1:
      return "text-gray-300";
    case 2:
      return "text-yellow-600";
    default:
      return "text-gray-500";
  }
};

const RankingList = () => {
  const [ranking, setRanking] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState<'spending'>('spending');

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch('/api/orders/stats');

        if (!response.ok) {
          throw new Error("Błąd pobierania rankingu");
        }

        const data = await response.json();
        
        // Przekształcamy obiekt na tablicę i sortujemy
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
    <aside className="w-full bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-300 bg-clip-text text-transparent flex items-center gap-2">
          <FaCrown className="text-yellow-500" />
          Top 10 Wspierających
        </h2>
        <FaCoins className="text-yellow-500 text-xl" />
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex justify-center items-center py-8"
          >
            <FaSpinner className="animate-spin text-yellow-500 text-2xl" />
            <p className="ml-3 text-gray-400">Ładowanie rankingu...</p>
          </motion.div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-8"
          >
            <p className="text-red-400">Wystąpił błąd podczas ładowania rankingu.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 text-sm text-gray-400 hover:text-gray-300"
            >
              Spróbuj ponownie
            </button>
          </motion.div>
        ) : ranking.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            {ranking.map((player, index) => (
              <motion.div
                key={player.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center ${
                  index < 3 
                    ? `bg-${getMedalColor(index).split("-")[1]}-500/10 border border-${getMedalColor(index).split("-")[1]}-500/30` 
                    : "bg-gray-700/30"
                } rounded-lg p-4 transition-all duration-300 hover:scale-[1.02] group`}
              >
                {/* Pozycja w rankingu */}
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`flex items-center justify-center w-8 h-8 rounded-lg ${getMedalColor(index)} mr-4`}
                >
                  {index < 3 ? (
                    <FaMedal className="text-lg" />
                  ) : (
                    <span className="font-bold">#{index + 1}</span>
                  )}
                </motion.div>

                {/* Avatar i nazwa gracza */}
                <div className="flex items-center flex-1 min-w-0">
                  <div className="relative">
                    <Image
                      src={`https://minotar.net/avatar/${player.name}/40`}
                      alt={player.name}
                      className="rounded-lg transition-transform duration-300 group-hover:scale-110"
                      width={40}
                      height={40}
                    />
                    {index === 0 && (
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -top-3 -right-3"
                      >
                        <FaCrown className="text-yellow-400 text-lg" />
                      </motion.div>
                    )}
                  </div>
                  <div className="ml-4 min-w-0">
                    <p className="font-semibold truncate">
                      {player.name}
                    </p>
                    <p className={`text-sm ${getMedalColor(index)}`}>
                      {player.amount.toFixed(2)} PLN
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-8"
          >
            <FaGift className="text-yellow-500 text-4xl mx-auto mb-4" />
            <p className="text-gray-400">Brak danych w rankingu</p>
            <p className="text-sm text-gray-500 mt-1">
              Bądź pierwszym wspierającym!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
};

export default RankingList;
