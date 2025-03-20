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
  const [activeTab, setActiveTab] = useState<'ogolny' | 'strona' | 'lobby' | 'oneblock' | 'muzeum' | 'survival'>('ogolny');

  const changelogContent: Record<string, ChangelogEntry[]> = {
    ogolny: [],
    strona: [
      {
        mode: "Strona",
        version: "1.1.0",
        date: "20.03.2025",
        changes: [
          "Zmieniony design większości elementów strony.",
          "Dodano nowy system newsów.",
          "Dodano wyszukiwarkę graczy.",
          "Dodano możliwość kupienia fly na wyspie.",
          "Zaimplementowano strony na których można głosować na nasz serwer w zakładce 'Głosuj'.",
          "Poprawiono liczne błędy."
        ],
      },
      {
        mode: "Strona",
        version: "1.0.5",
        date: "16.03.2025",
        changes: [
          "Dodano zakładkę 'Historia' - znajdują się tam historie prezydentów, mistrzów w parkourze oraz wyniki konkursów.",
          "Poprawiono strone z błędem o nieistniejącym graczu gdy się go spróbuje wyszukać np. www.stylowamc.pl/panel/notch",
          "Zaaktualizowano opis rang",
        ],
      },
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
        version: "1.1.1",
        date: "16.03.2025",
        changes: [
          "Serwer pamięta teraz sesja zalogowanego użytkownika - nie musisz się ponownie logować jeśli wyszedłeś na kilka minut.",
        ],
      },
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
        version: "1.4.1",
        date: "18.03.2025",
        changes: [
          "Poprawki w pluginie z parkourem.",
          "Rozpoczęte prace nad remakiem skrzyń premium",
        ],
      },
      {
        mode: "OneBlock",
        version: "1.4.0",
        date: "17.03.2025",
        changes: [
          "Poprawiono błędy w niektórych questach.",
          "Dodano łącznie prawie 100 nowych questów (rzemiosło, górnictwo)",
          "Naprawiono otchłań",
          "Zablokowano możliwość wyrzucania i podnoszenia przedmiotów na spawnie",
          "Metin teraz respi się randomowo pomiedzy 16 a 22",
          "Dodano wstępny system wykrywania afk na wyspach",
          "Dodano system automatycznych wiadomości na chacie",
          "Dodano system minigierek na chacie (eksperymentalny)",
          "Na spawnie pojawił się npc, który pozwala na zakup alkoholu (eksperymentalny)",
          "Naprawiono błąd z lataniem u UVIPÓW i osób które zakupiły fly na stronie",
          "Zablokowano możliwość respienia kurczaków na spawnie jajkami"
        ],
      },
      {
        mode: "OneBlock",
        version: "1.3.2",
        date: "16.03.2025",
        changes: [
          "Dodano ograniczenia na ilość minerów na wyspie (max 12)",
        ],
      },
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
            onClick={() => setActiveTab(tab.id as any)}
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