'use client';

import React, { useState } from 'react';
import { FaTrophy, FaRunning, FaUserTie, FaBook, FaExternalLinkAlt, FaCrown, FaCalendarAlt, FaCheckCircle, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

const ITEMS_PER_PAGE = 5;

export default function HistoryPage() {
  const [currentParkourPage, setCurrentParkourPage] = useState(1);
  const [currentPresidentsPage, setCurrentPresidentsPage] = useState(1);

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
      name: "TheDivine0207", 
      edition: "OneBlock S1 + Lobby",
      points: 1139
    },
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
      name: "SkorpionISGod",
      duration: "trwa",
      period: "15 Maj 2025 - obecnie",
      achievements: [
        "17 Prezydent SM",
        "Muller ogłosił, że w przypadku jego śmierci to on zostanie prezydentem oraz przywódcą rzeszy",
      ]
    },
    {
      name: "Heinrich_Muller",
      duration: "16 dni",
      period: "30 Kwiecień 2025 - 15 Maj 2025",
      achievements: [
        "16 Prezydent SM",
        "Puttler ogłosił, że w przypadku jego śmierci to on zostanie prezydentem oraz przywódcą rzeszy",
        "Zginał w wyniku obrażeń podczas zamachu 15.05.2025"
      ]
    },
    {
      name: "Arnold_Puttler",
      duration: "24 dni",
      period: "06 Kwiecień 2025 - 30 Kwiecień 2025",
      achievements: [
        "15 Prezydent SM",
        "Wygrał wybory jednym głosem więcej niż inny kandydat",
        "Zginał w wyniku obrażeń podczas zamachu 29.04.2025"
      ]
    },
    {
      name: "NeptunISGod",
      duration: "61	dni",
      period: "03 Luty 2025 - 06 Kwiecień 2025",
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

  // Obliczanie indeksów dla paginacji
  const parkourStartIndex = (currentParkourPage - 1) * ITEMS_PER_PAGE;
  const parkourEndIndex = parkourStartIndex + ITEMS_PER_PAGE;
  const totalParkourPages = Math.ceil(parkourChampions.length / ITEMS_PER_PAGE);

  const presidentsStartIndex = (currentPresidentsPage - 1) * ITEMS_PER_PAGE;
  const presidentsEndIndex = presidentsStartIndex + ITEMS_PER_PAGE;
  const totalPresidentsPages = Math.ceil(presidents.length / ITEMS_PER_PAGE);

  // Komponent paginacji
  interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }

  const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => (
    <div className="flex justify-center items-center gap-2 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg ${currentPage === 1 ? 'text-gray-500 cursor-not-allowed' : 'text-yellow-500 hover:bg-gray-700/50'}`}
      >
        <FaChevronLeft />
      </button>
      <span className="text-gray-400">
        Strona {currentPage} z {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg ${currentPage === totalPages ? 'text-gray-500 cursor-not-allowed' : 'text-yellow-500 hover:bg-gray-700/50'}`}
      >
        <FaChevronRight />
      </button>
    </div>
  );

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Nagłówek */}
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-300 bg-clip-text text-transparent mb-2">
          Historia Serwera
        </h1>
        <p className="text-gray-400">
          Poznaj historię StylowaMC i wydarzenia, które ukształtowały naszą społeczność
        </p>
      </div>

      {/* Przycisk do Wiki */}
      <div className="w-full bg-purple-500/10 backdrop-blur-sm rounded-xl border border-purple-500/30 p-6">
        <div className="flex flex-col items-center text-center">
          <FaBook className="text-purple-400 text-3xl mb-3" />
          <h2 className="text-2xl font-bold text-purple-400 mb-2">
            Pełna Historia Serwera
          </h2>
          <p className="text-gray-300 mb-4 max-w-2xl">
            Odkryj fascynującą historię StylowaMC, poznaj wszystkie wydarzenia, które ukształtowały nasz serwer i społeczność.
          </p>
          <Link
            href="https://stylowamc.fandom.com/pl/wiki/Stylowamc_Wiki"
            target="_blank"
            className="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
          >
            Przejdź do Wiki
            <FaExternalLinkAlt className="text-sm" />
          </Link>
        </div>
      </div>
      
      {/* Sekcja Konkursów */}
      <div className="w-full bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
        <div className="flex items-center gap-3 mb-6">
          <FaTrophy className="text-yellow-500 text-2xl" />
          <h2 className="text-2xl font-bold">Wyniki Konkursów</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {competitions.map((competition) => (
            <Link href={competition.link} key={competition.id}>
              <div className="group bg-gray-700/30 rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02]">
                <div className="relative h-48">
                  <Image
                    src={competition.image}
                    alt={competition.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {competition.title}
                    </h3>
                    <p className="text-gray-300 flex items-center gap-2">
                      <FaCalendarAlt className="text-yellow-500" />
                      {competition.date}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sekcja Mistrzów Parkoura */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center gap-3 mb-6">
            <FaRunning className="text-green-500 text-2xl" />
            <h2 className="text-2xl font-bold">Mistrzowie Parkoura</h2>
          </div>
          <div className="space-y-3">
            {parkourChampions.slice(parkourStartIndex, parkourEndIndex).map((champion, index) => (
              <Link href={`/panel/${champion.name}`} key={index}>
                <div className="group bg-gray-700/30 rounded-lg p-4 transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Image
                          src={`https://minotar.net/avatar/${champion.name}/48`}
                          alt={champion.name}
                          width={48}
                          height={48}
                          className="rounded-lg"
                        />
                        {index === 0 && (
                          <FaCrown 
                            className="absolute -top-2 -right-2 text-yellow-500 text-lg transform rotate-12"
                          />
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg group-hover:text-green-400 transition-colors">
                          {champion.name}
                        </h3>
                        <p className="text-gray-400 text-sm">{champion.edition}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-green-500 font-bold">
                        {champion.points} {typeof champion.points === 'number' ? 'pkt' : ''}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {parkourChampions.length > ITEMS_PER_PAGE && (
            <Pagination
              currentPage={currentParkourPage}
              totalPages={totalParkourPages}
              onPageChange={setCurrentParkourPage}
            />
          )}
        </div>

        {/* Sekcja Prezydentów */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center gap-3 mb-6">
            <FaUserTie className="text-blue-500 text-2xl" />
            <h2 className="text-2xl font-bold">Historia Prezydentów</h2>
          </div>
          <div className="space-y-4">
            {presidents.slice(presidentsStartIndex, presidentsEndIndex).map((president, index) => (
              <div 
                key={index}
                className="relative bg-gray-700/30 rounded-lg p-4 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <Image
                      src={`https://minotar.net/avatar/${president.name}/48`}
                      alt={president.name}
                      width={48}
                      height={48}
                      className="rounded-lg"
                    />
                    {index === 0 && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                        <FaCrown className="text-gray-900 text-sm" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg">{president.name}</h3>
                      {president.duration === "trwa" && (
                        <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
                          Aktualny
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm flex items-center gap-2">
                      <FaCalendarAlt className="text-blue-500" />
                      {president.period}
                    </p>
                    <div className="mt-2 space-y-1">
                      {president.achievements.map((achievement, i) => (
                        <p key={i} className="text-sm text-gray-300 flex items-center gap-2">
                          <FaCheckCircle className="text-blue-500 flex-shrink-0" />
                          {achievement}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <Link 
              href="https://stylowamc.fandom.com/pl/f/t/Prezydenci"
              target="_blank"
              className="block text-center text-gray-400 hover:text-gray-300 transition-colors"
            >
              Zobacz pełną historię prezydentów →
            </Link>
          </div>
          {presidents.length > ITEMS_PER_PAGE && (
            <Pagination
              currentPage={currentPresidentsPage}
              totalPages={totalPresidentsPages}
              onPageChange={setCurrentPresidentsPage}
            />
          )}
        </div>
      </div>
    </div>
  );
} 