import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-full bg-gray-900 text-white p-6 rounded-lg">
      <h1 className="text-5xl font-extrabold mb-4">404 - Strona nie znaleziona</h1>
      <p className="text-lg mb-6 text-gray-300 text-center max-w-lg">
        Przepraszamy, ale nie możemy znaleźć żądanej strony. Sprawdź adres URL lub wróć do strony głównej.
      </p>
      <Link
        href="/"
        className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition text-lg"
      >
        Wróć do strony głównej
      </Link>
    </div>
  );
}
