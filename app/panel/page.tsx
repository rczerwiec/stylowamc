"use client";

import React, { useEffect, useState } from "react";
import { auth } from "@/app/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import Link from "next/link";
import { FaClock, FaMoneyBillWave, FaSignOutAlt, FaShoppingCart, FaTrophy, FaChartBar, FaSpinner } from "react-icons/fa";
import Image from "next/image";

interface PlayerStats {
  uuid: string;
  name: string;
  join_date: string;
  last_seen: string;
  money_spent_pln: number;
  achievements_count: number;
  general: {
    money: number;
    playtime: number;
    smcoins: number;
  };
  oneblock: {
    uuid: string;
    name: string;
    kills: number;
    deaths: number;
    money: number;
    playtime: number;
    island_level: number;
    smcoins: number;
    broken_blocks: number;
    mob_kills: number;
  } | null;
  survival: {
    uuid: string;
    name: string;
    kills: number;
    deaths: number;
    money: number;
    playtime: number;
    island_level: number;
    smcoins: number;
    broken_blocks: number;
    mob_kills: number;
  } | null;
  mode3: null;
  mode4: null;
  mode5: null;
}

interface Achievement {
  id: number;
  uuid: string;
  player_name: string;
  achievement_id: string;
  achievement_name: string;
  achievement_description: string;
  material: string;
  unlock_date: string;
}

const formatPlayTime = (ticks: number) => {
  const totalMinutes = ticks / 60; // Konwersja ticków na minuty
  const days = Math.floor(totalMinutes / 1440); // 1 dzień = 1440 minut
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = Math.floor(totalMinutes % 60);

  return `${days > 0 ? `${days}d ` : ""}${hours}h ${minutes}m`;
};

// Funkcja do pobierania ikon przedmiotów z oficjalnego CDN Minecrafta
const getMaterialImage = (material: string) => {
  const materialName = material.toLowerCase();
  return `https://minecraft-api.vercel.app/images/items/${materialName}.png`;
};

