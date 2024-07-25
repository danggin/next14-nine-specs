import BodyFont from "@/common/BodyFont";
import ListWrap from "@/common/ListWrap";
import { StockInfo } from "@/components/Report/type/report/stockType";
import StockItem from "@/common/StockItem/StockItem";

export default function RelatedStock({ stockList }: { stockList: StockInfo[] }) {
  return (
    <>
      <ListWrap width="382px" height="auto" padding="md" className="flex flex-col gap-5">
        <BodyFont level="3" weight="bold" className="text-primary-900">
          현재 뉴스와 관련된 주식
        </BodyFont>
        <ul>
          {stockList.map((stock) => (
            <li key={stock.code} className="mb-5 last:mb-0">
              <StockItem size="md" {...stock} />
            </li>
          ))}
        </ul>
      </ListWrap>
    </>
  );
}
