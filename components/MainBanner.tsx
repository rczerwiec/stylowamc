'use client'

import Image from "next/image";
import dirtTexture from "../public/images/dirt2.jpg";
import { useState, useEffect } from "react";
import { FaCopy, FaCheck, FaDiscord, FaUsers } from 'react-icons/fa';

const MainBanner = () => {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [playersOnline, setPlayersOnline] = useState(0);
  const [discordMembers, setDiscordMembers] = useState(0);

  useEffect(() => {
    // Pobieranie liczby graczy online
    const fetchPlayersOnline = async () => {
      try {
        const response = await fetch('/api/server/stats');
        const data = await response.json();
        setPlayersOnline(data.playersOnline || 0);
      } catch (error) {
        console.error('Błąd pobierania statystyk serwera:', error);
      }
    };

    // Pobieranie liczby członków Discorda
    const fetchDiscordMembers = async () => {
      try {
        const response = await fetch('/api/discord/stats');
        const data = await response.json();
        setDiscordMembers(data.membersCount || 0);
      } catch (error) {
        console.error('Błąd pobierania statystyk Discorda:', error);
      }
    };

    fetchPlayersOnline();
    fetchDiscordMembers();

    // Odświeżanie co 5 minut
    const interval = setInterval(() => {
      fetchPlayersOnline();
      fetchDiscordMembers();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCopyIP = () => {
    const serverIP = "stylowamc.pl";
    const textArea = document.createElement("textarea");
    textArea.value = serverIP;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Nie udało się skopiować IP:', err);
    }
    document.body.removeChild(textArea);
  };

  return (
    <div className="w-full">
      {/* Główny kontener z tłem */}
      <div
        className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-800"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${dirtTexture.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Efekt świecenia w tle */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>

        {/* Zawartość */}
        <div className="relative flex flex-col lg:flex-row items-center justify-between p-6 lg:p-10">
          {/* Lewa strona - tekst */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left z-10 w-full lg:w-[60%]">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold font-alegreya-sans text-white mb-4 tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                StylowaMC
              </span>
            </h1>
            
            <p className="text-lg lg:text-xl text-gray-200 mb-6 leading-relaxed max-w-2xl">
              Szukasz serwera OneBlock? Dołącz do nas i doświadcz zabawy jakiej nigdy jeszcze nie widziałeś!
            </p>

            {/* Przyciski */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-6">
              <button
                onClick={handleCopyIP}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative group flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl text-base font-bold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-blue-500/25"
              >
                {copied ? <FaCheck className="text-lg" /> : <FaCopy className="text-lg" />}
                <span>{copied ? 'SKOPIOWANO!' : 'SKOPIUJ IP'}</span>
                
                {/* Tooltip */}
                <div className={`absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-sm py-2 px-4 rounded-lg transition-all duration-300 ${(isHovered || copied) ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                  stylowamc.pl
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-black/90"></div>
                </div>
              </button>

              <a
                href="https://dc.stylowamc.pl"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] text-white px-6 py-3 rounded-xl text-base font-bold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[#5865F2]/25"
              >
                <FaDiscord className="text-lg" />
                <span>DISCORD</span>
              </a>
            </div>

            {/* Statystyki */}
            <div className="flex flex-col sm:flex-row items-center gap-4 text-gray-300">
              <div className="flex items-center gap-2 bg-black/30 px-4 py-2 rounded-lg">
                <FaUsers className="text-blue-400 text-lg" />
                <span>{playersOnline} graczy online</span>
              </div>
              <div className="flex items-center gap-2 bg-black/30 px-4 py-2 rounded-lg">
                <FaDiscord className="text-[#5865F2] text-lg" />
                <span>{discordMembers} członków Discord</span>
              </div>
            </div>
          </div>

          {/* Prawa strona - logo */}
          <div className="relative w-32 h-32 lg:w-[18rem] lg:h-[18rem] xl:w-[20rem] xl:h-[20rem] mt-6 lg:mt-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full filter blur-3xl animate-pulse"></div>
            <Image
              src="/images/logo.png"
              alt="Logo StylowaMC"
              className="relative w-full h-full object-contain animate-float drop-shadow-2xl"
              width={800}
              height={800}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
