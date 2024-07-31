import BodyFont from "@/common/BodyFont";
import dynamic from "next/dynamic";

const StockAreaChart = dynamic(() => import("../StockChart/StockAreaChart"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col  justify-center h-full items-center">
      <BodyFont level="5" weight="medium">
        통신 완료 차트 불러오는 중...
      </BodyFont>
    </div>
  ),
});
interface Props {
  code: string | undefined;
}
// 주식 차트 컴포넌트
export default async function StockChartLoader({ code }: Props) {
  if (!code) return null;
  const fetchData = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/report/chart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
    cache: "no-store",
  });
  const allData = await fetchData.json();

  return <StockAreaChart allData={allData} />;
}
