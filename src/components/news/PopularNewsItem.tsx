import Image from "next/image";
import Link from "next/link";

import BodyFont from "@/common/BodyFont";
import CardWrap from "@/common/CardWrap";
import LOGO_LIGHT from "../../../public/images/logo/LOGO_Light.svg";
import { getFormattedDate } from "@/service/news/setTimestampToDate";

export default async function PopularNewsItem(props: any) {
  const { headLine, contents, media, image, newsId, creationTime, index } = props;

  return (
    <>
      <CardWrap
        width="100%"
        height="100%"
        padding={false}
        className="overflow-hidden relative before:absolute before:inset-x-0 before:bottom-0 before:h-3/4 before:bg-gradient-to-t before:from-[#3f3f3f]"
      >
        <Link href={`/news/${newsId}`} className="h-full block">
          <div className="h-full">
            {image ? (
              <Image
                src={image}
                width={590}
                height={index === 0 ? 420 : 210}
                alt=""
                className="w-full h-full object-cover object-center"
                priority
              />
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <Image src={LOGO_LIGHT} alt="아잇나우 로고" width={183} height={65} className="h-auto" />
              </div>
            )}
          </div>
          <div className="absolute inset-x-0 bottom-0 text-white p-6 z-1">
            <BodyFont level="1" weight="bold" className="mb-[14px]">
              {headLine}
            </BodyFont>
            {index === 0 && (
              <BodyFont level="5" weight="medium" className="line-clamp-2 mb-[14px]">
                {contents}
              </BodyFont>
            )}
            <aside className="flex gap-2 before:content-['∙'] before:order-2">
              <BodyFont level="5" weight="medium" className="order-1">
                {getFormattedDate(creationTime)}
              </BodyFont>
              <BodyFont level="5" weight="medium" className="order-3">
                {media}
              </BodyFont>
            </aside>
          </div>
        </Link>
      </CardWrap>
    </>
  );
}
