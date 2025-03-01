"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FaClock, FaMoneyBillWave, FaTrophy, FaChartBar, FaSpinner, FaSignOutAlt, FaShoppingCart } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import PlayerBasicStats from "@/app/components/PlayerBasicStats";
import GeneralStats from "@/app/components/GeneralStats";
import RankHistory from "@/app/components/RankHistory";
import AchievementsList from "@/app/components/AchievementsList";

// Dodaj funkcję formatPlayTime
const formatPlayTime = (ticks: number) => {
  const totalMinutes = ticks / 1200; // 1 minuta = 1200 ticków
  const days = Math.floor(totalMinutes / 1440); // 1 dzień = 1440 minut
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = Math.floor(totalMinutes % 60);

  return `${days > 0 ? `${days}d ` : ""}${hours}h ${minutes}m`;
};

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
}

// Dodaj interfejs Achievement
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

// Dodaj funkcję getMaterialImage
const getMaterialImage = (material: string) => {
  const materialName = material.toLowerCase();
  return `https://minecraft-api.vercel.app/images/items/${materialName}.png`;
};

export default function PlayerProfile() {
  const params = useParams();
  const username = params.username as string;
  const [stats, setStats] = useState<PlayerStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeMode, setActiveMode] = useState('general');
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loadingAchievements, setLoadingAchievements] = useState(true);

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/player/stats?username=${username}`);
        const data = await response.json();
        console.log("Otrzymane dane:", data.stats);
        if (!response.ok) {
          throw new Error(data.error || 'Nie można pobrać statystyk gracza');
        }

        setStats(data.stats);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Wystąpił błąd');
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchPlayerData();
    }
  }, [username]);

  // Dodaj nowy useEffect do pobierania osiągnięć
  useEffect(() => {
    const fetchAchievements = async () => {
      if (!stats) return;
      
      try {
        setLoadingAchievements(true);
        const response = await fetch(`/api/player/achievements?uuid=${stats.uuid}`);
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

    if (stats?.uuid) {
      fetchAchievements();
    }
  }, [stats]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <FaSpinner className="animate-spin text-yellow-400 text-4xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">❌ Błąd</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">❌ Brak danych</h2>
          <p>Nie znaleziono statystyk dla gracza {username}</p>
        </div>
      </div>
    );
  }

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
              src={`https://crafatar.com/renders/body/${stats.uuid}?scale=10&overlay`}
              alt="Skin"
              className="h-auto rounded-lg"
              width={128}
              height={128}
            />
            <h3 className="text-xl font-semibold mt-4">{stats.name}</h3>
            <p className="text-gray-400 text-sm">UUID: {stats.uuid}</p>
          </div>

          <PlayerBasicStats 
            smcoins={stats.general.smcoins}
            playtime={stats.general.playtime}
            formatPlayTime={formatPlayTime}
          />
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

          {/* Wyświetlanie statystyk w zależności od wybranego trybu */}
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
                  <span className="text-yellow-400">{stats.oneblock.money} $</span>
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