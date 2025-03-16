'use client';

import React from 'react';
import { FaTrophy, FaRunning, FaUserTie, FaBook, FaExternalLinkAlt } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

const HistoryPage = () => {
  const competitions = [
    {
      id: 1,
      title: "Konkurs Wysp",
      date: "Marzec 2025",
      image: "/images/konkurs1/koxtar1.png",
      link: "/competitions/wyspy-marzec-2025"
    },
  ];

  const parkourChampions = [
    { 
      name: "NeptunISGod", 
      edition: "OneBlock S1 + Lobby",
      points: 751
    },
    { 
      name: "yu7ko", 
      edition: "OneBlock S1",
      points: "INAUGURACJA"
    },
  ];

  const presidents = [
    {
      name: "NeptunISGod",
      duration: "trwa",
      period: "03 Luty 2025 - obecnie",
      achievements: [
        "14 Prezydent SM",
        "Odzyskał władzę bez walki",
        "Pierwszy trzykrotny prezydent serwera",
      ]
    },
    {
      name: "Obudowa",
      duration: "0 dni",
      period: "03 Luty 2025 - 03 Luty 2025",
      achievements: [
        "13 Prezydent SM",
        "Wygrał sfałszowane wybory, po czym zrezygnował twierdząc, że to nie dla niego",
        "Najkrótszy prezydent w historii serwera",
      ]
    },
    {
      name: "NeptunISGod",
      duration: "394 dni",
      period: "06 Styczeń 2024 - 03 Luty 2025",
      achievements: [
        "12 Prezydent SM",
        "Przejęcie władzy siłą z rąk dyktatury i przywrócenie pełnej demokracji",
        "Pierwszy dwukrotny prezydent serwera",
      ]
    },
    {
      name: "PoProstuISGod",
      duration: "10 dni",
      period: "27 Grudzień 2023 - 06 Styczeń 2024",
      achievements: [
        "11 Prezydent SM",
        "Władza została mu nadana pod nieobecność RCS'a",
      ]
    },
    {
      name: "RCS",
      duration: "4 dni",
      period: "23 Grudzień 2023 - 27 Grudzień 2023",
      achievements: [
        "10 Prezydent SM",
        "Przywrócenie dyktatury",
        "Rozpoczęcie wojny domowej na serwerze",
      ]
    },
    {
      name: "NeptunISGod",
      duration: "447 dni",
      period: "2 Październik 2022 - 23 Grudzień 2023",
      achievements: [
        "9 Prezydent SM",
      ]
    },
    {
      name: "Jamajama",
      duration: "171 dni",
      period: "11 Kwiecień 2022 - 2 Październik 2022",
      achievements: [
        "8 Prezydent SM",
      ]
    },
    {
      name: "Koczis212",
      duration: "228 dni",
      period: "28 Wrzesień 2021 - 11 Kwiecień 2022",
      achievements: [
        "7 Prezydent SM",
        "Starał się jak mógł"
      ]
    },
    {
      name: "Skw972",
      duration: "256 dni",
      period: "15 Grudzień 2020 - 28 Wrzesień 2021",
      achievements: [
        "6 Prezydent SM",
      ]
    },
    {
      name: "Receess",
      duration: "17 dni",
      period: "28 Listopad 2020 - 15 Grudzień 2020",
      achievements: [
        "5 Prezydent SM",
        "Przywrócenie pełnoprawnej demokracji",
        "Obalenie dyktatury Stylowego",
        "Pierwsza kobieta prezydent na serwerze",
      ]
    },
    {
      name: "Stylowy",
      duration: "95 dni",
      period: "25 Wrzesień 2020 - 28 Listopad 2020",
      achievements: [
        "4 Prezydent SM",
        "Przejęcie władzy nad serwerem siłą, fałszując wyniki konkursu",
      ]
    },
    {
      name: "Ahareks",
      duration: "47 dni",
      period: "11 Lipiec 2020 - 25 Wrzesień 2020",
      achievements: [
        "3 Prezydent SM",
        "Obalenie komunistów, rozpoczęcie własnej pseudo-demokracji",
      ]
    },
    {
      name: "_ZSSR_",
      duration: "17 dni",
      period: "24 Czerwiec 2020 - 11 Lipiec 2020",
      achievements: [
        "2 Prezydent SM",
        "Wprowadzenie komunistycznych rządów",
      ]
    },
    {
      name: "RedPanda",
      period: "6 Czerwiec 2020 - 24 Czerwiec 2020",
      duration: "18 dni",
      achievements: [
        "Inauguracyjny prezydent serwera",
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-5xl font-bold text-center text-yellow-400 mb-8 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
        Historia Serwera
      </h1>

      {/* Przycisk do Wiki */}
      <div className="mb-12 text-center">
        <a
          href="https://stylowamc.fandom.com/pl/f"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg shadow-lg transition transform hover:scale-105"
        >
          <FaBook className="mr-3 text-2xl" />
          <span className="text-xl font-bold">Poznaj lore serwera!</span>
          <FaExternalLinkAlt className="ml-3" />
        </a>
      </div>
      
      {/* Sekcja Konkursów - Kafelki */}
      <div className="mb-12">
        <div className="flex items-center mb-6">
          <FaTrophy className="text-yellow-400 text-3xl mr-3" />
          <h2 className="text-3xl font-bold text-yellow-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            Wyniki Konkursów
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {competitions.map((competition) => (
            <Link href={competition.link} key={competition.id}>
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:transform hover:scale-105 transition duration-300">
                <div className="relative h-48">
                  <Image
                    src={competition.image}
                    alt={competition.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl text-yellow-400 font-semibold">{competition.title}</h3>
                  <p className="text-gray-300">{competition.date}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sekcja Mistrzów Parkoura - Lista */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <FaRunning className="text-green-400 text-3xl mr-3" />
            <h2 className="text-3xl font-bold text-green-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
              Mistrzowie Parkoura
            </h2>
          </div>
          <div className="space-y-3">
            {parkourChampions.map((champion, index) => (
              <Link href={`/panel/${champion.name}`} key={index}>
                <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer">
                  <div className="flex items-center">
                    <Image
                      src={`https://minotar.net/avatar/${champion.name}/32`}
                      alt={champion.name}
                      width={32}
                      height={32}
                      className="rounded-sm mr-3"
                    />
                    <div>
                      <p className="text-white">{champion.name}</p>
                      <p className="text-gray-400 text-sm">{champion.edition}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-sm">{champion.points}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Sekcja Prezydentów - Lista */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <FaUserTie className="text-purple-400 text-3xl mr-3" />
            <h2 className="text-3xl font-bold text-purple-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
              Lista Prezydentów
            </h2>
          </div>
          <div className="space-y-4">
            {presidents.map((president, index) => {
              const { name, achievements } = president;
              
              return (
                <Link href={`/panel/${president.name}`} key={index}>
                  <div className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer">
                    <div className="flex items-center mb-3">
                      <Image
                        src={`https://minotar.net/avatar/${president.name}/32`}
                        alt={president.name}
                        width={32}
                        height={32}
                        className="rounded-sm mr-3"
                      />
                      <div className="flex-grow">
                        <h3 className="text-xl text-purple-400">{president.name}</h3>
                        <p className="text-gray-400 text-sm">{president.period}</p>
                        <p className="text-gray-500 text-sm">Czas urzędowania: {president.duration}</p>
                      </div>
                    </div>
                    <ul className="list-disc list-inside text-gray-300 ml-2 space-y-1">
                      {president.achievements.map((achievement, achieveIndex) => (
                        <li key={achieveIndex}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage; 