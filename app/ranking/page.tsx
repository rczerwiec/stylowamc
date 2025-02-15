"use client";

import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

interface PlayerTime {
  uuid: string;
  name: string;
  time_played: string; // 🔥 Format `hh:mm`
}

interface PlayerMoney {
  uuid: string;
  name: string;
  money: number; // 🔥 PLN
}

export default function Ranking() {
  const [timeRanking, setTimeRanking] = useState<PlayerTime[]>([]);
  const [moneyRanking, setMoneyRanking] = useState<PlayerMoney[]>([]);
  const [loadingTime, setLoadingTime] = useState(true);
  const [loadingMoney, setLoadingMoney] = useState(true);

  useEffect(() => {
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

    fetchTimeRanking();
    fetchMoneyRanking();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full bg-gray-900 text-white p-6 rounded-lg">
      <div className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-md mb-6">
        Uwaga: System rankingowy jest w trakcie tworzenia. Niektóre dane mogą być nieaktualne.
      </div>

      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-5xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Rankingi Serwera</h2>

        {/* 🔥 Układ zmienia się w zależności od urządzenia */}
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

          {/* Ranking Topka Hajsu */}
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

          {/* Ranking WKRÓTCE */}
          <div className="bg-gray-700 p-4 rounded-lg shadow-md flex flex-col justify-center items-center">
            <h3 className="text-xl font-semibold text-gray-400 text-center">Ranking Wkrótce</h3>
            <p className="text-gray-500 mt-4">Nowy ranking w przygotowaniu...</p>
            <FaSpinner className="animate-spin text-gray-500 text-2xl mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
