import Image from "next/image";
import { FaSpinner, FaTrophy } from "react-icons/fa";
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
  const materialName = material.toLowerCase();
  return `https://minecraft-api.vercel.app/images/items/${materialName}.png`;
};

export default function AchievementsList({ achievements, loading }: AchievementsListProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <FaTrophy className="mr-2 text-yellow-400" /> 
        Osiągnięcia
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {loading ? (
          <div className="col-span-full flex justify-center items-center py-8">
            <FaSpinner className="animate-spin text-yellow-400 text-2xl" />
            <span className="ml-2 text-gray-400">Ładowanie osiągnięć...</span>
          </div>
        ) : achievements.length > 0 ? (
          achievements.map((achieve) => (
            <div
              key={achieve.id}
              className="bg-gray-700 p-4 rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <span className="mb-2">
                  <Image
                    src={getMaterialImage(achieve.material)}
                    alt={achieve.material}
                    width={32}
                    height={32}
                    className="pixelated"
                  />
                </span>
                <p className="font-semibold text-sm mb-1">{achieve.achievement_name}</p>
                <p className="text-xs text-gray-400">{achieve.achievement_description}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(achieve.unlock_date).toLocaleDateString('pl-PL')}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 py-8">
            Brak zdobytych osiągnięć
          </div>
        )}
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/achievements"
          className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition inline-block flex items-center justify-center w-full font-semibold"
        >
          <FaTrophy className="mr-2" /> Zobacz wszystkie osiągnięcia
        </Link>
      </div>
    </div>
  );
} 