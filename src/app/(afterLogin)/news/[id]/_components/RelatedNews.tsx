import BodyFont from "@/common/BodyFont";
import ListWrap from "@/common/ListWrap";
import RelatedNewsItem from "./RelatedNewsItem";
import { BASE_URL } from "@/constants";
import { NewsResponse } from "@/types/news";

export default async function RelatedNews({ relatedStocks }: { relatedStocks: string[] }) {
  let news = [];

  if (relatedStocks) {
    news = await (
      await fetch(`${BASE_URL}/api/news/related`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ relatedStocks }),
      })
    ).json();
  }

  return (
    <>
      <ListWrap width="382px" height="auto" padding="md" className="flex flex-col gap-5">
        <BodyFont level="3" weight="bold" className="text-primary-900">
          관련 기사
        </BodyFont>
        {news.length > 0 ? (
          <ul>
            {news.map((item: NewsResponse) => (
              <li
                key={item.newsId}
                className="border-b border-grayscale-400 pb-[14px] mb-[14px] last:border-none last:pb-0 last:mb-0"
              >
                <RelatedNewsItem {...item} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex justify-center items-center min-h-[200px]">
            <p>관련 기사가 없습니다.</p>
          </div>
        )}
      </ListWrap>
    </>
  );
}
