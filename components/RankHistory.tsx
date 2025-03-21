'use client';

import React, { useEffect, useState } from 'react';
import { FaCrown, FaSpinner, FaStar, FaCalendar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Rank {
  id: number;
  uuid: string;
  player_name: string;
  rank: string;
  color: string;
  bg_color: string;
  is_active: boolean;
  from_date_formatted: string;
  to_date_formatted: string;
  description?: string;
}

const RANKS_PER_PAGE = 5;

const capitalizeRank = (rank: string) => {
  if (rank.toLowerCase() === 'default') return 'Gracz';
  return rank.charAt(0).toUpperCase() + rank.slice(1).toLowerCase();
};

export default function RankHistory({ uuid, username }: { uuid?: string; username?: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [ranks, setRanks] = useState<Rank[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [noData, setNoData] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(ranks.length / RANKS_PER_PAGE);
  const startIndex = (currentPage - 1) * RANKS_PER_PAGE;
  const endIndex = startIndex + RANKS_PER_PAGE;
  const currentRanks = ranks.slice(startIndex, endIndex);

  const fetchRanks = async () => {
    setIsLoading(true);
    setError(null);
    setNoData(false);

    try {
      let url = '/api/player/ranks?';
      if (uuid) url += `uuid=${uuid}`;
      if (username) url += `username=${username}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      if (!data.ranks || data.ranks.length === 0) {
        setNoData(true);
      } else {
        // Modyfikujemy nazwy rang przed zapisaniem
        const modifiedRanks = data.ranks.map((rank: Rank) => ({
          ...rank,
          rank: capitalizeRank(rank.rank)
        }));
        setRanks(modifiedRanks);
      }
    } catch (error) {
      setError('Nie udało się pobrać historii rang');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRanks();
  }, [uuid, username]);

  if (isLoading) {
    return (
      <div className="mt-6">
        <h4 className="text-lg font-semibold text-yellow-400 mb-3 flex items-center gap-2">
          <FaCrown className="text-yellow-500" />
          Historia rang
        </h4>
        <div className="flex items-center justify-center p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          <FaSpinner className="animate-spin text-yellow-400 text-2xl" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6">
        <h4 className="text-lg font-semibold text-yellow-400 mb-3 flex items-center gap-2">
          <FaCrown className="text-yellow-500" />
          Historia rang
        </h4>
        <div className="bg-red-900/20 text-red-300 p-4 rounded-lg border border-red-900/50 shadow-lg shadow-red-900/20">
          <p>Wystąpił błąd podczas ładowania historii rang: {error}</p>
        </div>
      </div>
    );
  }

  if (noData) {
    return (
      <div className="mt-6">
        <h4 className="text-lg font-semibold text-yellow-400 mb-3 flex items-center gap-2">
          <FaCrown className="text-yellow-500" />
          Historia rang
        </h4>
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 text-center shadow-lg">
          <p className="text-gray-400">Niestety, ten gracz nie posiada żadnej rangi w historii.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h4 className="text-lg font-semibold text-yellow-400 mb-3 flex items-center gap-2">
        <FaCrown className="text-yellow-500" />
        Historia rang
      </h4>
      <div className="relative pl-6">
        <div className="absolute left-[9px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-yellow-500 via-purple-500 to-blue-500"></div>
        {currentRanks.map((role, index) => (
          <div key={role.id || index} className="relative mb-4 last:mb-0 group">
            <div className={`absolute left-[-20px] w-4 h-4 rounded-full ${role.bg_color} border-2 border-gray-800 z-10 
              shadow-lg shadow-${role.bg_color}/50 transition-transform duration-200 group-hover:scale-125`}>
            </div>
            <div className={`bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 ml-2 
              ${role.is_active ? 'border-l-4 border-yellow-500 shadow-lg shadow-yellow-500/20' : ''}
              transition-all duration-200 group-hover:translate-x-1`}>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <FaStar className={`${role.color}`} />
                  <span className={`font-bold ${role.color} text-base`}>
                    {role.rank}
                  </span>
                  {role.is_active && (
                    <span className="ml-2 px-2 py-0.5 text-xs bg-yellow-500/20 text-yellow-300 rounded-full border border-yellow-500/50">
                      Aktywna
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <FaCalendar className="text-gray-500" />
                  <span>
                    {role.from_date_formatted} - {role.to_date_formatted}
                  </span>
                </div>
                {role.description && (
                  <p className="text-sm text-gray-400 mt-1 italic">
                    {role.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Paginacja */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg transition-all duration-300 ${
              currentPage === 1 
                ? 'text-gray-600 cursor-not-allowed' 
                : 'text-yellow-400 hover:bg-yellow-500/10'
            }`}
          >
            <FaChevronLeft />
          </button>
          <span className="text-gray-400">
            Strona {currentPage} z {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg transition-all duration-300 ${
              currentPage === totalPages 
                ? 'text-gray-600 cursor-not-allowed' 
                : 'text-yellow-400 hover:bg-yellow-500/10'
            }`}
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
} 