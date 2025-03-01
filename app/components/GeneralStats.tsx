interface GeneralStatsProps {
  achievements_count: number;
  money_spent_pln: number;
  join_date: string;
  last_seen: string;
}

const TOTAL_ACHIEVEMENTS = 60; // Całkowita liczba osiągnięć

export default function GeneralStats({ 
  achievements_count, 
  money_spent_pln, 
  join_date, 
  last_seen 
}: GeneralStatsProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Zdobyte osiągnięcia:</span>
            <span className="text-yellow-400 font-semibold">
              {achievements_count} / {TOTAL_ACHIEVEMENTS}
            </span>
          </div>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Wydane PLN:</span>
            <span className="text-green-400 font-semibold">
              {money_spent_pln} zł
            </span>
          </div>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Dołączył(a):</span>
            <span className="text-blue-400 font-semibold">
              {new Date(join_date).toLocaleDateString('pl-PL')}
            </span>
          </div>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Ostatnio online:</span>
            <span className="text-blue-400 font-semibold">
              {new Date(last_seen).toLocaleDateString('pl-PL')}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-400">Postęp osiągnięć</span>
          <span className="text-gray-400">
            {((achievements_count / TOTAL_ACHIEVEMENTS) * 100).toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div
            className="bg-yellow-500 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${(achievements_count / TOTAL_ACHIEVEMENTS) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
} 