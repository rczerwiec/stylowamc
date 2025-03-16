"use client"

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaTrophy, FaCalendar, FaUsers, FaMedal, FaUserFriends, FaImages } from 'react-icons/fa';
import { CompetitionData } from '../data';
import ImageModal from '../../components/ImageModal';

// Funkcja pomocnicza do określania koloru medalu
const getMedalColor = (place: number) => {
  switch (place) {
    case 1:
      return 'text-yellow-400';
    case 2:
      return 'text-gray-400';
    case 3:
      return 'text-amber-600';
    default:
      return 'text-gray-500';
  }
};

type Props = {
  params: {
    slug: string;
  };
  competition: CompetitionData;
};

export default function ClientCompetitionPage({competition }: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState<number>(0);
  const [currentEntry, setCurrentEntry] = useState<typeof competition.allEntries[0] | null>(null);

  if (!competition) {
    notFound();
  }

  const handleImageClick = (image: string, entry: typeof competition.allEntries[0], index: number) => {
    setSelectedImage(image);
    setCurrentEntry(entry);
    setCurrentGalleryIndex(index);
  };

  const handleNext = () => {
    if (!currentEntry) return;
    const nextIndex = currentGalleryIndex + 1;
    if (nextIndex < currentEntry.gallery.length) {
      setSelectedImage(currentEntry.gallery[nextIndex]);
      setCurrentGalleryIndex(nextIndex);
    }
  };

  const handlePrev = () => {
    if (!currentEntry) return;
    const prevIndex = currentGalleryIndex - 1;
    if (prevIndex >= 0) {
      setSelectedImage(currentEntry.gallery[prevIndex]);
      setCurrentGalleryIndex(prevIndex);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Nagłówek */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-yellow-400 mb-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          {competition.title}
        </h1>
        <div className="flex justify-center items-center space-x-6 text-gray-300">
          <div className="flex items-center">
            <FaCalendar className="mr-2 text-yellow-400" />
            <span>{competition.date}</span>
          </div>
          <div className="flex items-center">
            <FaUsers className="mr-2 text-yellow-400" />
            <span>{competition.participants} uczestników</span>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ImageModal
        isOpen={!!selectedImage}
        onClose={() => {
          setSelectedImage(null);
          setCurrentEntry(null);
          setCurrentGalleryIndex(0);
        }}
        imageUrl={selectedImage || ''}
        onNext={handleNext}
        onPrev={handlePrev}
        hasNext={Boolean(currentEntry && currentGalleryIndex < currentEntry.gallery.length - 1)}
        hasPrev={currentGalleryIndex > 0}
      />

      {/* Główne zdjęcie */}
      <div 
        className="relative h-96 mb-12 rounded-lg overflow-hidden shadow-lg transform hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
        onClick={() => handleImageClick(competition.mainImage, competition.allEntries[0], 0)}
      >
        <Image
          src={competition.mainImage}
          alt={competition.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Opis */}
      <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 mb-12 shadow-lg border border-gray-700">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center">
          <FaTrophy className="mr-3" />
          O Konkursie
        </h2>
        <p className="text-gray-300 leading-relaxed">{competition.description}</p>
      </div>

      {/* Top 3 */}
      <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 mb-12 shadow-lg border border-gray-700">
        <div className="flex items-center mb-6">
          <FaTrophy className="text-yellow-400 text-3xl mr-3" />
          <h2 className="text-3xl font-bold text-yellow-400">
            Podium
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {competition.top3.map((winner) => (
            <Link href={`/panel/${winner.name}`} key={winner.name}>
              <div className="bg-gray-700/90 rounded-lg p-4 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-gray-700 border border-gray-600 group">
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={winner.image}
                    alt={`Projekt ${winner.name}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex items-center mb-2">
                  <FaMedal className={`text-2xl mr-2 ${getMedalColor(winner.place)}`} />
                  <h3 className="text-xl font-semibold text-white group-hover:text-yellow-400 transition-colors">{winner.name}</h3>
                </div>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{winner.prize}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Szczegółowe opisy wysp */}
      <div className="space-y-12">
        {competition.allEntries
          .sort((a, b) => b.place - a.place)
          .map((entry) => (
            <div key={entry.place} className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-gray-700">
              <div className="flex items-center mb-6">
                <FaMedal className={`text-3xl mr-3 ${getMedalColor(entry.place)}`} />
                <h2 className="text-3xl font-bold text-yellow-400">
                  Miejsce {entry.place}
                </h2>
              </div>
              
              {/* Główne zdjęcie i opis */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div 
                  className="relative h-64 rounded-lg overflow-hidden shadow-lg group cursor-pointer"
                  onClick={() => handleImageClick(entry.mainImage, entry, 0)}
                >
                  <Image
                    src={entry.mainImage}
                    alt={`Wyspa gracza ${entry.playerName}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center mb-4">
                    <Link
                      href={`/panel/${entry.playerName}`}
                      className="flex items-center group"
                    >
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden shadow-lg mr-4 transition-all duration-300 group-hover:scale-110 border border-gray-600">
                        <Image
                          src={`https://minotar.net/avatar/${entry.playerName}/48`}
                          alt={entry.playerName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h3 className="text-2xl font-semibold text-white group-hover:text-yellow-400 transition-colors duration-300">
                        Wyspa gracza {entry.playerName}
                      </h3>
                    </Link>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {entry.description}
                  </p>
                  
                  {/* Sekcja członków zespołu */}
                  {entry.teamMembers && entry.teamMembers.length > 0 && (
                    <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                      <div className="flex items-center mb-3">
                        <FaUserFriends className="text-yellow-400 text-xl mr-2" />
                        <h4 className="text-lg font-semibold text-yellow-400">
                          Pozostali członkowie wyspy:
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {entry.teamMembers.map((member, index) => (
                          <Link
                            href={`/panel/${member}`}
                            key={index}
                            className="flex flex-col items-center group cursor-pointer"
                          >
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden shadow-lg transition-all duration-300 group-hover:scale-110 border border-gray-600">
                              <Image
                                src={`https://minotar.net/avatar/${member}/48`}
                                alt={member}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <span className="text-sm text-gray-400 mt-1 group-hover:text-yellow-400 transition-colors duration-300">
                              {member}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Galeria */}
              {entry.gallery.length > 1 && (
                <div className="mt-8">
                  <h4 className="text-xl font-semibold text-yellow-400 mb-4 flex items-center">
                    <FaImages className="mr-2" />
                    Galeria
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {entry.gallery.map((image, index) => (
                      <div 
                        key={index} 
                        className="relative h-48 rounded-lg overflow-hidden shadow-lg group cursor-pointer"
                        onClick={() => handleImageClick(image, entry, index)}
                      >
                        <Image
                          src={image}
                          alt={`Zdjęcie ${index + 1} wyspy gracza ${entry.playerName}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
} 