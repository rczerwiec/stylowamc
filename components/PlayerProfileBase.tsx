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
    smcoins: number;
    mob_kills: number;
    blocks_broken: number;
    blocks_placed: number;
    // McMMO stats
    mcmmo_level: number;
    mcmmo_gornictwo: number;
    mcmmo_wykopaliska: number;
    mcmmo_zielarstwo: number;
    mcmmo_drwal: number;
    mcmmo_lucznictwo: number;
    mcmmo_siekiery: number;
    mcmmo_crossbows: number;
    mcmmo_maces: number;
    mcmmo_miecze: number;
    mcmmo_tresowanie: number;
    mcmmo_tridents: number;
    mcmmo_niezrecznosc: number;
    mcmmo_akrobatyka: number;
    mcmmo_alchemia: number;
    mcmmo_naprawianie: number;
    mcmmo_odzyskiwanie: number;
    mcmmo_przepalanie: number;
    // Fishing stats
    smfishing_level: number;
    smfishing_xp: number;
    smfishing_total_catches: number;
    smfishing_catches_common: number;
    smfishing_catches_uncommon: number;
    smfishing_catches_rare: number;
    smfishing_catches_epic: number;
    smfishing_catches_legendary: number;
    // Metin stats
    smmetin_total: number;
    // Rudy stats
    smpickaxe_rubin: number;
    smpickaxe_meteoryt: number;
    smpickaxe_platyna: number;
    smpickaxe_bedrock: number;
    smpickaxe_netherium: number;
    smpickaxe_total: number;
    // Dodatkowe rudy stats
    mined_gold: number;
    mined_redstone: number;
    mined_lapis: number;
    mined_coal: number;
    mined_diamond: number;
    mined_netherite: number;
    mined_quantum: number;
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
            playtimeSurvival={stats.survival?.playtime || 0}
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
              OneBlock S1 (SM8)
            </button>
            <button 
              onClick={() => setActiveMode('survival')}
              className={`px-4 py-2 rounded-lg transition-colors ${activeMode === 'survival' ? 'bg-yellow-500 text-gray-900' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
            >
              Survival S1 (SM8)
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
            
            {activeMode === 'oneblock' && !stats.oneblock && (
              <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-800/50 rounded-lg">
                <p className="text-xl text-gray-300 mb-2">Statystyki nie zostały jeszcze wczytane.</p>
                <p className="text-gray-400">Wejdź na tryb i pograj chwilę, a po jakimś czasie się pojawią ;)</p>
              </div>
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
            
            {activeMode === 'survival' && !stats.survival && (
              <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-800/50 rounded-lg">
                <p className="text-xl text-gray-300 mb-2">Statystyki nie zostały jeszcze wczytane.</p>
                <p className="text-gray-400">Wejdź na tryb i pograj chwilę, a po jakimś czasie się pojawią ;)</p>
              </div>
            )}
            
            {activeMode === 'survival' && stats.survival && (
              <div className="space-y-6">
                {/* Podstawowe statystyki */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Podstawowe Statystyki</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-gray-800/80 p-3 rounded-lg">
                      <p className="text-gray-400">Zabójstwa / Śmierci</p>
                      <p className="text-xl font-semibold">{stats.survival.kills} / {stats.survival.deaths}</p>
                    </div>
                    <div className="bg-gray-800/80 p-3 rounded-lg">
                      <p className="text-gray-400">Zniszczone / Postawione bloki</p>
                      <p className="text-xl font-semibold">{stats.survival.blocks_broken} / {stats.survival.blocks_placed}</p>
                    </div>
                    <div className="bg-gray-800/80 p-3 rounded-lg">
                      <p className="text-gray-400">Zabite moby</p>
                      <p className="text-xl font-semibold">{stats.survival.mob_kills}</p>
                    </div>
                    <div className="bg-gray-800/80 p-3 rounded-lg">
                      <p className="text-gray-400">Poziom McMMO</p>
                      <p className="text-xl font-semibold text-yellow-400">{stats.survival.mcmmo_level}</p>
                    </div>
                  </div>
                </div>

                {/* McMMO Statystyki */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Statystyki McMMO</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <div className="bg-gray-800/80 p-3 rounded-lg">
                      <p className="text-gray-400">Górnictwo</p>
                      <p className="text-lg font-semibold">{stats.survival.mcmmo_gornictwo}</p>
                    </div>
                    <div className="bg-gray-800/80 p-3 rounded-lg">
                      <p className="text-gray-400">Wykopaliska</p>
                      <p className="text-lg font-semibold">{stats.survival.mcmmo_wykopaliska}</p>
                    </div>
                    <div className="bg-gray-800/80 p-3 rounded-lg">
                      <p className="text-gray-400">Zielarstwo</p>
                      <p className="text-lg font-semibold">{stats.survival.mcmmo_zielarstwo}</p>
                    </div>
                    <div className="bg-gray-800/80 p-3 rounded-lg">
                      <p className="text-gray-400">Drwal</p>
                      <p className="text-lg font-semibold">{stats.survival.mcmmo_drwal}</p>
                    </div>
                    <div className="bg-gray-800/80 p-3 rounded-lg">
                      <p className="text-gray-400">Łucznictwo</p>
                      <p className="text-lg font-semibold">{stats.survival.mcmmo_lucznictwo}</p>
                    </div>
                    <div className="bg-gray-800/80 p-3 rounded-lg">
                      <p className="text-gray-400">Siekiery</p>
                      <p className="text-lg font-semibold">{stats.survival.mcmmo_siekiery}</p>
                    </div>
                    <div className="bg-gray-800/80 p-3 rounded-lg">
                      <p className="text-gray-400">Kusze</p>
                      <p className="text-lg font-semibold">{stats.survival.mcmmo_crossbows}</p>
                    </div>
                    <div className="bg-gray-800/80 p-3 rounded-lg">
                      <p className="text-gray-400">Maczugi</p>
                      <p className="text-lg font-semibold">{stats.survival.mcmmo_maces}</p>
                    </div>
                    <div className="bg-gray-800/80 p-3 rounded-lg">
                      <p className="text-gray-400">Miecze</p>
                      <p className="text-lg font-semibold">{stats.survival.mcmmo_miecze}</p>
                    </div>
                    <div className="bg-gray-800/80 p-3 rounded-lg">
                      <p className="text-gray-400">Tresowanie</p>
                      <p className="text-lg font-semibold">{stats.survival.mcmmo_tresowanie}</p>
                    </div>
                    <div className="bg-gray-800/80 p-3 rounded-lg">
                      <p className="text-gray-400">Trójzęby</p>
                      <p className="text-lg font-semibold">{stats.survival.mcmmo_tridents}</p>
                    </div>
                    <div className="bg-gray-800/80 p-3 rounded-lg">
                      <p className="text-gray-400">Niezręczność</p>
                      <p className="text-lg font-semibold">{stats.survival.mcmmo_niezrecznosc}</p>
                    </div>
                    <div className="bg-gray-800/80 p-3 rounded-lg">
                      <p className="text-gray-400">Akrobatyka</p>
                      <p className="text-lg font-semibold">{stats.survival.mcmmo_akrobatyka}</p>
                    </div>
                    <div className="bg-gray-800/80 p-3 rounded-lg">
                      <p className="text-gray-400">Alchemia</p>
                      <p className="text-lg font-semibold">{stats.survival.mcmmo_alchemia}</p>
                    </div>
                    <div className="bg-gray-800/80 p-3 rounded-lg">
                      <p className="text-gray-400">Naprawianie</p>
                      <p className="text-lg font-semibold">{stats.survival.mcmmo_naprawianie}</p>
                    </div>
                    <div className="bg-gray-800/80 p-3 rounded-lg">
                      <p className="text-gray-400">Odzyskiwanie</p>
                      <p className="text-lg font-semibold">{stats.survival.mcmmo_odzyskiwanie}</p>
                    </div>
                    <div className="bg-gray-800/80 p-3 rounded-lg">
                      <p className="text-gray-400">Przepalanie</p>
                      <p className="text-lg font-semibold">{stats.survival.mcmmo_przepalanie}</p>
                    </div>
                  </div>
                </div>

                {/* Fishing Statystyki */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Statystyki Wędkowania</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-gray-800/80 p-3 rounded-lg">
                      <p className="text-gray-400">Poziom wędkowania</p>
                      <p className="text-lg font-semibold">{stats.survival.smfishing_level}</p>
                    </div>
                    <div className="bg-gray-800/80 p-3 rounded-lg">
                      <p className="text-gray-400">Doświadczenie</p>
                      <p className="text-lg font-semibold">{stats.survival.smfishing_xp}</p>
                    </div>
                    <div className="bg-gray-800/80 p-3 rounded-lg">
                      <p className="text-gray-400">Łącznie złowiono</p>
                      <p className="text-lg font-semibold">{stats.survival.smfishing_total_catches}</p>
                    </div>
                    <div className="bg-gray-800/80 p-3 rounded-lg">
                      <p className="text-gray-400">Pospolite ryby</p>
                      <p className="text-lg font-semibold text-gray-300">{stats.survival.smfishing_catches_common}</p>
                    </div>
                    <div className="bg-gray-800/80 p-3 rounded-lg">
                      <p className="text-gray-400">Niepospolite ryby</p>
                      <p className="text-lg font-semibold text-green-400">{stats.survival.smfishing_catches_uncommon}</p>
                    </div>
                    <div className="bg-gray-800/80 p-3 rounded-lg">
                      <p className="text-gray-400">Rzadkie ryby</p>
                      <p className="text-lg font-semibold text-blue-400">{stats.survival.smfishing_catches_rare}</p>
                    </div>
                    <div className="bg-gray-800/80 p-3 rounded-lg">
                      <p className="text-gray-400">Epickie ryby</p>
                      <p className="text-lg font-semibold text-purple-400">{stats.survival.smfishing_catches_epic}</p>
                    </div>
                    <div className="bg-gray-800/80 p-3 rounded-lg">
                      <p className="text-gray-400">Legendaryjne ryby</p>
                      <p className="text-lg font-semibold text-yellow-400">{stats.survival.smfishing_catches_legendary}</p>
                    </div>
                  </div>
                </div>

                {/* Metin i Kilofy */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Metiny</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-gray-800/80 p-3 rounded-lg">
                      <p className="text-gray-400">Zabite Metiny</p>
                      <p className="text-lg font-semibold">{stats.survival.smmetin_total}</p>
                    </div>
                  </div>
                </div>

                {/* Wykopane Rudy */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Wykopane Rudy</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {/* Podstawowe rudy */}
                    <div className="bg-gray-800/80 p-3 rounded-lg">
                      <p className="text-gray-400">Węgiel</p>
                      <p className="text-lg font-semibold">{stats.survival.mined_coal || 0}</p>
                    </div>
                    <div className="bg-gray-800/80 p-3 rounded-lg">
                      <p className="text-gray-400">Złoto</p>
                      <p className="text-lg font-semibold text-yellow-400">{stats.survival.mined_gold || 0}</p>
                    </div>
                    <div className="bg-gray-800/80 p-3 rounded-lg">
                      <p className="text-gray-400">Redstone</p>
                      <p className="text-lg font-semibold text-red-500">{stats.survival.mined_redstone || 0}</p>
                    </div>
                    <div className="bg-gray-800/80 p-3 rounded-lg">
                      <p className="text-gray-400">Lapis Lazuli</p>
                      <p className="text-lg font-semibold text-blue-400">{stats.survival.mined_lapis || 0}</p>
                    </div>
                    <div className="bg-gray-800/80 p-3 rounded-lg">
                      <p className="text-gray-400">Diamenty</p>
                      <p className="text-lg font-semibold text-cyan-300">{stats.survival.mined_diamond || 0}</p>
                    </div>
                    <div className="bg-gray-800/80 p-3 rounded-lg">
                      <p className="text-gray-400">Netherite</p>
                      <p className="text-lg font-semibold text-gray-400">{stats.survival.mined_netherite || 0}</p>
                    </div>

                    {/* Custom rudy */}
                    <div className="bg-gray-800/80 p-3 rounded-lg">
                      <p className="text-gray-400">Rubiny</p>
                      <p className="text-lg font-semibold text-red-400">{stats.survival.smpickaxe_rubin}</p>
                    </div>
                    <div className="bg-gray-800/80 p-3 rounded-lg">
                      <p className="text-gray-400">Netherium</p>
                      <p className="text-lg font-semibold text-purple-400">{stats.survival.smpickaxe_netherium}</p>
                    </div>
                    <div className="bg-gray-800/80 p-3 rounded-lg">
                      <p className="text-gray-400">Kwantyty</p>
                      <p className="text-lg font-semibold text-emerald-400">{stats.survival.mined_quantum || 0}</p>
                    </div>
                    <div className="bg-gray-800/80 p-3 rounded-lg">
                      <p className="text-gray-400">Meteoryty</p>
                      <p className="text-lg font-semibold text-orange-400">{stats.survival.smpickaxe_meteoryt}</p>
                    </div>
                    <div className="bg-gray-800/80 p-3 rounded-lg">
                      <p className="text-gray-400">Platyna</p>
                      <p className="text-lg font-semibold text-gray-300">{stats.survival.smpickaxe_platyna}</p>
                    </div>
                    <div className="bg-gray-800/80 p-3 rounded-lg">
                      <p className="text-gray-400">Bedrock</p>
                      <p className="text-lg font-semibold text-gray-600">{stats.survival.smpickaxe_bedrock}</p>
                    </div>
                  </div>
                </div>
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