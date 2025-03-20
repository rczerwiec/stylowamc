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
    <div className="w-full flex flex-col items-center">

      {/* Formularz rejestracji */}
      <div className="w-full max-w-md bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
          Rejestracja
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Adres e-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>
          <div>
            <label htmlFor="server-code" className="block text-sm font-medium text-gray-300 mb-2">
              Kod z serwera
            </label>
            <input
              type="text"
              id="server-code"
              name="server-code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Wpisz /kod na serwerze, żeby uzyskać unikalny kod"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Hasło
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Zarejestruj się
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Masz już konto?{' '}
            <Link 
              href="/login" 
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
            >
              Zaloguj się
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
