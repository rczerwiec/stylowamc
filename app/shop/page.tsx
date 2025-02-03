import React from 'react';

export default function Shop() {
  return (
    <div className="flex flex-col items-center justify-center w-full bg-gray-900 text-white p-6 rounded-lg">
      {/* Informacja o stanie systemu */}
      <div className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-md shadow-md text-center">
        <h2 className="text-2xl font-bold">Sklep w budowie</h2>
        <p className="mt-2">Pracujemy nad nowym systemem sklepu. Wkrótce będzie dostępny!</p>
      </div>
    </div>
  );
}
