'use client';

import React from 'react';
import Link from 'next/link';
import { FaExternalLinkAlt, FaGift, FaTrophy, FaCalendarAlt, FaCoins, FaChevronRight, FaClock, FaChartLine } from 'react-icons/fa';
import { motion } from 'framer-motion';

const votingSites = [
  {
    name: "Lista-Serwerow.zxu.pl",
    url: "https://lista-serwerow.zxu.pl/serwer/stylowamc.pl",
    description: "Nowa lista serwerów Minecraft",
    votes: 0,
    position: 0
  },
  {
    name: "LSMC.pl",
    url: "https://lsmc.pl/server/3910629",
    description: "Popularna lista serwerów Minecraft",
    votes: 0,
    position: 0
  },
  {
    name: "TopkaMC.pl",
    url: "https://www.topkamc.pl/serwer/stylowamc-pl.38",
    description: "Ranking najlepszych serwerów Minecraft",
    votes: 0,
    position: 0
  },
  {
    name: "NajSerwery.pl",
    url: "https://najserwery.pl/serwer/535",
    description: "Lista najlepszych serwerów Minecraft",
    votes: 0,
    position: 0
  },
  {
    name: "MCList.pl",
    url: "https://www.mclist.pl/serwer/stylowamc.pl",
    description: "Duża społeczność graczy Minecraft w Polsce",
    votes: 0,
    position: 0
  },
  {
    name: "Minecraft-Lista.pl",
    url: "https://minecraft-lista.pl/serwer/StylowaMC.pl",
    description: "Najpopularniejszy polski serwis z listą serwerów",
    votes: 0,
    position: 0
  },
  {
    name: "Lista-Minecraft.pl",
    url: "https://lista-minecraft.pl/serwery/minecraft/e511e522-8697-4fcd-a256-97922b79da0f",
    description: "Znana lista serwerów Minecraft",
    votes: 0,
    position: 0
  },
  {
    name: "Serwery-Minecraft.pl",
    url: "https://serwery-minecraft.pl/serwer/1229-stylowamc-pl",
    description: "Popularna baza serwerów Minecraft",
    votes: 0,
    position: 0
  }
];

const rewards = [
  {
    name: "Klucze do skrzynek",
    description: "Otwórz skrzynie i zdobądź wyjątkowe przedmioty",
    icon: <FaGift className="text-2xl" />
  },
  {
    name: "SMCoiny do wydania na serwerze",
    description: "Kup co chcesz za naszą walutę premium",
    icon: <FaCoins className="text-2xl" />
  },
  {
    name: "24-godzinny boosty doświadczenia",
    description: "Zdobywaj więcej XP przez cały dzień na naszych serwerach",
    icon: <FaCalendarAlt className="text-2xl" />
  },
  {
    name: "Losowy przedmiot kosmetyczny",
    description: "Odblokuj unikalne efekty wizualne",
    icon: <FaTrophy className="text-2xl" />
  }
];

export default function VotePage() {
  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Nagłówek */}
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-300 bg-clip-text text-transparent mb-2">
          Wesprzyj Nas Swoim Głosem!
        </h1>
        <p className="text-gray-400">
          Głosuj codziennie i zdobywaj wyjątkowe nagrody dla siebie i całej społeczności
        </p>
      </div>

      {/* Statystyki głosowania */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
        >
          <div className="flex items-center gap-3 mb-2">
            <FaClock className="text-yellow-500 text-xl" />
            <h3 className="font-semibold">Następne głosowanie za</h3>
          </div>
          <div className="text-3xl font-bold text-yellow-500">21:37:00</div>
          <p className="text-sm text-gray-400 mt-1">Możesz głosować raz na 24h</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
        >
          <div className="flex items-center gap-3 mb-2">
            <FaChartLine className="text-yellow-500 text-xl" />
            <h3 className="font-semibold">Twoje statystyki</h3>
          </div>
          <div className="text-3xl font-bold text-yellow-500">0</div>
          <p className="text-sm text-gray-400 mt-1">Oddanych głosów w tym miesiącu</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
        >
          <div className="flex items-center gap-3 mb-2">
            <FaTrophy className="text-yellow-500 text-xl" />
            <h3 className="font-semibold">Ranking głosujących</h3>
          </div>
          <div className="text-3xl font-bold text-yellow-500">#1</div>
          <p className="text-sm text-gray-400 mt-1">Twoja pozycja w rankingu</p>
        </motion.div>
      </div>

      {/* Sekcja z nagrodami */}
      <div className="w-full bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <div className="flex items-center gap-3 mb-6">
          <FaGift className="text-yellow-500 text-2xl" />
          <h2 className="text-2xl font-bold">Nagrody za Głosowanie</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rewards.map((reward, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group bg-gray-700/30 rounded-lg p-6 hover:bg-gray-700/50 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-yellow-500/10 text-yellow-500 group-hover:scale-110 transition-transform duration-300">
                  {reward.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-yellow-500 mb-1">
                    {reward.name}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {reward.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lista stron do głosowania */}
      <div className="w-full bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <h2 className="text-2xl font-bold mb-6">Gdzie Możesz Zagłosować?</h2>
        <div className="grid gap-4">
          {votingSites.map((site, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group bg-gray-700/30 rounded-lg p-6 hover:bg-gray-700/50 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-yellow-500">{site.name}</h3>
                    <span className="bg-yellow-500/10 text-yellow-500 text-xs px-2 py-1 rounded-full">
                      #{site.position} w rankingu
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">{site.description}</p>
                  <p className="text-sm text-gray-500">
                    Łączna liczba głosów: <span className="text-yellow-500 font-semibold">{site.votes}</span>
                  </p>
                </div>
                <Link 
                  href={site.url}
                  className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 font-medium"
                >
                  Głosuj Teraz
                  <FaExternalLinkAlt className="text-sm" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Informacja o systemie */}
      <div className="w-full bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 text-center">
        <FaChevronRight className="text-yellow-500 text-xl mx-auto mb-2" />
        <h3 className="text-lg font-semibold text-yellow-500 mb-2">
          System w Przygotowaniu
        </h3>
        <p className="text-gray-400">
          System głosowania jest w trakcie tworzenia. Linki zostaną zaktualizowane wkrótce. A niektóre elementy są nieaktualne. Na ten moment, możesz pochwalić się w tickecie tym, że oddałeś na nas głos.
        </p>
        <p className="text-yellow-500 mt-2">
          3 Głosy = 1 SMCoin. Głosować można raz w tygodniu.
        </p>
      </div>
    </div>
  );
}
