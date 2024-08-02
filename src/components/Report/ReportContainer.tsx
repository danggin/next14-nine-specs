import CardWrap from "@/common/CardWrap";
import StockHeader from "./StockHeader/StockHeader";
import StockChartContainer from "./StockChart/StockChartContainer";
import StockSumaryContainer from "./StockSumary/StockSummaryContainer";
import StockReportContainer from "./StockReport/StockReportContainer";
import StockAnalysis from "./StockAnalysis/StockAnalysis";
import { StockInfo } from "./type/report/stockType";
import PopularNews from "../news/PopularNews";
import { Suspense } from "react";

interface Props {
  stockInfo: StockInfo | undefined;
}

/**
 * 메인 페이지
 * @returns
 */
export default async function ReportContainer({ stockInfo }: Props) {
  if (!stockInfo) return null;
  const { code } = stockInfo;
  const type = "stock";
  return (
    <div className=" w-[1200px] mx-auto py-12  ">
      <div className="flex flex-col flex-wrap gap-6">
        {/* 주식  헤더 영역  */}
        <StockHeader stockInfo={stockInfo} />
        {/* 첫번째 줄 */}
        <article className="flex justify-between flex-wrap ">
          <CardWrap width="488px" height="256px" padding>
            <StockSumaryContainer stockInfo={stockInfo} />
          </CardWrap>
          <CardWrap width="690px" height="256px" padding>
            <StockChartContainer code={code} />
          </CardWrap>
        </article>

        {/* 두번째 줄 */}
        <article className="flex justify-between flex-wrap">
          <CardWrap width="429px" height="297px" padding>
            <StockReportContainer code={code} />
          </CardWrap>
          <CardWrap width="750px" height="297px" padding>
            <StockAnalysis stockInfo={stockInfo} />
          </CardWrap>
        </article>
        <Suspense fallback={<div>뉴스 로딩중...</div>}>
          <PopularNews data={code} type={type} />
        </Suspense>
      </div>
    </div>
  );
}
