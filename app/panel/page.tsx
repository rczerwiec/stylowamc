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
  kills: number;
  deaths: number;
  money: number;
  playtime: number;
  island_level: number;
  smcoins: number;
}


export default function PlayerPanel() {
  const [user] = useAuthState(auth);
  const [stats, setStats] = useState<PlayerStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [userName, setUserName] = useState<string | null>(null);
  const [userUID, setUserUID] = useState<string | null>(null);

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

  // Pobieramy statystyki gracza, gdy userUID jest już dostępny
  useEffect(() => {
    if (userUID) {
      const fetchStats = async () => {
        try {
          setLoadingStats(true);
          const response = await fetch(`/api/player/stats?uuid=${userUID}`);
          const data = await response.json();
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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("✅ Wylogowano pomyślnie!");
    } catch (error) {
      console.error("❌ Błąd podczas wylogowywania:", error);
      toast.error("❌ Wystąpił błąd podczas wylogowywania.");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start w-full bg-gray-900 text-white p-6 rounded-lg gap-6">
      {/* Sekcja gracza (LEWA STRONA) */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md min-h-[700px] w-full sm:w-3/5">
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

        {/* Dane gracza */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center pt-3">
          <div className="bg-gray-700 p-4 rounded-lg flex flex-col items-center shadow-md">
            <FaMoneyBillWave className="text-green-400 text-2xl mb-2" />
            <p className="text-lg font-semibold">{stats?.money} $</p>
            <p className="text-gray-400 text-sm">Saldo</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg flex flex-col items-center shadow-md">
            <FaClock className="text-blue-400 text-2xl mb-2" />
            <p className="text-lg font-semibold">{stats?.playtime}</p>
            <p className="text-gray-400 text-sm">Czas gry</p>
          </div>
        </div>

        {/* Statystyki gracza z Mode1Stats */}
        <div className="mt-6 bg-gray-700 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-center mb-2">Statystyki</h3>
          {loadingStats ? (
            <div className="flex justify-center items-center">
              <FaSpinner className="animate-spin text-yellow-400 text-2xl" />
              <span className="ml-2 text-gray-400">Ładowanie statystyk...</span>
            </div>
          ) : stats ? (
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Kills: <strong>{stats.kills}</strong></li>
              <li>Deaths: <strong>{stats.deaths}</strong></li>
              <li>Island Level: <strong>{stats.island_level}</strong></li>
              <li>SM Coins: <strong>{stats.smcoins}</strong></li>
            </ul>
          ) : (
            <p className="text-center text-gray-400">Brak statystyk do wyświetlenia.</p>
          )}
        </div>

        {/* Dodatkowe opcje */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <Link
            href="/shop"
            className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition text-center flex items-center justify-center w-full"
          >
            <FaShoppingCart className="mr-2" /> Sklep
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow-md transition flex items-center justify-center w-full"
          >
            <FaSignOutAlt className="mr-2" /> Wyloguj się
          </button>
        </div>
      </div>

      {/* Sekcja osiągnięć i statystyk (PRAWA STRONA) */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full sm:w-3/5 min-h-[700px]">
        <h2 className="text-2xl font-bold mb-4">🏆 Osiągnięcia i Statystyki</h2>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-700 p-4 rounded-lg flex flex-col items-center shadow-md">
            <p className="text-lg font-semibold">🔥 10</p>
            <p className="text-gray-400 text-sm">Wszystkie osiągnięcia</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg flex flex-col items-center shadow-md">
            <p className="text-lg font-semibold">⭐ 3</p>
            <p className="text-gray-400 text-sm">Rzadkie osiągnięcia</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/statistics"
            className="bg-purple-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-600 transition inline-block flex items-center justify-center w-full"
          >
            <FaChartBar className="mr-2" /> Zobacz więcej statystyk
          </Link>
        </div>

        <h3 className="text-xl font-semibold mb-3 mt-6">🎖️ Twoje osiągnięcia</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { name: "Pierwsze kroki", icon: "🥇", desc: "Twoje pierwsze wejście na serwer", date: "2024-02-15" },
            { name: "Bogacz", icon: "💰", desc: "Osiągnąłeś 10 000$", date: "2024-02-10" },
            { name: "Maratończyk", icon: "🏃", desc: "Spędziłeś 100 godzin na serwerze", date: "2024-02-05" },
            { name: "Budowniczy", icon: "🏗️", desc: "Postawiłeś 1000 bloków", date: "2024-02-01" },
            { name: "Zwycięzca PvP", icon: "⚔️", desc: "Wygrałeś 10 walk PvP", date: "2024-01-30" },
            { name: "Mistrz handlu", icon: "🛒", desc: "Zrobiłeś 50 transakcji na rynku", date: "2024-01-25" },
          ].map((achieve, index) => (
            <div
              key={index}
              className="relative w-full aspect-square bg-gray-700 rounded-lg shadow-md transform transition-transform duration-500 hover:rotate-y-180"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center backface-hidden rounded-lg">
                <span className="text-3xl mb-2">{achieve.icon}</span>
                <p className="text-sm text-gray-300">{achieve.name}</p>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center backface-hidden rotate-y-180 opacity-0 transition-opacity duration-500 hover:opacity-100 bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-300 text-center">{achieve.desc}</p>
                <p className="text-xs text-gray-400 mt-2">Zdobyte: {achieve.date}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/achievements"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition inline-block flex items-center justify-center w-full"
          >
            <FaTrophy className="mr-2" /> Zobacz więcej osiągnięć
          </Link>
        </div>
      </div>
    </div>
  );
}
