import BodyFont from "@/common/BodyFont";
import { StockInfo } from "../type/report/stockType";
import { gptAnalysisPrompt } from "@/constants/analysisPrompt/gptAnalysis";

interface Props {
  stockInfo: StockInfo | undefined;
}
export default async function StockGptAnalysisReply({ stockInfo }: Props) {
  if (!stockInfo) return null;
  const { code } = stockInfo;
  const { system, message } = await gptAnalysisPrompt(code);
  const getFetch = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/gpt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      system,
      message,
    }),
    cache: "no-store",
  });

  const data = await getFetch.json();

  return (
    <div className="overflow-hidden hover:overflow-y-scroll h-[100px] ">
      <div className="w-[670px] pr-1.5">
        <BodyFont level="4" weight="medium">
          {data}
        </BodyFont>
      </div>
    </div>
  );
}
