"use client";
import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {auth} from '@/app/firebase/config'

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface UserData {
  email: string;
  name: string;
  // inne właściwości
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    try {
      const res = await signInWithEmailAndPassword(email, password);
  
      if (res) {
        toast.success("✅ Pomyślnie zalogowano!");
        setEmail("");
        setPassword("");
  
        router.push("/");
      } else {
        toast.error("❌ Nieprawidłowy email lub hasło");
      }
    } catch (error: any) {
      if (error.code === 'auth/invalid-credential') {
        toast.error("❌ Nieprawidłowy email lub hasło");
      } else if (error.code === 'auth/user-not-found') {
        toast.error("❌ Nie znaleziono użytkownika o podanym adresie email");
      } else if (error.code === 'auth/wrong-password') {
        toast.error("❌ Nieprawidłowe hasło");
      } else {
        toast.error("❌ Wystąpił błąd podczas logowania");
      }
      console.error('Błąd logowania:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full bg-gray-900 text-white p-6 rounded-lg">
      {/* Informacja o stanie systemu */}
      <div className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-md mb-6">
        Uwaga: System jest w trakcie tworzenia.
      </div>

      {/* Formularz logowania */}
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Logowanie</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium mb-2">
              Adres Email
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
            Zaloguj się
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Nie masz konta?{' '}
          <Link href="/register" className="text-blue-400 hover:underline">
            Zarejestruj się
          </Link>
        </p>
      </div>
    </div>
  );
}
