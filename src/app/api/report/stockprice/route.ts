import { getStockPrice } from "@/service/report/stockPriceApi";

export async function POST(request: Request) {
  const { code, periodType, stockExchangeType } = await request.json();
  const stockPrice = await getStockPrice(code, periodType, stockExchangeType);
  return new Response(JSON.stringify({ stockPrice }));
}
