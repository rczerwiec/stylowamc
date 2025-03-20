"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaSpinner } from "react-icons/fa";
import Link from "next/link";

interface PlayerTime {
  uuid: string;
  name: string;
  time_played: string; // Format hh:mm
}

interface PlayerMoney {
  uuid: string;
  name: string;
  money: number;
}

interface IslandRanking {
  position: number;
  player_name: string;
  level: number;
}

export default function Ranking() {
  const [activeTab, setActiveTab] = useState("OneBlock");

  const [timeRanking, setTimeRanking] = useState<PlayerTime[]>([]);
  const [moneyRanking, setMoneyRanking] = useState<PlayerMoney[]>([]);
  const [islandRanking, setIslandRanking] = useState<IslandRanking[]>([]);
  const [loadingTime, setLoadingTime] = useState(true);
  const [loadingMoney, setLoadingMoney] = useState(true);
  const [loadingIsland, setLoadingIsland] = useState(true);

  useEffect(() => {
    if (activeTab === "OneBlock") {
      const fetchTimeRanking = async () => {
        try {
          setLoadingTime(true);
          const response = await fetch("/api/ranking/player-time");
          const data = await response.json();
          if (data.ranking) {
            setTimeRanking(data.ranking);
          }
        } catch (error) {
          console.error("❌ Błąd pobierania rankingu czasu gry:", error);
        } finally {
          setLoadingTime(false);
        }
      };

      const fetchMoneyRanking = async () => {
        try {
          setLoadingMoney(true);
          const response = await fetch("/api/ranking/player-money");
          const data = await response.json();
          if (data.ranking) {
            setMoneyRanking(data.ranking);
          }
        } catch (error) {
          console.error("❌ Błąd pobierania rankingu hajsu:", error);
        } finally {
          setLoadingMoney(false);
        }
      };

      const fetchIslandRanking = async () => {
        try {
          setLoadingIsland(true);
          const response = await fetch("/api/ranking/island-level");
          const data = await response.json();
          if (data.ranking) {
            // Sortowanie rankingu wysp od najwyższego do najniższego poziomu
            const sortedRanking = [...data.ranking].sort((a, b) => b.level - a.level);
            // Aktualizacja pozycji po sortowaniu
            const rankingWithUpdatedPositions = sortedRanking.map((item, index) => ({
              ...item,
              position: index + 1
            }));
            setIslandRanking(rankingWithUpdatedPositions);
          }
        } catch (error) {
          console.error("❌ Błąd pobierania rankingu wysp:", error);
        } finally {
          setLoadingIsland(false);
        }
      };

      fetchTimeRanking();
      fetchMoneyRanking();
      fetchIslandRanking();
    }
  }, [activeTab]);

  const renderOneBlockTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Ranking Czasu Gry */}
      <div className="bg-gray-700/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-600">
        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 text-center mb-4">
          Czas spędzony na serwerze
        </h3>
        {loadingTime ? (
          <div className="flex justify-center items-center mt-4">
            <FaSpinner className="animate-spin text-yellow-400 text-2xl" />
            <p className="ml-2 text-gray-400">Ładowanie rankingu...</p>
          </div>
        ) : timeRanking.length > 0 ? (
          <ul className="mt-2 text-gray-300 space-y-2">
            {timeRanking.map((player, index) => (
              <li key={player.uuid}>
                <Link 
                  href={`/panel/${player.name}`}
                  className="flex items-center space-x-3 hover:bg-gray-600/50 p-3 rounded-lg transition-all duration-300 group"
                >
                  <div className="relative">
                    <Image
                      src={`https://minotar.net/avatar/${player.name}/32`}
                      alt={player.name}
                      width={32}
                      height={32}
                      className="rounded-lg transition-transform duration-300 group-hover:scale-110"
                    />
                    {index < 3 && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center rounded-full text-xs font-bold" style={{
                        background: index === 0 ? 'linear-gradient(to bottom right, #FFD700, #FFA500)' : 
                                  index === 1 ? 'linear-gradient(to bottom right, #C0C0C0, #A0A0A0)' :
                                  'linear-gradient(to bottom right, #CD7F32, #8B4513)',
                        color: index === 0 ? '#000' : '#fff'
                      }}>
                        {index + 1}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium group-hover:text-yellow-400 transition-colors duration-300">{player.name}</span>
                    <span className="text-sm text-gray-400">{player.time_played}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-400">Brak danych...</p>
        )}
      </div>

      {/* Ranking Topki Hajsu */}
      <div className="bg-gray-700/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-600">
        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 text-center mb-4">
          Topka Hajsu
        </h3>
        {loadingMoney ? (
          <div className="flex justify-center items-center mt-4">
            <FaSpinner className="animate-spin text-yellow-400 text-2xl" />
            <p className="ml-2 text-gray-400">Ładowanie rankingu...</p>
          </div>
        ) : moneyRanking.length > 0 ? (
          <ul className="mt-2 text-gray-300 space-y-2">
            {moneyRanking.map((player, index) => (
              <li key={player.uuid}>
                <Link 
                  href={`/panel/${player.name}`}
                  className="flex items-center space-x-3 hover:bg-gray-600/50 p-3 rounded-lg transition-all duration-300 group"
                >
                  <div className="relative">
                    <Image
                      src={`https://minotar.net/avatar/${player.name}/32`}
                      alt={player.name}
                      width={32}
                      height={32}
                      className="rounded-lg transition-transform duration-300 group-hover:scale-110"
                    />
                    {index < 3 && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center rounded-full text-xs font-bold" style={{
                        background: index === 0 ? 'linear-gradient(to bottom right, #FFD700, #FFA500)' : 
                                  index === 1 ? 'linear-gradient(to bottom right, #C0C0C0, #A0A0A0)' :
                                  'linear-gradient(to bottom right, #CD7F32, #8B4513)',
                        color: index === 0 ? '#000' : '#fff'
                      }}>
                        {index + 1}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium group-hover:text-yellow-400 transition-colors duration-300">{player.name}</span>
                    <span className="text-sm text-gray-400">{player.money.toFixed(2)} $</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-400">Brak danych...</p>
        )}
      </div>

      {/* Ranking Wysp */}
      <div className="bg-gray-700/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-600">
        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 text-center mb-4">
          Ranking Wysp
        </h3>
        {loadingIsland ? (
          <div className="flex justify-center items-center mt-4">
            <FaSpinner className="animate-spin text-yellow-400 text-2xl" />
            <p className="ml-2 text-gray-400">Ładowanie rankingu...</p>
          </div>
        ) : islandRanking.length > 0 ? (
          <ul className="mt-2 text-gray-300 space-y-2">
            {islandRanking.map((item, index) => (
              <li key={`${item.player_name}-${item.level}`}>
                <Link 
                  href={`/panel/${item.player_name}`}
                  className="flex items-center space-x-3 hover:bg-gray-600/50 p-3 rounded-lg transition-all duration-300 group"
                >
                  <div className="relative">
                    <Image
                      src={`https://minotar.net/avatar/${item.player_name}/32`}
                      alt={item.player_name}
                      width={32}
                      height={32}
                      className="rounded-lg transition-transform duration-300 group-hover:scale-110"
                    />
                    {index < 3 && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center rounded-full text-xs font-bold" style={{
                        background: index === 0 ? 'linear-gradient(to bottom right, #FFD700, #FFA500)' : 
                                  index === 1 ? 'linear-gradient(to bottom right, #C0C0C0, #A0A0A0)' :
                                  'linear-gradient(to bottom right, #CD7F32, #8B4513)',
                        color: index === 0 ? '#000' : '#fff'
                      }}>
                        {index + 1}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium group-hover:text-yellow-400 transition-colors duration-300">{item.player_name}</span>
                    <span className="text-sm text-gray-400">Poziom: {item.level}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-400">Brak danych...</p>
        )}
      </div>
    </div>
  );

  const renderPlaceholder = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <FaSpinner className="animate-spin text-yellow-400 text-4xl" />
      <p className="mt-4 text-gray-400">Ranking w trakcie prac...</p>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-700 w-full">
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
          Rankingi Serwera
        </h2>

        {/* Nawigacja zakładek */}
        <div className="flex justify-center mb-8 space-x-4">
          <button
            onClick={() => setActiveTab("Ogólne")}
            className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === "Ogólne" 
                ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 shadow-lg" 
                : "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Ogólne
          </button>
          <button
            onClick={() => setActiveTab("OneBlock")}
            className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === "OneBlock" 
                ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 shadow-lg" 
                : "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
            }`}
          >
            OneBlock
          </button>
          <button
            onClick={() => setActiveTab("Survival")}
            className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === "Survival" 
                ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 shadow-lg" 
                : "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Survival
          </button>
        </div>

        {activeTab === "OneBlock" ? renderOneBlockTab() : renderPlaceholder()}
      </div>
    </div>
  );
}
