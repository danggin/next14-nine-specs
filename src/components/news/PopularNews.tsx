import { BASE_URL } from "@/constants";
import Title from "../../app/(afterLogin)/news/_ui/Title";
import { NewsResponse } from "@/types/news";
import PopularNewsItem from "./PopularNewsItem";

interface Props {
  data?: any;
  type: string;
}

export default async function PopularNews({ data = [], type }: Props) {
  let news: NewsResponse[] = [];

  if (type == "stock") {
    news = await (
      await fetch(`${BASE_URL}/api/news/stock`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      })
    ).json();
  }

  if (type == "all") {
    news = await (await fetch(`${BASE_URL}/api/news?category=popularNews&limit=3`)).json();
  }

  return (
    <>
      <section className="w-full mb-12">
        <Title title="오늘 인기있는 뉴스" />
        <ul className="grid grid-cols-2 grid-rows-2 gap-4 h-full max-h-[420px]">
          {news.map((item: NewsResponse, index: number) => (
            <li
              key={item.newsId}
              className={`${index === 0 ? "row-span-2 h-[420px]" : "h-[200px]"} ${index === 2 ? "col-start-2" : ""}`}
            >
              <PopularNewsItem {...item} index={index} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
