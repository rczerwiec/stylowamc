import Image from "next/image";
import { FaSpinner, FaTrophy, FaClock, FaStar } from "react-icons/fa";
import Link from "next/link";

interface Achievement {
  id: number;
  uuid: string;
  player_name: string;
  achievement_id: string;
  achievement_name: string;
  achievement_description: string;
  material: string;
  unlock_date: string;
}

interface AchievementsListProps {
  achievements: Achievement[];
  loading: boolean;
}

const getMaterialImage = (material: string) => {
  return `https://minecraft-api.vercel.app/images/items/${material.toLowerCase()}.png`;
};

const getRarityColor = (achievementId: string) => {
  // Przykładowe kolory dla różnych poziomów rzadkości
  if (achievementId.includes('MASTER') || achievementId.includes('LEGENDARY')) {
    return 'from-purple-500 to-pink-500';
  } else if (achievementId.includes('EXPERT') || achievementId.includes('RARE')) {
    return 'from-blue-500 to-cyan-500';
  } else if (achievementId.includes('ADVANCED')) {
    return 'from-green-500 to-emerald-500';
  }
  return 'from-yellow-500 to-amber-500';
};

export default function AchievementsList({ achievements, loading }: AchievementsListProps) {
  return (
    <div className="bg-gray-800/90 p-6 rounded-lg shadow-lg w-full backdrop-blur-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? (
          <div className="col-span-full flex justify-center items-center py-8 bg-gray-700/30 rounded-lg">
            <FaSpinner className="animate-spin text-yellow-400 text-2xl" />
            <span className="ml-2 text-gray-400">Ładowanie osiągnięć...</span>
          </div>
        ) : achievements.length > 0 ? (
          achievements.map((achieve) => (
            <div
              key={achieve.id}
              className={`relative bg-gradient-to-br ${getRarityColor(achieve.achievement_id)} bg-opacity-10 p-4 rounded-lg shadow-xl 
                         hover:scale-105 transition-all duration-300 group overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gray-800 opacity-95 z-0"></div>
              <div className="relative z-10">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-amber-500/20 rounded-full animate-pulse"></div>
                    <Image
                      src={getMaterialImage(achieve.material)}
                      alt={achieve.material}
                      width={48}
                      height={48}
                      className="pixelated transform group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        // Fallback do domyślnej ikony jeśli obrazek się nie załaduje
                        const imgElement = e.target as HTMLImageElement;
                        imgElement.src = "https://minecraft-api.vercel.app/images/items/grass_block.png";
                      }}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <p className="font-bold text-sm bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                      {achieve.achievement_name}
                    </p>
                    <p className="text-xs text-gray-300 group-hover:text-white transition-colors">
                      {achieve.achievement_description}
                    </p>
                    <div className="flex items-center justify-center text-xs text-gray-400 mt-2 space-x-1">
                      <FaClock className="text-yellow-500" />
                      <span>{new Date(achieve.unlock_date).toLocaleDateString('pl-PL')}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Efekt błyszczenia w tle */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent 
                            transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 bg-gray-700/30 rounded-lg">
            <FaStar className="mx-auto text-3xl text-yellow-500 mb-2 animate-pulse" />
            <p className="text-gray-400">Brak zdobytych osiągnięć</p>
            <p className="text-sm text-gray-500">Zagraj więcej, aby zdobyć osiągnięcia!</p>
          </div>
        )}
      </div>

      <Link
        href="/achievements"
        className="mt-6 bg-gradient-to-r from-yellow-500 to-amber-500 text-gray-900 px-6 py-3 rounded-lg shadow-lg 
                 hover:from-yellow-400 hover:to-amber-400 transition-all duration-300 inline-block w-full 
                 font-semibold text-center group relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        <div className="relative flex items-center justify-center">
          <FaTrophy className="mr-2 animate-bounce" /> 
          Zobacz wszystkie osiągnięcia
        </div>
      </Link>
    </div>
  );
} 