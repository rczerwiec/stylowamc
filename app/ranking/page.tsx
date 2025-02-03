import React from 'react';

export default function Ranking() {
  return (
    <div className="flex flex-col items-center justify-center w-full bg-gray-900 text-white p-6">
      {/* Informacja o stanie systemu */}
      <div className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-md mb-6">
        Uwaga: System rankingowy jest w trakcie tworzenia. Niektóre dane mogą być nieaktualne.
      </div>

      {/* Sekcja rankingów */}
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-5xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Rankingi Serwera</h2>
        <div className="grid grid-cols-3 gap-6">
          {/* Ranking Placeholder */}
          <div className="bg-gray-700 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-yellow-400 text-center">Topka Hajsu</h3>
            <ul className="mt-2 text-gray-300 space-y-2">
              {[...Array(15)].map((_, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <img src={`https://minotar.net/avatar/Steve/32`} alt="player" className="w-8 h-8 rounded-md" />
                  <span>#{index + 1} - Placeholder</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Ranking Placeholder */}
          <div className="bg-gray-700 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-yellow-400 text-center">Najlepsza Wyspa</h3>
            <ul className="mt-2 text-gray-300 space-y-2">
              {[...Array(15)].map((_, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <img src={`https://minotar.net/avatar/Stylowy/32`} alt="player" className="w-8 h-8 rounded-md" />
                  <span>#{index + 1} - Placeholder</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Ranking Placeholder */}
          <div className="bg-gray-700 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-yellow-400 text-center">Czas spędzony na serwerze</h3>
            <ul className="mt-2 text-gray-300 space-y-2">
              {[...Array(15)].map((_, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <img src={`https://minotar.net/avatar/Herobrine/32`} alt="player" className="w-8 h-8 rounded-md" />
                  <span>#{index + 1} - Placeholder</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
