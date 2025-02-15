"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, code }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || 'Błąd rejestracji');
      }
  
      toast.success('Rejestracja zakończona sukcesem!')
      setEmail('');
      setPassword('');
      setCode('');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Nieznany błąd')
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center w-full bg-gray-900 text-white p-6 rounded-lg">
      {/* Informacja o stanie systemu */}
      <div className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-md mb-6">
        Uwaga: System jest w trakcie tworzenia.
      </div>

      {/* Formularz rejestracji */}
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Rejestracja</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Adres e-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="server-code" className="block text-sm font-medium mb-2">
              Kod z serwera
            </label>
            <input
              type="text"
              id="server-code"
              name="server-code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Wpisz /kod na serwerze, żeby uzyskać unikalny kod"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Hasło
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition duration-200"
          >
            Zarejestruj się
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Masz już konto?{' '}
          <Link href="/login" className="text-blue-400 hover:underline">
            Zaloguj się
          </Link>
        </p>
      </div>
    </div>
  );
}
