import { FaClock, FaCoins } from "react-icons/fa";

interface PlayerBasicStatsProps {
  smcoins: number;
  playtime: number;
  formatPlayTime: (ticks: number) => string;
}

export default function PlayerBasicStats({ smcoins, playtime, formatPlayTime }: PlayerBasicStatsProps) {
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
    </div>
  );
} 