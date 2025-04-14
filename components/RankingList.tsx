"use client";

import { useEffect, useState } from "react";
import { FaMedal, FaSpinner, FaCrown, FaCoins, FaChartLine, FaGift } from "react-icons/fa";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';

interface RankingEntry {
  name: string;
  amount: number;
}

interface LastPurchase {
  name: string;
  service_name: string;
  createdAt: string;
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

export default function RankingList() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rankingData, setRankingData] = useState<RankingEntry[]>([]);
  const [lastPurchase, setLastPurchase] = useState<LastPurchase | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [rankingResponse, lastPurchaseResponse] = await Promise.all([
          fetch('/api/orders/stats'),
          fetch('/api/orders/last')
        ]);
        
        if (!rankingResponse.ok || !lastPurchaseResponse.ok) {
          throw new Error(`Błąd HTTP`);
        }
        
        const rankingData = await rankingResponse.json();
        const lastPurchaseData = await lastPurchaseResponse.json();
        
        // Przekształcenie obiektu z wydatkami na tablicę i sortowanie
        const rankingArray = Object.entries(rankingData.spending || {})
          .map(([name, amount]) => ({ 
            name, 
            amount: typeof amount === 'number' ? amount : parseFloat(amount as string) 
          }))
          .sort((a, b) => b.amount - a.amount)
          .slice(0, 10);
        
        setRankingData(rankingArray);
        setLastPurchase(lastPurchaseData.lastPurchase);
      } catch (error) {
        console.error("❌ Błąd pobierania danych:", error);
        setError(error instanceof Error ? error.message : 'Wystąpił nieznany błąd.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Funkcja formatująca datę
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('pl-PL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
            <p className="ml-3 text-gray-400">Ładowanie danych...</p>
          </motion.div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-8"
          >
            <p className="text-red-400">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 text-sm text-gray-400 hover:text-gray-300"
            >
              Spróbuj ponownie
            </button>
          </motion.div>
        ) : (
          <>
            {/* Ranking list */}
            {rankingData.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                {rankingData.map((player, index) => (
                  <motion.div
                    key={player.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link 
                      href={`/panel/${player.name}`}
                      className={`relative flex items-center ${
                        index < 3 
                          ? `bg-${getMedalColor(index).split("-")[1]}-500/10 border border-${getMedalColor(index).split("-")[1]}-500/30` 
                          : "bg-gray-700/30"
                      } rounded-lg p-4 transition-all duration-300 hover:scale-[1.02] group cursor-pointer`}
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
                          <p className="font-semibold truncate group-hover:text-yellow-400 transition-colors">
                            {player.name}
                          </p>
                          <p className={`text-sm ${getMedalColor(index)}`}>
                            {player.amount.toLocaleString('pl-PL', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })} PLN
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Last purchase section */}
            {lastPurchase && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 pt-6 border-t border-gray-700"
              >
                <div className="flex items-center gap-2 mb-3">
                  <FaGift className="text-green-400" />
                  <h3 className="text-lg font-semibold text-gray-200">Ostatni Zakup</h3>
                </div>
                <Link 
                  href={`/panel/${lastPurchase.name}`}
                  className="block bg-gray-700/30 rounded-lg p-4 hover:bg-gray-700/50 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={`https://minotar.net/avatar/${lastPurchase.name}/40`}
                      alt={lastPurchase.name}
                      width={40}
                      height={40}
                      className="rounded-lg transition-transform duration-300 group-hover:scale-110"
                    />
                    <div>
                      <p className="font-medium group-hover:text-yellow-400 transition-colors">
                        {lastPurchase.name}
                      </p>
                      <p className="text-sm text-gray-400">
                        {lastPurchase.service_name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(lastPurchase.createdAt)}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {rankingData.length === 0 && (
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
          </>
        )}
      </AnimatePresence>
    </aside>
  );
}
