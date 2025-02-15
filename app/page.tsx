'use client'

import InfoBox from "@/components/InfoBox";
import MainBanner from "@/components/MainBanner";
import RankingList from "@/components/RankingList";

export default function Home() {
  return (
    <div className="flex flex-col sm:flex-row w-full px-4 sm:px-6 gap-6">
      
      {/* 🔥 Ranking na lewo */}
      <div className="w-full sm:w-2/6 max-lg:hidden">
        <RankingList />
      </div>

      {/* 🔥 MainBanner + InfoBox w kolumnie po prawej */}
      <div className="flex flex-col items-center space-y-6">
        <MainBanner />
        <InfoBox />
      </div>
      
    </div>
  );
}
