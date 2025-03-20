'use client'

import MainBanner from "@/components/MainBanner";
import RankingList from "@/components/RankingList";
import NewsList from "@/components/NewsList";

export default function Home() {
  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-6 xl:gap-8">
        {/* 🔥 Kolumna lewa: Ranking */}
        <div className="w-full lg:w-[400px] xl:w-[450px]">
          <RankingList />
        </div>

        {/* 🔥 Kolumna prawa: MainBanner + Aktualności */}
        <div className="flex-1 flex flex-col gap-6 xl:gap-8">
          <MainBanner />
          <NewsList />
        </div>
      </div>
    </div>
  );
}
