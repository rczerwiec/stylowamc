"use client";

import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

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
            setIslandRanking(data.ranking);
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
      <div className="bg-gray-700 p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-yellow-400 text-center">Czas spędzony na serwerze</h3>
        {loadingTime ? (
          <div className="flex justify-center items-center mt-4">
            <FaSpinner className="animate-spin text-yellow-400 text-2xl" />
            <p className="ml-2 text-gray-400">Ładowanie rankingu...</p>
          </div>
        ) : timeRanking.length > 0 ? (
          <ul className="mt-2 text-gray-300 space-y-2">
            {timeRanking.map((player, index) => (
              <li key={player.uuid} className="flex items-center space-x-3">
                <img
                  src={`https://minotar.net/avatar/${player.name}/32`}
                  alt={player.name}
                  className="w-8 h-8 rounded-md"
                />
                <span>#{index + 1} - {player.name} ({player.time_played})</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-400">Brak danych...</p>
        )}
      </div>

      {/* Ranking Topki Hajsu */}
      <div className="bg-gray-700 p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-yellow-400 text-center">Topka Hajsu</h3>
        {loadingMoney ? (
          <div className="flex justify-center items-center mt-4">
            <FaSpinner className="animate-spin text-yellow-400 text-2xl" />
            <p className="ml-2 text-gray-400">Ładowanie rankingu...</p>
          </div>
        ) : moneyRanking.length > 0 ? (
          <ul className="mt-2 text-gray-300 space-y-2">
            {moneyRanking.map((player, index) => (
              <li key={player.uuid} className="flex items-center space-x-3">
                <img
                  src={`https://minotar.net/avatar/${player.name}/32`}
                  alt={player.name}
                  className="w-8 h-8 rounded-md"
                />
                <span>#{index + 1} - {player.name} ({player.money} $)</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-400">Brak danych...</p>
        )}
      </div>

      {/* Ranking Wysp */}
      <div className="bg-gray-700 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-yellow-400 text-center">Ranking Wysp</h3>
            {loadingIsland ? (
              <div className="flex justify-center items-center mt-4">
                <FaSpinner className="animate-spin text-yellow-400 text-2xl" />
                <p className="ml-2 text-gray-400">Ładowanie rankingu...</p>
              </div>
            ) : islandRanking.length > 0 ? (
              <ul className="mt-2 text-gray-300 space-y-2">
                {islandRanking.map((item) => (
                  <li key={item.position} className="flex items-center space-x-3">
                         <img
                      src={`https://minotar.net/avatar/${item.player_name}/32`}
                      alt={item.player_name}
                      className="w-8 h-8 rounded-md"
                    />
                    <span>#{item.position} - {item.player_name} (Poziom: {item.level})</span>
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
    <div className="flex flex-col items-center justify-center w-full bg-gray-900 text-white p-6 rounded-lg">

      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-5xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Rankingi Serwera</h2>

        {/* Nawigacja zakładek */}
        <div className="flex justify-center mb-6 space-x-4">
          <button
            onClick={() => setActiveTab("Ogólne")}
            className={`px-4 py-2 rounded-md ${
              activeTab === "Ogólne" ? "bg-yellow-500 text-gray-900" : "bg-gray-700 text-gray-300"
            }`}
          >
            Ogólne
          </button>
          <button
            onClick={() => setActiveTab("OneBlock")}
            className={`px-4 py-2 rounded-md ${
              activeTab === "OneBlock" ? "bg-yellow-500 text-gray-900" : "bg-gray-700 text-gray-300"
            }`}
          >
            OneBlock
          </button>
          <button
            onClick={() => setActiveTab("Survival")}
            className={`px-4 py-2 rounded-md ${
              activeTab === "Survival" ? "bg-yellow-500 text-gray-900" : "bg-gray-700 text-gray-300"
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
