import type { StockReport } from "../type/report/stockType";
import { RenderStockReport } from "./RenderStockReport";
import { fetchReportGptReply } from "@/service/report/fetchReportGptReply";

interface Props {
  code: string;
}
export default async function StockReport({ code }: Props) {
  if (!code) return null;
  const responseMessage = await fetchReportGptReply(code);
  const { overallScore, scores } = responseMessage;
  return <RenderStockReport scores={scores} overallScore={overallScore} />;
}
