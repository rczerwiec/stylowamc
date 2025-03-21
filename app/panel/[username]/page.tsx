"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FaSpinner } from "react-icons/fa";
import PlayerProfileBase, { PlayerStats, Achievement } from "@/components/PlayerProfileBase";

export default function PlayerProfile() {
  const params = useParams();
  const username = params.username as string;
  const [stats, setStats] = useState<PlayerStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
          throw new Error('Nie znaleziono gracza');
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

  // Pobieramy osiągnięcia
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

  return (
    <PlayerProfileBase
      stats={stats}
      achievements={achievements}
      loading={loading}
      username={username}
      isCurrentUser={false}
      loadingAchievements={loadingAchievements}
    />
  );
} 