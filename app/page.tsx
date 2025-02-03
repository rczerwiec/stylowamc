import InfoBox from "@/components/InfoBox";
import MainBanner from "@/components/MainBanner";
import RankingList from "@/components/RankingList";

export default function Home() {
  return (
    <>
    <RankingList />
    <div className="flex-1 flex flex-col items-center px-6">
      <MainBanner />
      <InfoBox />
    </div>
    </>
  );
}
