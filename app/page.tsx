'use client'

import InfoBox from "@/components/InfoBox";
import MainBanner from "@/components/MainBanner";
import RankingList from "@/components/RankingList";

export default function Home() {
  return (
    <div className="container mx-auto px-4 sm:px-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* 🔥 Ranking na lewo */}
        <div className="w-full lg:w-auto max-lg:hidden flex-shrink-0">
          <RankingList />
        </div>

        {/* 🔥 MainBanner + InfoBox w kolumnie po prawej */}
        <div className="flex-1 flex flex-col items-center space-y-6">
          <MainBanner />
          <InfoBox />
        </div>
      </div>
    </div>
  );
}
