'use client'

import React, { useState } from 'react';
import { FaCode, FaGamepad, FaGlobe, FaServer, FaHistory, FaChevronRight, FaCalendarAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface ChangelogEntry {
  mode: string;
  version: string;
  date: string;
  changes: string[];
}

interface ChangelogData {
  [category: string]: ChangelogEntry[];
}

const getModeIcon = (mode: string) => {
  switch (mode.toLowerCase()) {
    case 'strona':
      return <FaGlobe className="text-blue-500" />;
    case 'lobby':
      return <FaServer className="text-green-500" />;
    case 'oneblock':
      return <FaGamepad className="text-yellow-500" />;
    case 'muzeum':
      return <FaHistory className="text-purple-500" />;
    default:
      return <FaCode className="text-gray-500" />;
  }
};

const getModeColor = (mode: string) => {
  switch (mode.toLowerCase()) {
    case 'strona':
      return {
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/30',
        text: 'text-blue-500',
        hover: 'hover:bg-blue-500/20'
      };
    case 'lobby':
      return {
        bg: 'bg-green-500/10',
        border: 'border-green-500/30',
        text: 'text-green-500',
        hover: 'hover:bg-green-500/20'
      };
    case 'oneblock':
      return {
        bg: 'bg-yellow-500/10',
        border: 'border-yellow-500/30',
        text: 'text-yellow-500',
        hover: 'hover:bg-yellow-500/20'
      };
    case 'muzeum':
      return {
        bg: 'bg-purple-500/10',
        border: 'border-purple-500/30',
        text: 'text-purple-500',
        hover: 'hover:bg-purple-500/20'
      };
    default:
      return {
        bg: 'bg-gray-500/10',
        border: 'border-gray-500/30',
        text: 'text-gray-500',
        hover: 'hover:bg-gray-500/20'
      };
  }
};

const Changelog = () => {
  const [activeTab, setActiveTab] = useState<string>('ogolny');
  const [changelogContent, setChangelogContent] = useState<ChangelogData>({
    ogolny: [],
    strona: [],
    lobby: [],
    oneblock: [],
    muzeum: [],
    survival: [],
  });

  // Automatyczne zaciąganie zmian do sekcji "Ogólny" i sortowanie według daty
  changelogContent.ogolny = [];
  Object.keys(changelogContent).forEach((key) => {
    if (key !== 'ogolny') {
      changelogContent.ogolny.push(...changelogContent[key]);
    }
  });

  // Funkcja pomocnicza do konwersji daty w formacie DD.MM.YYYY na obiekt Date
  const parseDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split('.').map(Number);
    return new Date(year, month - 1, day);
  };

  // Sortowanie changelogów w sekcji "Ogólny" według daty
  changelogContent.ogolny.sort((a, b) => {
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  const tabs = [
    { id: 'ogolny', label: 'Ogólne', icon: <FaCode /> },
    { id: 'strona', label: 'Strona', icon: <FaGlobe /> },
    { id: 'lobby', label: 'Lobby', icon: <FaServer /> },
    { id: 'oneblock', label: 'OneBlock', icon: <FaGamepad /> },
    { id: 'muzeum', label: 'Muzeum', icon: <FaHistory /> },
  ];

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Nagłówek */}
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-300 bg-clip-text text-transparent mb-2">
          Lista Zmian
        </h1>
        <p className="text-gray-400">
          Śledź wszystkie aktualizacje i zmiany wprowadzane na serwerze
        </p>
      </div>

      {/* Nawigacja */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
              activeTab === tab.id
                ? `${getModeColor(tab.id).bg} ${getModeColor(tab.id).text} border ${getModeColor(tab.id).border}`
                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {tab.icon}
            {tab.label}
          </motion.button>
        ))}
      </div>

      {/* Lista zmian */}
      <div className="space-y-6">
        {changelogContent[activeTab]?.map((entry, index) => (
          <motion.div
            key={`${entry.version}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`${getModeColor(entry.mode).bg} border ${getModeColor(entry.mode).border} rounded-xl p-6`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {getModeIcon(entry.mode)}
                <div>
                  <h3 className="font-bold text-lg">Wersja {entry.version}</h3>
                  <p className="text-gray-400 text-sm flex items-center gap-2">
                    <FaCalendarAlt className={getModeColor(entry.mode).text} />
                    {entry.date}
                  </p>
                </div>
              </div>
              <span className={`text-sm font-medium ${getModeColor(entry.mode).text}`}>
                {entry.mode}
              </span>
            </div>
            <ul className="space-y-2">
              {entry.changes.map((change, changeIndex) => (
                <li 
                  key={changeIndex}
                  className="flex items-start gap-2 text-gray-300"
                >
                  <FaChevronRight className={`${getModeColor(entry.mode).text} mt-1 flex-shrink-0`} />
                  <span>{change}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
        {(!changelogContent[activeTab] || changelogContent[activeTab].length === 0) && (
          <div className="text-center py-8">
            <p className="text-gray-400">Brak zmian do wyświetlenia</p>
            <p className="text-sm text-gray-500 mt-1">
              W tej kategorii nie ma jeszcze żadnych wpisów
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Changelog; 