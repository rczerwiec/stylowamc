import { FaClock, FaCoins } from "react-icons/fa";

interface PlayerBasicStatsProps {
  smcoins: number;
  playtime: number;
  playtimeOneBlock: number;
  playtimeLobby: number;
  playtimeSurvival: number;
  formatPlayTime: (ticks: number) => string;
}

export default function PlayerBasicStats({ smcoins, playtime, playtimeOneBlock, playtimeLobby, playtimeSurvival, formatPlayTime }: PlayerBasicStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center mb-6">
      <div className="bg-gray-700 p-4 rounded-lg flex flex-col items-center shadow-md">
        <FaCoins className="text-yellow-400 text-2xl mb-2" />
        <p className="text-lg font-semibold">{smcoins || 0}</p>
        <p className="text-gray-400 text-sm">Smcoiny</p>
      </div>
      <div className="bg-gray-700 p-4 rounded-lg flex flex-col items-center shadow-md">
        <FaClock className="text-blue-400 text-2xl mb-2" />
        <p className="text-lg font-semibold">{formatPlayTime(playtime || 0)}</p>
        <p className="text-gray-400 text-sm">Czas gry</p>
      </div>
      <div className="bg-gray-700 p-4 rounded-lg flex flex-col items-center shadow-md col-span-2">
        <FaClock className="text-blue-400 text-2xl mb-2" />
        <p className="text-lg font-semibold">{formatPlayTime(playtimeOneBlock || 0)}</p>
        <p className="text-gray-400 text-sm">Czas gry na OneBlock S1 (SM8)</p>
      </div>
      <div className="bg-gray-700 p-4 rounded-lg flex flex-col items-center shadow-md col-span-2">
        <FaClock className="text-blue-400 text-2xl mb-2" />
        <p className="text-lg font-semibold">{formatPlayTime(playtimeSurvival || 0)}</p>
        <p className="text-gray-400 text-sm">Czas gry na Survival S1 (SM8)</p>
      </div>
      <div className="bg-gray-700 p-4 rounded-lg flex flex-col items-center shadow-md col-span-2">
        <FaClock className="text-blue-400 text-2xl mb-2" />
        <p className="text-lg font-semibold">{formatPlayTime(playtimeLobby || 0)}</p>
        <p className="text-gray-400 text-sm">Czas gry na Lobby</p>
      </div>
    </div>
  );
} 