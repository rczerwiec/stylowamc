'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaNewspaper, FaHistory, FaSignOutAlt } from 'react-icons/fa';

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/admin/logout', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Nie udało się wylogować');
      }

      router.push('/admin');
    } catch (error) {
      console.error('Błąd podczas wylogowywania:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Ładowanie...</span>
            </div>
            <p className="mt-2 text-gray-300">Ładowanie panelu administracyjnego...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-yellow-500">Panel Administracyjny</h1>
          <button
            onClick={handleLogout}
            className="bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold py-2 px-4 rounded flex items-center gap-2"
          >
            <FaSignOutAlt /> Wyloguj
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Zarządzanie newsami */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center gap-4 mb-4">
              <FaNewspaper className="text-2xl text-yellow-500" />
              <h2 className="text-xl font-semibold text-gray-200">Zarządzanie newsami</h2>
            </div>
            <p className="text-gray-400 mb-4">
              Dodawaj, edytuj i usuwaj newsy na stronie głównej.
            </p>
            <button
              onClick={() => router.push('/admin/news')}
              className="w-full py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors duration-200"
            >
              Zarządzaj newsami
            </button>
          </div>

          {/* Zarządzanie changelogiem */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center gap-4 mb-4">
              <FaHistory className="text-2xl text-yellow-500" />
              <h2 className="text-xl font-semibold text-gray-200">Zarządzanie changelogiem</h2>
            </div>
            <p className="text-gray-400 mb-4">
              Aktualizuj listę zmian dla różnych trybów gry.
            </p>
            <button
              onClick={() => router.push('/admin/changelog')}
              className="w-full py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors duration-200"
            >
              Zarządzaj changelogiem
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 