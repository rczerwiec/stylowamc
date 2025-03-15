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
        version: "1.0.4",
        date: "14.03.2025",
        changes: [
          "Naprawiono błędy w panelu zalogowanego gracza (błędnie liczony czas gry).",
        ],
      },
      {
        mode: "Strona",
        version: "1.0.3",
        date: "13.03.2025",
        changes: [
          "Dodano możliwość kupienia fly na wyspie.",
        ],
      },
      {
        mode: "Strona",
        version: "1.0.2",
        date: "12.03.2025",
        changes: [
          "Drobne poprawki wizualne.",
          "Dodana możliwość płatności PayPal",
        ],
      },
      {
        mode: "Strona",
        version: "1.0.1",
        date: "10.03.2025",
        changes: [
          "Poprawiono błędy w rankingach - kwoty są teraz zakrąglone do dwóch liczb po przecinku.",
          "Dodana stronę z opisem rang.",
          "Dodano stronę z changelogiem.",
          "Drobne poprawki wizualne.",
          "Dodano osobne czasy dla trybów w panelu gracza.",
          "Naprawione zliczanie czasu w panelu gracza.",
        ],
      },
    ],
    lobby: [
      {
        mode: "Lobby",
        version: "1.1.0",
        date: "15.03.2025",
        changes: [
          "Przerobiono system lunchpadów (zmiana na autorski)",
          "Dodano kompas (autorski)",
          "Dodano double-jumpa (autorski)",
          "Dodano system trailów (autorski)",
          "Dodano system gadgetów (autorski)"
        ],
      },
      {
        mode: "Lobby",
        version: "1.0.2",
        date: "12.03.2025",
        changes: [
          "Utworzono autorski plugin do komunikacji sieć-serwer.",
          "Naprawione liczniki graczy na scoreboardzie.",
          "Naprawione liczniki graczy w hologramach nad NPC.",
          "Naprawiony licznik graczy całej sieci na TABIE",
          "Drobne poprawki w Scoreboardzie",
          "Dodano komendę na poziomie sieci - /lobby - przenoszącą do serwera lobby.",
          "Usprawniono system cenzury.",
        ],
      },
      {
        mode: "Lobby",
        version: "1.0.2",
        date: "10.03.2025",
        changes: [
          "Usprawnienia zabezpieczeń.",
        ],
      },
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
        version: "1.3.1",
        date: "15.03.2025",
        changes: [
          "Dodano /ob warp",
          "Usprawnienia w systemie generatora rud - dodano redstone i lapis oraz hologram nad spawnerem w trakcie kopania",
        ],
      },
      {
        mode: "OneBlock",
        version: "1.3.0",
        date: "14.03.2025",
        changes: [
          "Dodano rudy do generatorów cobblestone'a, stone'a oraz bazaltu (autorski plugin).",
          "Tymczasowo usunięto questy związane z enchantingiem.",
        ],
      },
      {
        mode: "OneBlock",
        version: "1.2.3",
        date: "13.03.2025",
        changes: [
          "Drobne poprawki w pluginach.",
          "Fly na wyspie dla UVIP oraz do kupna na stronie",
        ],
      },
      {
        mode: "OneBlock",
        version: "1.2.2",
        date: "12.03.2025",
        changes: [
          "Naprawiono podświetlanie/aut-uzupełnianie się komend typu /msg /tpa /home",
          "Dodano nowe dodatki do slimefuna",
          "TAB pokazuje teraz wszystkich graczy w całej sieci.",
          "Dodano komendę na poziomie sieci - /lobby - przenoszącą do serwera lobby.",
          "Usprawniono system cenzury.",
        ],
      },
      {
        mode: "OneBlock",
        version: "1.2.1",
        date: "11.03.2025",
        changes: [
          "Po usunięciu wyspy, nie traci się już przedmiotów.",
        ],
      },
      {
        mode: "OneBlock",
        version: "1.2.0",
        date: "10.03.2025",
        changes: [
          "Naprawiony błąd związany z /ob upgrade w przypadku gdy nie jesteś właścicielem wyspy.",
          "Liczne usprawnienia permisji ",
          "Dodany plugin na /sit /lay itd (wyłacznie rangi vip)",
          "Dodane ograniczenia antyspamowe na chacie (wiadomości co 3sekundy).",
          "Dodano level wyspy przy nicku na chacie.",
          "Zmieniono liczne dropy ze skrzynek afk.",
        ],
      },
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
          <li>Dodanie kasyna (oneblock)</li>
          <li>Dodanie płatności SMS (strona)</li>
          <li>Poprawki w permisjach</li>
          <li>Przywrócenie /wb</li>
          <li>Dodanie marry (oneblock)</li>
          <li>Dodanie możliwości ulepszenia stoniarek (oneblock)</li>
          <li>Ograniczenie minerów na wyspie np. max 25 na wyspę (oneblock)</li>
          <li>Nowe statystyki na stronie </li>
          <li>Możliwość wyszukiwania graczy/lista graczy na stronie</li>
          <li>Historia rang na stronie</li>
          <li>Logowanie premium - od nowej edycji</li>
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