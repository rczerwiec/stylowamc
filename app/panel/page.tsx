"use client";

import React, { useEffect, useState } from "react";
import { auth } from "@/app/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FaSignOutAlt, FaUserCog, FaKey, FaTrash, FaUserShield, FaSpinner } from "react-icons/fa";
import PlayerProfileBase, { PlayerStats, Achievement } from "@/components/PlayerProfileBase";

export default function UserPanel() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [userData, setUserData] = useState<{ uuid?: string; username?: string } | null>(null);
  const [stats, setStats] = useState<PlayerStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loadingAchievements, setLoadingAchievements] = useState(true);

  // Pobieramy dane użytkownika na podstawie jego emaila po zalogowaniu
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      
      try {
        const response = await fetch(`/api/user?email=${user.email}`);
        const data = await response.json();
        
        if (response.ok && data.username && data.uuid) {
          setUserData(data);
        } else {
          console.error("Nie udało się pobrać danych użytkownika:", data.message);
        }
      } catch (error) {
        console.error("Błąd podczas pobierania danych użytkownika:", error);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  // Pobieramy statystyki gracza
  useEffect(() => {
    const fetchPlayerStats = async () => {
      if (!userData?.uuid) return;
      
      try {
        setLoadingStats(true);
        const response = await fetch(`/api/player/stats?uuid=${userData.uuid}`);
        const data = await response.json();
        
        if (response.ok && data.stats) {
          setStats(data.stats);
        } else {
          console.error("Nie udało się pobrać statystyk gracza:", data.message);
        }
      } catch (error) {
        console.error("Błąd podczas pobierania statystyk gracza:", error);
      } finally {
        setLoadingStats(false);
      }
    };

    if (userData?.uuid) {
      fetchPlayerStats();
    }
  }, [userData]);

  // Pobieramy osiągnięcia
  useEffect(() => {
    const fetchAchievements = async () => {
      if (!userData?.uuid) return;
      
      try {
        setLoadingAchievements(true);
        const response = await fetch(`/api/player/achievements?uuid=${userData.uuid}`);
        const data = await response.json();
        
        if (response.ok && data.achievements) {
          setAchievements(data.achievements);
        } else {
          console.error("Nie udało się pobrać osiągnięć:", data.message);
        }
      } catch (error) {
        console.error("Błąd podczas pobierania osiągnięć:", error);
      } finally {
        setLoadingAchievements(false);
      }
    };

    if (userData?.uuid) {
      fetchAchievements();
    }
  }, [userData]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Wylogowano pomyślnie");
      router.push("/");
    } catch (error) {
      console.error("Błąd podczas wylogowywania:", error);
      toast.error("Nie udało się wylogować");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <FaSpinner className="animate-spin text-yellow-400 text-4xl" />
      </div>
    );
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  // Przyciski akcji dla zalogowanego użytkownika
  const actionButtons = (
    <>
      <button
        onClick={handleLogout}
        className="w-full py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
      >
        <FaSignOutAlt /> Wyloguj się
      </button>
      
      <button
        onClick={() => toast.info("Funkcja w przygotowaniu")}
        className="w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
      >
        <FaUserCog /> Ustawienia konta
      </button>
      
      <button
        onClick={() => toast.info("Funkcja w przygotowaniu")}
        className="w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
      >
        <FaKey /> Zmień hasło
      </button>
      
      <button
        onClick={() => toast.info("Funkcja w przygotowaniu")}
        className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
      >
        <FaTrash /> Usuń konto
      </button>
      
      {/* Dla administratorów, z kontrolą czy gracz ma uprawnienia */}
      {userData?.username === "Skibreen" && (
        <button
          onClick={() => router.push("/admin")}
          className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors mt-4"
        >
          <FaUserShield /> Panel administratora
        </button>
      )}
    </>
  );

  return (
    <PlayerProfileBase
      stats={stats}
      achievements={achievements}
      loading={loadingStats}
      username={userData?.username || user.displayName || "Nieznany"}
      isCurrentUser={true}
      loadingAchievements={loadingAchievements}
      actionButtons={actionButtons}
    />
  );
}