export default function PlayerPanel() {
  const [user] = useAuthState(auth);
  const [stats, setStats] = useState<PlayerStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [userName, setUserName] = useState<string | null>(null);
  const [userUID, setUserUID] = useState<string | null>(null);
  const [activeMode, setActiveMode] = useState('general'); // 'general', 'oneblock', 'survival'
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loadingAchievements, setLoadingAchievements] = useState(true);

  // Pobieramy dane użytkownika (nazwa i uuid) na podstawie emaila
  useEffect(() => {
    if (user && user.email) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`/api/user?email=${user.email}`);
          const data = await response.json();
          console.log("DANE GRACZA",data);
          if (response.ok) {
            setUserName(data.name || "Nowy użytkownik");
            setUserUID(data.uuid);
          } else {
            console.error("Błąd pobierania użytkownika:", data.error);
          }
        } catch (error) {
          console.error("Błąd sieci podczas pobierania danych użytkownika:", error);
        }
      };
      fetchUserData();
    }
  }, [user]);

  // Pobieramy statystyki gracza, gdy userUID jest już dostępny
  useEffect(() => {
    if (userUID) {
      const fetchStats = async () => {
        try {
          setLoadingStats(true);
          const response = await fetch(`/api/player/stats?uuid=${userUID}`);
          const data = await response.json();
          console.log("STATYSTYKI",data);
          if (data.stats) {
            setStats(data.stats);
          } else {
            console.error("Brak statystyk w odpowiedzi");
          }
        } catch (error) {
          console.error("❌ Błąd pobierania statystyk gracza:", error);
        } finally {
          setLoadingStats(false);
        }
      };
      fetchStats();
    }
  }, [userUID]);

  // Dodaj nowy useEffect do pobierania osiągnięć:
  useEffect(() => {
    if (userUID) {
      const fetchAchievements = async () => {
        try {
          setLoadingAchievements(true);
          const response = await fetch(`/api/player/achievements?uuid=${userUID}`);
          const data = await response.json();
          console.log("Osiągnięcia",data);
          if (data.achievements) {
            setAchievements(data.achievements);
          }
        } catch (error) {
          console.error("Błąd pobierania osiągnięć:", error);
        } finally {
          setLoadingAchievements(false);
        }
      };
      fetchAchievements();
    }
  }, [userUID]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("✅ Wylogowano pomyślnie!");
    } catch (error) {
      console.error("❌ Błąd podczas wylogowywania:", error);
      toast.error("❌ Wystąpił błąd podczas wylogowywania.");
    }
  };

  const renderGeneralStats = () => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-yellow-400 mb-4">Statystyki ogólne</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Osiągnięcia */}
          <div className="bg-gray-700 p-4 rounded-lg min-h-[80px] flex items-center">
            <div className="flex justify-between items-center w-full">
              <span className="text-gray-300 text-sm">Zdobyte osiągnięcia:</span>
              <span className="text-yellow-400 font-semibold ml-2 whitespace-nowrap">
                {stats?.achievements_count || 0} / 50
              </span>
            </div>
          </div>

          {/* Wydane PLN */}
          <div className="bg-gray-700 p-4 rounded-lg min-h-[80px] flex items-center">
            <div className="flex justify-between items-center w-full">
              <span className="text-gray-300 text-sm">Wydane PLN:</span>
              <span className="text-green-400 font-semibold ml-2">
                {stats?.money_spent_pln || 0} zł
              </span>
            </div>
          </div>

          {/* Data dołączenia */}
          <div className="bg-gray-700 p-4 rounded-lg min-h-[80px] flex items-center">
            <div className="flex justify-between items-center w-full">
              <span className="text-gray-300 text-sm">Dołączył(a):</span>
              <span className="text-blue-400 font-semibold ml-2">
                {stats?.join_date ? new Date(stats.join_date).toLocaleDateString('pl-PL') : 'Brak danych'}
              </span>
            </div>
          </div>

          {/* Ostatnio widziany */}
          <div className="bg-gray-700 p-4 rounded-lg min-h-[80px] flex items-center">
            <div className="flex justify-between items-center w-full">
              <span className="text-gray-300 text-sm">Ostatnio online:</span>
              <span className="text-blue-400 font-semibold ml-2">
                {stats?.last_seen ? new Date(stats.last_seen).toLocaleDateString('pl-PL') : 'Brak danych'}
              </span>
            </div>
          </div>
        </div>

        {/* Pasek postępu osiągnięć */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Postęp osiągnięć</span>
            <span className="text-gray-400">
              {((stats?.achievements_count || 0) / 50 * 100).toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-yellow-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${((stats?.achievements_count || 0) / 50 * 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Historia rang */}
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-yellow-400 mb-3">Historia rang</h4>
          <div className="relative pl-6">
            <div className="absolute left-[9px] top-0 bottom-0 w-0.5 bg-gray-600"></div>
            {[
              { rank: "Admin", from: "20.02.2025", to: "26.02.2025", color: "text-red-400", bgColor: "bg-red-400" },
              { rank: "Helper", from: "15.02.2025", to: "20.02.2025", color: "text-blue-400", bgColor: "bg-blue-400" },
              { rank: "Moderator", from: "10.02.2025", to: "15.02.2025", color: "text-green-400", bgColor: "bg-green-400" },
              { rank: "VIP+", from: "05.02.2025", to: "10.02.2025", color: "text-purple-400", bgColor: "bg-purple-400" },
              { rank: "VIP", from: "01.02.2025", to: "05.02.2025", color: "text-pink-400", bgColor: "bg-pink-400" },
              { rank: "Gracz", from: "26.01.2025", to: "obecnie", color: "text-gray-300", bgColor: "bg-gray-300" }
            ].map((role, index) => (
              <div key={index} className="relative mb-4 last:mb-0">
                <div className={`absolute left-[-20px] w-4 h-4 rounded-full ${role.bgColor} border-2 border-gray-800 z-10`}></div>
                <div className="bg-gray-700 rounded-lg p-3 ml-2">
                  <div className="flex flex-col">
                    <span className={`font-bold ${role.color} text-base`}>
                      {role.rank}
                    </span>
                    <span className="text-xs text-gray-400">
                      {role.from} - {role.to}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderOneBlockStats = () => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-yellow-400 mb-4">Statystyki OneBlock</h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Poziom wyspy:</span>
          <span className="text-yellow-400">{stats?.oneblock?.island_level || 0}</span>
        </div>
        <div className="flex justify-between">
          <span>Zniszczone bloki:</span>
          <span className="text-yellow-400">{stats?.oneblock?.broken_blocks || 0}</span>
        </div>
        <div className="flex justify-between">
          <span>Zabite moby:</span>
          <span className="text-yellow-400">{stats?.oneblock?.mob_kills || 0}</span>
        </div>
        <div className="flex justify-between">
          <span>Saldo:</span>
          <span className="text-yellow-400">{stats?.oneblock?.money || 0} $</span>
        </div>
        <div className="flex justify-between">
          <span>Zabójstw:</span>
          <span className="text-yellow-400">{stats?.oneblock?.kills || 0}</span>
        </div>
        <div className="flex justify-between">
          <span>Śmierci:</span>
          <span className="text-yellow-400">{stats?.oneblock?.deaths || 0}</span>
        </div>
        <div className="flex justify-between">
          <span>Czas Gry:</span>
          <span className="text-yellow-400">{formatPlayTime(stats?.oneblock?.playtime || 0)}</span>
        </div>
      </div>
    </div>
  );

  const renderSurvivalStats = () => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-yellow-400 mb-4">Statystyki Survival</h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Czas gry:</span>
          <span className="text-yellow-400">{formatPlayTime(stats?.survival?.playtime || 0)}</span>
        </div>
        <div className="flex justify-between">
          <span>Zabite moby:</span>
          <span className="text-yellow-400">{stats?.survival?.mob_kills || 0}</span>
        </div>
        <div className="flex justify-between">
          <span>Śmierci:</span>
          <span className="text-yellow-400">{stats?.survival?.deaths || 0}</span>
        </div>
        <div className="flex justify-between">
          <span>Saldo:</span>
          <span className="text-yellow-400">{stats?.survival?.money || 0} $</span>
        </div>
        <div className="flex justify-between">
          <span>Zabójstw:</span>
          <span className="text-yellow-400">{stats?.survival?.kills || 0}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col w-full bg-gray-900 text-white p-6 rounded-lg gap-6 max-w-[1400px] mx-auto">
      {/* Górna sekcja - flex row */}
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Sekcja gracza (LEWA STRONA) */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full sm:w-2/5">
          <h2 className="text-3xl font-bold mb-6 text-center sm:text-left">Panel Gracza</h2>

          {/* Skin gracza */}
          <div className="flex flex-col items-center text-center mb-6">
            <Image
              src={`https://crafatar.com/renders/body/${stats?.uuid}?scale=10&overlay`}
              alt="Skin"
              className="h-auto rounded-lg"
              width={128}
              height={128}
            />
            <h3 className="text-xl font-semibold mt-4">{userName || "Nowy użytkownik"}</h3>
            <p className="text-gray-400 text-sm">UUID: {stats?.uuid || "Brak danych"}</p>
          </div>

          {/* Podstawowe statystyki */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center mb-6">
            <div className="bg-gray-700 p-4 rounded-lg flex flex-col items-center shadow-md">
              <FaMoneyBillWave className="text-green-400 text-2xl mb-2" />
              <p className="text-lg font-semibold">{stats?.general.money || 0} $</p>
              <p className="text-gray-400 text-sm">Saldo</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg flex flex-col items-center shadow-md">
              <FaClock className="text-blue-400 text-2xl mb-2" />
              <p className="text-lg font-semibold">{formatPlayTime(stats?.general.playtime || 0)}</p>
              <p className="text-gray-400 text-sm">Czas gry</p>
            </div>
          </div>

          {/* Dodatkowe opcje */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <Link href="/shop" className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition text-center flex items-center justify-center w-full">
              <FaShoppingCart className="mr-2" /> Sklep
            </Link>
            <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow-md transition flex items-center justify-center w-full">
              <FaSignOutAlt className="mr-2" /> Wyloguj się
            </button>
          </div>
        </div>

        {/* Sekcja statystyk (PRAWA STRONA) */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full sm:w-3/5">
          {loadingStats ? (
            <div className="flex justify-center items-center h-32">
              <FaSpinner className="animate-spin text-yellow-400 text-2xl" />
              <span className="ml-2 text-gray-400">Ładowanie statystyk...</span>
            </div>
          ) : (
            <>
              {/* Wybór trybu */}
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={() => setActiveMode('general')}
                  className={`px-4 py-2 rounded-md transition-colors flex-1 ${
                    activeMode === 'general' 
                      ? 'bg-yellow-500 text-gray-900 font-semibold' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Ogólne
                </button>
                <button
                  onClick={() => setActiveMode('oneblock')}
                  className={`px-4 py-2 rounded-md transition-colors flex-1 ${
                    activeMode === 'oneblock' 
                      ? 'bg-yellow-500 text-gray-900 font-semibold' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  OneBlock
                </button>
                <button
                  onClick={() => setActiveMode('survival')}
                  className={`px-4 py-2 rounded-md transition-colors flex-1 ${
                    activeMode === 'survival' 
                      ? 'bg-yellow-500 text-gray-900 font-semibold' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Survival
                </button>
              </div>

              {/* Wyświetlanie statystyk */}
              <div>
                {activeMode === 'general' && renderGeneralStats()}
                {activeMode === 'oneblock' && renderOneBlockStats()}
                {activeMode === 'survival' && renderSurvivalStats()}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Sekcja osiągnięć (NA DOLE) */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <FaTrophy className="mr-2 text-yellow-400" /> 
          Osiągnięcia
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {loadingAchievements ? (
            <div className="col-span-full flex justify-center items-center py-8">
              <FaSpinner className="animate-spin text-yellow-400 text-2xl" />
              <span className="ml-2 text-gray-400">Ładowanie osiągnięć...</span>
            </div>
          ) : achievements.length > 0 ? (
            achievements.map((achieve) => (
              <div
                key={achieve.id}
                className="bg-gray-700 p-4 rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <span className="mb-2">
                    <Image
                      src={getMaterialImage(achieve.material)}
                      alt={achieve.material}
                      width={32}
                      height={32}
                      className="pixelated"
                    />
                  </span>
                  <p className="font-semibold text-sm mb-1">{achieve.achievement_name}</p>
                  <p className="text-xs text-gray-400">{achieve.achievement_description}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(achieve.unlock_date).toLocaleDateString('pl-PL')}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400 py-8">
              Brak zdobytych osiągnięć
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/achievements"
            className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition inline-block flex items-center justify-center w-full font-semibold"
          >
            <FaTrophy className="mr-2" /> Zobacz wszystkie osiągnięcia
          </Link>
        </div>
      </div>
    </div>
  );
}
