import { FaMedal } from "react-icons/fa";

const RankingList = () => (
  <aside className="w-2/7 p-6 bg-[#1A1A1A] rounded-xl border border-gray-700 shadow-strong font-alegreya-sans">
    <h2 className="text-xl font-bold mb-4 text-primary flex items-center">
      <FaMedal className="mr-2 text-yellow-400" /> Ranking
    </h2>
    <ul className="space-y-3">
      {[
        { name: "Stylowy", amount: "15 PLN" },
        { name: "Notch", amount: "14 PLN" },
        { name: "Blowek", amount: "13 PLN" },
        { name: "Herobrine", amount: "12 PLN" },
        { name: "Rezigiusz", amount: "11 PLN" },
        { name: "MinecraftPL", amount: "10 PLN" },
        { name: "JJayJoker", amount: "9 PLN" },
        { name: "Freeze", amount: "8 PLN" },
        { name: "MrBeast", amount: "7 PLN" },
      ].map((player, index) => (
        <li key={index} className="flex gap-1 items-center justify-between bg-gray-800 px-4 py-2 rounded-lg shadow-md">
          <div className="flex items-center space-x-3 gap-1">
            <img
              src={`https://minotar.net/avatar/${player.name}/32`}
              alt={player.name}
              className="w-8 h-8 rounded-md"
            />
            <span className="text-text-light font-medium">{index + 1}. {player.name}</span>
          </div>
          <span className="text-primary font-bold">{player.amount}</span>
        </li>
      ))}
    </ul>
  </aside>
);

export default RankingList;
