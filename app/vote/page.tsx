import React from 'react';
import Link from 'next/link';

export default function Vote() {
  return (
    <div className="flex flex-col items-center justify-center w-full bg-gray-900 text-white p-6">
      {/* Informacja o stanie systemu */}
      <div className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-md mb-6">
        Uwaga: System głosowania jest w trakcie tworzenia. Linki mogą być tymczasowe.
      </div>

      {/* Sekcja głosowania */}
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Głosuj na nasz serwer!</h2>
        <table className="w-full border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-3 border border-gray-600 text-left">#</th>
              <th className="p-3 border border-gray-600 text-left">Strona</th>
              <th className="p-3 border border-gray-600 text-left">Głosowanie</th>
            </tr>
          </thead>
          <tbody>
            {["Minecraft-List", "TopG", "MinecraftServers"]?.map((site, index) => (
              <tr key={index} className="bg-gray-600 hover:bg-gray-500 transition">
                <td className="p-3 border border-gray-600">{index + 1}</td>
                <td className="p-3 border border-gray-600">{site}</td>
                <td className="p-3 border border-gray-600">
                  <Link href="#" className="text-blue-400 hover:underline">
                    Głosuj tutaj
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
