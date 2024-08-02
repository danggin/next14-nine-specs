import Link from "next/link";
import BodyFont from "@/common/BodyFont";
import { getTimeAgo } from "@/service/news/setTimestampToDate";

export default function RelatedNewsItem(props: any) {
  const { headLine, media, newsId, creationTime } = props;

  return (
    <>
      <Link href={`/news/${newsId}`}>
        <div className="">
          <BodyFont level="4" weight="medium" className="mb-[14px] line-clamp-1 text-grayscale-900">
            {headLine}
          </BodyFont>

          <aside className="text-[13px] text-grayscale-600 flex gap-2 before:content-['∙'] before:order-2">
            <span className="order-1">{getTimeAgo(creationTime)}</span>
            <span className="order-3">{media}</span>
          </aside>
        </div>
      </Link>
    </>
  );
}
