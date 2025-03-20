'use client'

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FaSearch, FaTrophy, FaHistory, FaSpinner } from 'react-icons/fa';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';

interface Player {
  uuid: string;
  name: string;
  last_seen: string;
}

interface SearchBarProps {
  variant?: 'minimal' | 'expanded';
}

export default function SearchBar({ variant = 'minimal' }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchPlayers = async () => {
      if (searchQuery.length < 3) {
        setPlayers([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`/api/player/search?query=${searchQuery}`);
        const data = await response.json();
        
        if (data.players) {
          setPlayers(data.players);
        } else {
          setPlayers([]);
        }
      } catch (error) {
        console.error('Błąd podczas wyszukiwania:', error);
        setPlayers([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchPlayers, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleSearch = (playerName?: string) => {
    const query = playerName || searchQuery;
    if (query.length >= 3) {
      router.push(`/panel/${query}`);
      setSearchQuery('');
      setShowDropdown(false);
    }
  };

  if (variant === 'minimal') {
    return (
      <div className="relative" ref={dropdownRef}>
        <div className="flex items-center">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowDropdown(true);
              }}
              placeholder="Znajdź gracza..."
              className="bg-gray-800 text-white px-4 py-2 pr-10 rounded-lg border border-gray-700 focus:border-yellow-400 focus:outline-none w-[200px] placeholder-gray-500"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {isLoading ? (
                <FaSpinner className="animate-spin text-gray-400" />
              ) : (
                <FaSearch className="text-gray-400" />
              )}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showDropdown && (searchQuery.length >= 3 || players.length > 0) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-50 mt-2 w-[250px] bg-gray-800 rounded-lg border border-gray-700 shadow-xl"
            >
              {isLoading ? (
                <div className="p-4 text-center text-gray-400">
                  <div className="flex items-center justify-center space-x-2">
                    <FaSpinner className="animate-spin" />
                    <span>Wyszukiwanie...</span>
                  </div>
                </div>
              ) : players.length > 0 ? (
                <div className="max-h-60 overflow-y-auto py-2">
                  {players.map((player) => (
                    <motion.div
                      key={player.uuid}
                      onClick={() => handleSearch(player.name)}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-700 cursor-pointer transition-colors"
                      whileHover={{ backgroundColor: "rgba(55, 65, 81, 1)" }}
                    >
                      <img
                        src={`https://minotar.net/helm/${player.name}/32`}
                        alt={player.name}
                        className="w-8 h-8 rounded"
                      />
                      <div>
                        <div className="text-white font-medium">{player.name}</div>
                        <div className="text-xs text-gray-400">
                          Ostatnio online: {format(new Date(player.last_seen), 'dd MMM yyyy', { locale: pl })}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-400">
                  Nie znaleziono graczy
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-yellow-400 mb-2">Wyszukaj Gracza</h2>
          <p className="text-gray-400">
            Sprawdź statystyki i osiągnięcia graczy na serwerze
          </p>
        </div>

        <div className="relative mb-6" ref={dropdownRef}>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowDropdown(true);
              }}
              placeholder="Wpisz nazwę gracza..."
              className="w-full bg-gray-700 text-white px-6 py-4 rounded-lg border border-gray-600 focus:border-yellow-400 focus:outline-none text-lg placeholder-gray-500"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              {isLoading ? (
                <FaSpinner className="animate-spin text-gray-400" />
              ) : (
                <FaSearch className="text-gray-400" />
              )}
            </div>
          </div>

          <AnimatePresence>
            {showDropdown && (searchQuery.length >= 3 || players.length > 0) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute z-50 w-full mt-2 bg-gray-800 rounded-lg border border-gray-700 shadow-xl"
              >
                {isLoading ? (
                  <div className="p-4 text-center text-gray-400">
                    <div className="flex items-center justify-center space-x-2">
                      <FaSpinner className="animate-spin" />
                      <span>Wyszukiwanie...</span>
                    </div>
                  </div>
                ) : players.length > 0 ? (
                  <div className="max-h-80 overflow-y-auto py-2">
                    {players.map((player) => (
                      <motion.div
                        key={player.uuid}
                        onClick={() => handleSearch(player.name)}
                        className="flex items-center gap-4 px-6 py-3 hover:bg-gray-700 cursor-pointer transition-colors"
                        whileHover={{ backgroundColor: "rgba(55, 65, 81, 1)" }}
                      >
                        <img
                          src={`https://minotar.net/helm/${player.name}/40`}
                          alt={player.name}
                          className="w-10 h-10 rounded"
                        />
                        <div>
                          <div className="text-white font-medium text-lg">{player.name}</div>
                          <div className="text-sm text-gray-400">
                            Ostatnio online: {format(new Date(player.last_seen), 'dd MMM yyyy', { locale: pl })}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-400">
                    Nie znaleziono graczy
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => router.push('/ranking')}
            className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <FaTrophy className="text-yellow-400" />
            <span>Top 10 graczy</span>
          </button>
          <button
            onClick={() => router.push('/history')}
            className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <FaHistory className="text-blue-400" />
            <span>Historia serwera</span>
          </button>
        </div>
      </div>
    </div>
  );
} 