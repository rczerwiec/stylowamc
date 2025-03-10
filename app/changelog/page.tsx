'use client'

import React, { useState } from 'react';

interface ChangelogEntry {
  mode: string;
  version: string;
  date: string;
  changes: string[];
}

const Changelog = () => {
  const [activeTab, setActiveTab] = useState<'ogolny' | 'strona' | 'lobby' | 'oneblock' | 'muzeum' | 'survival'>('ogolny');

  const changelogContent: Record<string, ChangelogEntry[]> = {
    ogolny: [],
    strona: [
      {
        mode: "Strona",
        version: "1.0.1",
        date: "10.03.2025",
        changes: [
          "Poprawiono błędy w rankingach - kwoty są teraz zakrąglone do dwóch liczb po przecinku.",
          "Dodana stronę z opisem rang.",
          "Dodano stronę z changelogiem.",
          "Drobne poprawki wizualne.",
        ],
      },
    ],
    lobby: [
      {
        mode: "Lobby",
        version: "1.0.1",
        date: "09.03.2025",
        changes: [
          "Drobne zmiany wizualne.",
          "Dodano NPC z mapą Eventową.",
        ],
      },
      {
        mode: "Lobby",
        version: "1.0.0",
        date: "07.03.2025",
        changes: [
          "Otwarcie pierwszej wersji serwerowego Lobby.",
        ],
      },
    ],
    oneblock: [
      {
        mode: "OneBlock",
        version: "1.1.0",
        date: "09.03.2025",
        changes: [
          "Załatano mnóstwo błędów związanych z serwerem.",
          "Dodano /ob chat",
          "Zmiany wizualne /ob upgrade",
          "Liczne poprawki w tłumaczeniach.",
        ],
      },
      {
        mode: "OneBlock",
        version: "1.0.0",
        date: "08.03.2025",
        changes: [
          "Otwarto serwer OneBlock.",
        ],
      },
    ],
    muzeum: [
      // {
      //   mode: "Muzeum",
      //   version: "1.0.0",
      //   date: "08.03.2025",
      //   changes: [
      //     "Dodano nowe eksponaty.",
      //   ],
      // },
    ],
    survival: [
      // {
      //   mode: "Survival",
      //   version: "1.0.0",
      //   date: "08.03.2025",
      //   changes: [
      //     "Wprowadzono nowe mechaniki gry.",
      //   ],
      // },
    ],
  };

  // Automatyczne zaciąganie zmian do sekcji "Ogólny" i sortowanie według daty
  Object.keys(changelogContent).forEach((key) => {
    if (key !== 'ogolny') {
      changelogContent.ogolny.push(...changelogContent[key]);
    }
  });

  // Sortowanie changelogów w sekcji "Ogólny" według daty
  changelogContent.ogolny.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="flex flex-col items-center justify-center w-full bg-gray-900 text-white p-6 rounded-lg">
      {/* Nagłówek */}
      <h2 className="text-3xl font-bold mb-6">📜 Changelog</h2>

      {/* Sekcja "Rzeczy do poprawek" */}
      <div className="max-w-4xl w-full bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4">Planowane zmiany i znane błędy</h3>
        <ul className="list-disc list-inside mb-6">
          <li>Dalsza naprawa błędów w tłumaczeniach (oneblock).</li>
          <li>Poprawki w liczeniu liczb graczy i czasu (lobby).</li>
          <li>Naprawa /ob upgrade - gdy chcesz ulepszyć wyspę nie będąc jej właścicielem (oneblock).</li>
          <li>Dodanie rud ze stoniarek (oneblock)</li>
          <li>Dodanie kasyna (oneblock)</li>
          <li>Poprawki w permisjach</li>
          <li>Dodanie /sit i pozostałych dla rangi vipowskich /lay itd (oneblock)</li>
          <li>Dodanie marry (oneblock)</li>
        </ul>
      </div>

      {/* Zakładki */}
      <div className="flex space-x-4 mb-6">
        {Object.keys(changelogContent).map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as 'ogolny' | 'strona' | 'lobby' | 'oneblock' | 'muzeum' | 'survival')}
            className={`text-yellow-400 hover:underline ${activeTab === key ? 'font-bold' : ''}`}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>

      {/* Sekcje changelogu */}
      <div className="max-w-4xl w-full bg-gray-800 p-6 rounded-lg shadow-md">
        {changelogContent[activeTab].map((entry, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-xl font-semibold mb-2">
              {entry.mode} {entry.version} - {entry.date}
            </h3>
            <ul className="list-disc list-inside mb-6">
              {entry.changes.map((change, changeIndex) => (
                <li key={changeIndex}>{change}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Changelog; 