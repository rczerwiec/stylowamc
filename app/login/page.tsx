"use client";
import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {auth} from '@/app/firebase/config'

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface FirebaseError extends Error {
  code?: string;
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
    } catch (error: unknown) {
      const firebaseError = error as FirebaseError;
      if (firebaseError.code) {
        if (firebaseError.code === 'auth/invalid-credential') {
          toast.error("❌ Nieprawidłowy email lub hasło");
        } else if (firebaseError.code === 'auth/user-not-found') {
          toast.error("❌ Nie znaleziono użytkownika o podanym adresie email");
        } else if (firebaseError.code === 'auth/wrong-password') {
          toast.error("❌ Nieprawidłowe hasło");
        } else {
          toast.error("❌ Wystąpił błąd podczas logowania");
        }
        console.error('Błąd logowania:', firebaseError.message);
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center">

      {/* Formularz logowania */}
      <div className="w-full max-w-md bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
          Logowanie
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Adres Email
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
            Zaloguj się
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Nie masz konta?{' '}
            <Link 
              href="/register" 
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
            >
              Zarejestruj się
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
