import RecentNews from "./_components/RecentNews";
import FavoriteStockRelatedNews from "./_components/FavoriteStockRelatedNews";
import PopularNews from "@/components/news/PopularNews";
import { getSession } from "@/lib/getSession";
import { getMainNews } from "@/service/news/crawler/getMainNews";
import { getPopularNews } from "@/service/news/crawler/getPopularNews";
import { getRecentNews } from "@/service/news/crawler/getRecentNews";
import { getStockWorldNews } from "@/service/news/crawler/getStockWorldNews";

export const dynamic = "force-dynamic";

export default async function NewsHome() {
  const session = await getSession();
  const userId = session?.user?.id || "";
  const type = "all";

  //   getMainNews();
  //   getPopularNews();
  //   getRecentNews();
  //   getStockWorldNews();

  return (
    <>
      <div className="max-w-[1200px] pt-14 pb-20 overflow-hidden">
        <PopularNews type={type} />
        <FavoriteStockRelatedNews userId={userId} />
        <RecentNews />
      </div>
    </>
  );
}
