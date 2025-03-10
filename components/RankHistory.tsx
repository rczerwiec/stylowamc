interface RankHistoryProps {
  className?: string;
}

export default function RankHistory({ className = "" }: RankHistoryProps) {
  const ranks = [
    { rank: "Admin", from: "20.02.2025", to: "26.02.2025", color: "text-red-400", bgColor: "bg-red-400" },
    { rank: "J.Helper", from: "15.02.2025", to: "20.02.2025", color: "text-blue-400", bgColor: "bg-blue-400" },
    { rank: "ChatMod", from: "10.02.2025", to: "15.02.2025", color: "text-green-400", bgColor: "bg-green-400" },
    { rank: "SVIP", from: "05.02.2025", to: "10.02.2025", color: "text-purple-400", bgColor: "bg-purple-400" },
    { rank: "VIP", from: "01.02.2025", to: "05.02.2025", color: "text-pink-400", bgColor: "bg-pink-400" },
    { rank: "Gracz", from: "26.01.2025", to: "obecnie", color: "text-gray-300", bgColor: "bg-gray-300" }
  ];

  return (
    <div className={`mt-6 ${className}`}>
      <h4 className="text-lg font-semibold text-yellow-400 mb-3">Historia rang (w trakcie tworzenia)</h4>
      <div className="relative pl-6">
        <div className="absolute left-[9px] top-0 bottom-0 w-0.5 bg-gray-600"></div>
        {ranks.map((role, index) => (
          <div key={index} className="relative mb-4 last:mb-0">
            <div className={`absolute left-[-20px] w-4 h-4 rounded-full ${role.bgColor} border-2 border-gray-800 z-10`}></div>
            <div className="bg-gray-700 rounded-lg p-3 ml-2">
              <div className="flex flex-col">
                <span className={`font-bold ${role.color} text-base`}>
                  {role.rank}
                </span>
                <span className="text-xs text-gray-400">
                  {role.from} - {role.to}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 