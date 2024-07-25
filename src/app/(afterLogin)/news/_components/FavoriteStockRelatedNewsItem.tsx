import Image from "next/image";

import BodyFont from "@/common/BodyFont";
import CardWrap from "@/common/CardWrap";
import MoreButton from "../_ui/MoreButton";
import { getTimeAgo } from "@/service/news/setTimestampToDate";
import CaptionFont from "@/common/CaptionFont";
import { NewsResponse } from "@/types/news";

export default function FavoriteStockRelatedNewsItem(props: NewsResponse) {
  const { headLine, media, image, creationTime, newsId } = props;

  return (
    <>
      <CardWrap className="overflow-hidden" width="100%" height="420" padding={false}>
        <div className="w-auto h-[230px] overflow-hidden">
          {image ? (
            <Image src={image} width={388} height={236} alt="" className="object-cover object-center h-auto" />
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <CaptionFont weight="regular">관련 이미지가 없습니다.</CaptionFont>
            </div>
          )}
        </div>
        <div className="px-6 pt-4 pb-6">
          <BodyFont level="3" weight="medium" className="text-primary-900 min-h-[60px] line-clamp-2">
            {headLine}
          </BodyFont>
          <aside className="flex justify-between pt-2 text-grayscale-600">
            <BodyFont level="5" weight="medium">
              {getTimeAgo(creationTime)} ∙ {media}
            </BodyFont>
            <MoreButton newsId={newsId} />
          </aside>
        </div>
      </CardWrap>
    </>
  );
}
