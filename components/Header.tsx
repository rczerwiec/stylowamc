"use client";

import Image from "next/image";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [user] = useAuthState(auth);
  const [userName, setUserName] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUserName = async () => {
      if (user?.email) {
        try {
          const response = await fetch(`/api/user?email=${user.email}`);
          const data = await response.json();

          if (response.ok) {
            setUserName(data.name || "Nowy użytkownik");
          } else {
            console.error("Błąd pobierania użytkownika:", data.error);
          }
        } catch (error) {
          console.error("Błąd sieci:", error);
        }
      }
    };

    fetchUserName();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("✅ Wylogowano pomyślnie!");
    } catch (error) {
      console.error("❌ Błąd podczas wylogowania:", error);
      toast.error("❌ Wystąpił błąd podczas wylogowania. Spróbuj ponownie.");
    }
  };

  return (
    <header className="p-4 bg-[#1A1A1A] flex items-center justify-between w-full border-b border-gray-700 shadow-md relative z-50">
      {/* Logo - Zawsze w tym samym miejscu */}
      <div className="flex items-center space-x-6">
        <Link href="/" className="absolute w-28 h-28 flex items-center max-md:hidden">
          <Image
            src="/images/logo.png"
            alt="Logo"
            className="h-12 sm:h-full w-auto"
            width={500}
            height={300}
          />
        </Link>

        {/* Menu Mobilne - Ikona */}
        <div className="sm:hidden z-20 absolute right-5 top-5 bg-[#1A1A1A] p-2 rounded-lg">
          <button
            className="text-white text-4xl"
            onClick={() => {
              setMenuOpen(!menuOpen);
              if (!menuOpen) {
                window.scrollTo(0, 0); // Przewijamy na górę po otwarciu menu
              }
            }}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Nawigacja - Mobilna i Desktopowa */}
        <nav
          className={`lg:pl-28 absolute top-full left-0 w-full bg-[#1A1A1A] sm:relative sm:bg-transparent transition-all sm:flex sm:items-center sm:w-auto ${
            menuOpen ? "flex flex-col items-center py-4 space-y-4 sm:space-y-0" : "hidden"
          }`}
        >
          <ul className="flex flex-col sm:flex-row items-center text-center sm:space-x-6 text-lg font-semibold text-white w-full">
            {[
              { href: "/", text: "STRONA GŁÓWNA" },
              { href: "/vote", text: "GŁOSUJ" },
              { href: "/ranking", text: "RANKING" },
              { href: "https://stylowamc.fandom.com/pl/f", text: "WIKI" },
              { href: "/policy", text: "REGULAMIN" },
              { href: "https://docs.google.com/spreadsheets/d/1dzcaZ_wtZOlHw3BcOiQzo-FkXHSuTrbckFp0pRP05cM", text: "OPIS RANG" },
              { href: "/changelog", text: "ZMIANY" },
            ].map((item, index) => (
              <li key={index} className="w-full sm:w-auto">
                <Link
                  href={item.href}
                  className="block p-3 sm:p-0 hover:text-yellow-400 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.text}
                </Link>
              </li>
            ))}
            <Link
              href="/shop"
              className="bg-yellow-500 max-md:hidden text-gray-900 px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition transform hover:scale-105 animate-pulse"
            >
              SKLEP
            </Link>
            {/* Sklep - Tylko w menu mobilnym */}
            <li className="sm:hidden w-full">
              <Link
                href="/shop"
                className="block text-center bg-yellow-500 text-gray-900 px-4 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition transform hover:scale-105 animate-pulse"
                onClick={() => setMenuOpen(false)}
              >
                SKLEP
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* User Panel + Shop Button - Widoczne tylko na desktopie */}
      <div className="hidden sm:flex items-center space-x-4">
        {user ? (
          <div className="flex items-center space-x-4">
            {/* Nowy przycisk do panelu gracza */}
            <Link
              href="/panel"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition transform hover:scale-105"
            >
              PANEL
            </Link>

            {/* Przycisk wylogowania */}
            <button
              onClick={handleLogout}
              className="flex items-center bg-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <div className="w-10 h-10 rounded-full ring-2 ring-gray-300 flex items-center justify-center overflow-hidden">
                <Image
                  src={`https://minotar.net/helm/${userName || "Steve"}/64`}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                  height={100}
                  width={100}
                />
              </div>
              <div className="text-white font-medium ml-3">
                <span className="block">Witaj, {userName || "Nowy użytkowniku"}</span>
                <span className="block text-sm text-red-400">Wyloguj się</span>
              </div>
            </button>
          </div>
        ) : (
          <Link href="/login">
            <span className="flex items-center bg-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <div className="w-10 h-10 rounded-full ring-2 ring-gray-300 flex items-center justify-center overflow-hidden">
                <Image
                  src="https://minotar.net/helm/Steve/64"
                  alt="Gość"
                  className="w-full h-full object-cover"
                  height={32}
                  width={32}
                />
              </div>
              <div className="text-white font-medium ml-3">
                <span className="block">Witaj, Użytkowniku</span>
                <span className="block text-sm text-blue-400">Zaloguj się</span>
              </div>
            </span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
