import RecentNews from "./_components/RecentNews";
import FavoriteStockRelatedNews from "./_components/FavoriteStockRelatedNews";
import PopularNews from "@/components/news/PopularNews";

export const dynamic = "force-dynamic";

export default function NewsHome() {
  return (
    <>
      <div className="max-w-[1200px] pt-14 pb-20 overflow-hidden">
        <PopularNews />
        <FavoriteStockRelatedNews />
        <RecentNews />
      </div>
    </>
  );
}
