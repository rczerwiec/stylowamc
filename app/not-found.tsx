import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-screen bg-gray-900 text-white p-6 rounded-lg">
      <h1 className="text-4xl font-bold mb-4">404 - Strona nie znaleziona</h1>
      <p className="text-lg mb-6">
        Przepraszamy, ale nie możemy znaleźć żądanej strony.
      </p>
      <Link
        href="/"
        className="text-blue-500 hover:underline text-lg"
      >
        Wróć do strony głównej
      </Link>
    </div>
  );
}
