"use client";

import React, { useEffect, useState } from "react";
import { auth } from "@/app/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import Link from "next/link";
import { FaSignOutAlt, FaShoppingCart, FaSpinner } from "react-icons/fa";
import Image from "next/image";
import PlayerBasicStats from "@/components/PlayerBasicStats";
import GeneralStats from "@/components/GeneralStats";
import RankHistory from "@/components/RankHistory";
import AchievementsList from "@/components/AchievementsList";

interface PlayerStats {
  uuid: string;
  name: string;
  join_date: string;
  last_seen: string;
  money_spent_pln: number;
  achievements_count: number;
  mode0: {
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
  const totalMinutes = ticks / 20; // 1 minuta = 1200 ticków
  const days = Math.floor(totalMinutes / 1440); // 1 dzień = 1440 minut
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = Math.floor(totalMinutes % 60);

  return `${days > 0 ? `${days}d ` : ""}${hours}h ${minutes}m`;
};

export default function PlayerPanel() {
  const [user] = useAuthState(auth);
  const [stats, setStats] = useState<PlayerStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [userName, setUserName] = useState<string | null>(null);
  const [userUID, setUserUID] = useState<string | null>(null);
  const [activeMode, setActiveMode] = useState('general');
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loadingAchievements, setLoadingAchievements] = useState(true);

  // Pobieramy dane użytkownika (nazwa i uuid) na podstawie emaila
  useEffect(() => {
    if (user && user.email) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`/api/user?email=${user.email}`);
          const data = await response.json();
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

  // Pobieramy statystyki gracza
  useEffect(() => {
    if (userUID) {
      const fetchStats = async () => {
        try {
          setLoadingStats(true);
          const response = await fetch(`/api/player/stats?uuid=${userUID}`);
          const data = await response.json();
          console.log(data);
          if (data.stats) {
            setStats(data.stats);
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

  // Pobieramy osiągnięcia
  useEffect(() => {
    if (userUID) {
      const fetchAchievements = async () => {
        try {
          setLoadingAchievements(true);
          const response = await fetch(`/api/player/achievements?uuid=${userUID}`);
          const data = await response.json();
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

  if (loadingStats) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <FaSpinner className="animate-spin text-yellow-400 text-4xl" />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">❌ Brak danych</h2>
          <p>Nie znaleziono statystyk gracza</p>
        </div>
      </div>
    );
  }

  const skinVariationsX = [
    "default", "marching", "walking", "crouching", "crossed", 
    "criss_cross", "ultimate", "isometric", "mojavatar", 
    "kicking", "archer", "dead", "sleeping", 
    "lunging", "pointing", "relaxing", "cheering"
  ];
  

  const randomX = skinVariationsX[Math.floor(Math.random() * skinVariationsX.length)];

  return (
    <div className="flex flex-col w-full bg-gray-900 text-white p-6 rounded-lg gap-6 max-w-[1400px] mx-auto">
      {/* Górna sekcja - flex row */}
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Sekcja gracza (LEWA STRONA) */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full sm:w-2/5">
          <h2 className="text-3xl font-bold mb-6 text-center sm:text-left">Profil Gracza</h2>

          {/* Skin gracza */}
          <div className="flex flex-col items-center text-center mb-6">
            <Image
              src={`https://starlightskins.lunareclipse.studio/render/${randomX}/${userName}/full`}
              alt="Skin"
              className="h-auto rounded-lg"
              width={128}
              height={128}
            />
            <h3 className="text-xl font-semibold mt-4">{userName || "Nowy użytkownik"}</h3>
            <p className="text-gray-400 text-sm">UUID: {stats.uuid}</p>
          </div>

          <PlayerBasicStats 
            smcoins={stats.general.smcoins}
            playtime={stats.general.playtime}
            formatPlayTime={formatPlayTime}
            playtimeOneBlock={stats.oneblock?.playtime || 0}
            playtimeLobby={stats.mode0?.playtime || 0}
          />

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
            {activeMode === 'general' && (
              <>
                <GeneralStats
                  achievements_count={stats.achievements_count}
                  money_spent_pln={stats.money_spent_pln}
                  join_date={stats.join_date}
                  last_seen={stats.last_seen}
                />
                <RankHistory className="mt-6" />
              </>
            )}

            {activeMode === 'oneblock' && stats.oneblock && (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Poziom wyspy:</span>
                  <span className="text-yellow-400">{stats.oneblock.island_level}</span>
                </div>
                <div className="flex justify-between">
                  <span>Zniszczone bloki:</span>
                  <span className="text-yellow-400">{stats.oneblock.broken_blocks}</span>
                </div>
                <div className="flex justify-between">
                  <span>Zabite moby:</span>
                  <span className="text-yellow-400">{stats.oneblock.mob_kills}</span>
                </div>
                <div className="flex justify-between">
                  <span>Saldo:</span>
                  <span className="text-yellow-400">{stats.oneblock.money.toFixed(2)} $</span>
                </div>
                <div className="flex justify-between">
                  <span>Zabójstwa:</span>
                  <span className="text-yellow-400">{stats.oneblock.kills}</span>
                </div>
                <div className="flex justify-between">
                  <span>Śmierci:</span>
                  <span className="text-yellow-400">{stats.oneblock.deaths}</span>
                </div>
              </div>
            )}

            {activeMode === 'survival' && stats.survival && (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Czas gry:</span>
                  <span className="text-yellow-400">{formatPlayTime(stats.survival.playtime)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Zabite moby:</span>
                  <span className="text-yellow-400">{stats.survival.mob_kills}</span>
                </div>
                <div className="flex justify-between">
                  <span>Śmierci:</span>
                  <span className="text-yellow-400">{stats.survival.deaths}</span>
                </div>
                <div className="flex justify-between">
                  <span>Saldo:</span>
                  <span className="text-yellow-400">{stats.survival.money} $</span>
                </div>
                <div className="flex justify-between">
                  <span>Zabójstwa:</span>
                  <span className="text-yellow-400">{stats.survival.kills}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <AchievementsList 
        achievements={achievements}
        loading={loadingAchievements}
      />
    </div>
  );
}
