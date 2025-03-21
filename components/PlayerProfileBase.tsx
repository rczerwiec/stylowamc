'use client';

import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { FaHome, FaTrophy, FaSpinner } from "react-icons/fa";
import PlayerBasicStats from "@/components/PlayerBasicStats";
import GeneralStats from "@/components/GeneralStats";
import RankHistory from "@/components/RankHistory";
import AchievementsList from "@/components/AchievementsList";

export interface PlayerStats {
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

export interface Achievement {
  id: number;
  uuid: string;
  player_name: string;
  achievement_id: string;
  achievement_name: string;
  achievement_description: string;
  material: string;
  unlock_date: string;
}

export const formatPlayTime = (ticks: number) => {
  const totalMinutes = ticks / 1200; // 1 minuta = 1200 ticków
  const days = Math.floor(totalMinutes / 1440); // 1 dzień = 1440 minut
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = Math.floor(totalMinutes % 60);

  return `${days > 0 ? `${days}d ` : ""}${hours}h ${minutes}m`;
};

interface PlayerProfileBaseProps {
  stats: PlayerStats | null;
  achievements: Achievement[];
  loading: boolean;
  username: string;
  isCurrentUser?: boolean;
  loadingAchievements: boolean;
  actionButtons?: React.ReactNode;
}

export default function PlayerProfileBase({
  stats,
  achievements,
  loading,
  username,
  isCurrentUser = false,
  loadingAchievements,
  actionButtons
}: PlayerProfileBaseProps) {
  const [activeMode, setActiveMode] = useState('general');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <FaSpinner className="animate-spin text-yellow-400 text-4xl" />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-8 max-w-2xl w-full border border-gray-700 shadow-lg text-center">
          <div className="mb-6">
            <Image
              src={`https://minotar.net/helm/${username}/100`}
              alt={username || "Ten gracz nie istnieje"}
              width={100}
              height={100}
              className="mx-auto rounded-lg shadow-lg border-2 border-gray-700"
            />
          </div>
          
          <h2 className="text-3xl font-bold text-yellow-400 mb-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            Gracz nie znaleziony
          </h2>
          
          <div className="space-y-4 text-gray-300">
            <p className="text-lg">
              Niestety, nie znaleźliśmy gracza o nicku <span className="font-semibold text-white">{username}</span> w naszej bazie danych.
            </p>
            
            <p>
              Możliwe przyczyny:
            </p>
            
            <ul className="list-disc list-inside text-left space-y-2 bg-gray-700/50 rounded-lg p-4 border border-gray-600">
              <li>Gracz nigdy nie dołączył na nasz serwer</li>
              <li>Nick został wpisany niepoprawnie</li>
              <li>Konto gracza zostało usunięte</li>
              <li>Gracz dołączył gdy strona jeszcze nie istniała</li>
            </ul>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded-lg transition-colors duration-300 shadow-lg"
            >
              <FaHome className="mr-2" />
              Strona główna
            </Link>
            
            <Link
              href="/ranking"
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors duration-300 border border-gray-600 shadow-lg"
            >
              <FaTrophy className="mr-2" />
              Zobacz ranking
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Generowanie losowego stylu skina
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
          <h2 className="text-3xl font-bold mb-6 text-center sm:text-left">
            {isCurrentUser ? "Mój Profil" : "Profil Gracza"}
          </h2>

          {/* Skin gracza */}
          <div className="flex flex-col items-center text-center mb-6">
            <Image
              src={`https://starlightskins.lunareclipse.studio/render/${randomX}/${stats.name}/full`}
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
            playtimeOneBlock={stats.oneblock?.playtime || 0}
            playtimeLobby={stats.mode0?.playtime || 0}
          />

          {/* Przyciski akcji dla zalogowanego użytkownika */}
          {actionButtons && (
            <div className="mt-6 space-y-3">
              {actionButtons}
            </div>
          )}
        </div>

        {/* Sekcja statystyk (PRAWA STRONA) */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full sm:w-3/5">
          <h2 className="text-3xl font-bold mb-6 text-center sm:text-left">Statystyki</h2>
          
          {/* Nawigacja trybów */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button 
              onClick={() => setActiveMode('general')}
              className={`px-4 py-2 rounded-lg transition-colors ${activeMode === 'general' ? 'bg-yellow-500 text-gray-900' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
            >
              Ogólne
            </button>
            <button 
              onClick={() => setActiveMode('oneblock')}
              className={`px-4 py-2 rounded-lg transition-colors ${activeMode === 'oneblock' ? 'bg-yellow-500 text-gray-900' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
            >
              OneBlock
            </button>
            <button 
              onClick={() => setActiveMode('survival')}
              className={`px-4 py-2 rounded-lg transition-colors ${activeMode === 'survival' ? 'bg-yellow-500 text-gray-900' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
              disabled={!stats.survival}
            >
              Survival
            </button>
          </div>
          
          {/* Statystyki aktywnego trybu */}
          <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
            {activeMode === 'general' && (
              <>
                <GeneralStats 
                  join_date={stats.join_date}
                  last_seen={stats.last_seen}
                  money_spent_pln={stats.money_spent_pln}
                  achievements_count={stats.achievements_count}
                />
                
                {/* Historia rang */}
                <RankHistory className="mt-6" uuid={stats.uuid} />
              </>
            )}
            
            {activeMode === 'oneblock' && stats.oneblock && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-800/80 p-3 rounded-lg">
                    <p className="text-gray-400">Poziom wyspy</p>
                    <p className="text-xl font-semibold text-yellow-400">{stats.oneblock.island_level}</p>
                  </div>
                  <div className="bg-gray-800/80 p-3 rounded-lg">
                    <p className="text-gray-400">Zabójstwa / Śmierci</p>
                    <p className="text-xl font-semibold">{stats.oneblock.kills} / {stats.oneblock.deaths}</p>
                  </div>
                  <div className="bg-gray-800/80 p-3 rounded-lg">
                    <p className="text-gray-400">Zniszczone bloki</p>
                    <p className="text-xl font-semibold">{stats.oneblock.broken_blocks}</p>
                  </div>
                  <div className="bg-gray-800/80 p-3 rounded-lg">
                    <p className="text-gray-400">Zabite moby</p>
                    <p className="text-xl font-semibold">{stats.oneblock.mob_kills}</p>
                  </div>
                </div>
              </div>
            )}
            
            {activeMode === 'survival' && stats.survival ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-800/80 p-3 rounded-lg">
                    <p className="text-gray-400">Poziom</p>
                    <p className="text-xl font-semibold text-yellow-400">{stats.survival.island_level}</p>
                  </div>
                  <div className="bg-gray-800/80 p-3 rounded-lg">
                    <p className="text-gray-400">Zabójstwa / Śmierci</p>
                    <p className="text-xl font-semibold">{stats.survival.kills} / {stats.survival.deaths}</p>
                  </div>
                  <div className="bg-gray-800/80 p-3 rounded-lg">
                    <p className="text-gray-400">Zniszczone bloki</p>
                    <p className="text-xl font-semibold">{stats.survival.broken_blocks}</p>
                  </div>
                  <div className="bg-gray-800/80 p-3 rounded-lg">
                    <p className="text-gray-400">Zabite moby</p>
                    <p className="text-xl font-semibold">{stats.survival.mob_kills}</p>
                  </div>
                </div>
              </div>
            ) : activeMode === 'survival' && (
              <div className="text-center py-4">
                <p className="text-gray-400">Ten gracz nie ma jeszcze statystyk z trybu Survival.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dolna sekcja - osiągnięcia */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Osiągnięcia {loadingAchievements && <FaSpinner className="inline-block animate-spin ml-2" />}</h2>
        
        <AchievementsList 
          achievements={achievements} 
          loading={loadingAchievements}
        />
      </div>
    </div>
  );
} 