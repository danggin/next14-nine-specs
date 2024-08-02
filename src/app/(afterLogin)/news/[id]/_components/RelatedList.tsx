import RelatedStock from "./RelatedStock";
import RelatedNews from "./RelatedNews";
import { StockInfo } from "@/components/Report/type/report/stockType";
import BodyFont from "@/common/BodyFont";
import { NewsResponse } from "@/types/news";

export default function RelatedList({ stockList, relatedStocks }: { stockList: StockInfo[]; relatedStocks: string[] }) {
  return (
    <>
      <div className="flex flex-col gap-5">
        <RelatedStock stockList={stockList} />
        <RelatedNews relatedStocks={relatedStocks} />
      </div>
    </>
  );
}
