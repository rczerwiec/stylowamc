"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FaClock, FaMoneyBillWave, FaTrophy, FaChartBar, FaSpinner } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

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
    kills: number;
    deaths: number;
    island_level: number;
    smcoins: number;
  };
  oneblock: {
    island_level: number;
    broken_blocks: number;
    mob_kills: number;
  } | null;
  survival: {
    playtime: number;
    mob_kills: number;
    deaths: number;
  } | null;
}

export default function PlayerProfile() {
  const params = useParams();
  const username = params.username as string;
  const [stats, setStats] = useState<PlayerStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeMode, setActiveMode] = useState('general');

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        setLoading(true);
        // Bezpośrednio pobieramy statystyki gracza
        const response = await fetch(`/api/player/stats?username=${username}`);
        const data = await response.json();

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
    <div className="flex flex-col sm:flex-row items-start w-full bg-gray-900 text-white p-6 rounded-lg gap-6">
      {/* Reszta komponentu podobna do PlayerPanel, ale bez sekcji wylogowania */}
      {/* ... */}
    </div>
  );
} 