import { getStockPrice } from "@/service/report/stockPriceApi";

interface AnalystResponse {
  message: string;
  system: string;
}

const system =
  "당신은 유능한 투자 전문가다 당신의 투자는 과거 주식 시세 데이터를 바탕으로 철저한 분석을 통해 답변합니다. 최대 응답 글자는 500 자 미만으로 답하여라. 응답데이타는 text 데이타 입니다";

export const gptAnalysisPrompt = async (code: string): Promise<AnalystResponse> => {
  const sixMonthsPrice = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/report/stockprice`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code, periodType: "month&range=6", stockExchangeType: "NASDAQ" }),
  });

  const message = `
종목: ${code}
해당 종목의 최근 6개월 가격 데이터:
${sixMonthsPrice}
응답 데이터:
1. 거래 데이터를 바탕으로 주식에 대한 [강력한 매수, 매수, 중립, 매도, 강력한 매도] 중 하나의 전문가 의견을 제시하세요.
2. 제공된 데이터를 기반으로 현재 주가를 표시하세요.
3. 적정 매수 주가를 제시하는 근거를 제시하세요. 
4. 최근 6개월 거래 내용을 근거로 적정 매수 주가를 제시하세요.
5. 기타 금융 분석가들의 의견을 포함한 종합적인 분석을 제공하세요.

예시:
${code}에 대한 투자 의견은 [투자 의견]입니다. 현재 주가는 [ 현재주가 ]달러이며, 지난 6개월 간의 거래 동향을 분석한 결과, 적정 매수 주가는 [ 적정가 ] 달러로 평가됩니다. 적정 매수 주가는 [적정 메수 주가 근거] 최근 6개월 동안의 주가 변동성과 거래량을 고려하여 산출되었습니다. 
${code}은 최근 신제품 발표를 통해 지속적으로 혁신을 이루고 있으며, 이로 인해 시장에서의 경쟁력을 더욱 [경쟁력 변화]하고 있습니다. 특히, 아이폰, 아이패드, 맥북 시리즈의 최신 업그레이드는 기존 소비자의 충성도를 강화하고, 신규 고객을 확보하는 데 크게 기여하고 있습니다. 
금융 분석가들은 ${code}의 강력한 브랜드 가치와 지속적인 제품 혁신이 주가 상승을 지지할 것이라고 평가하며, 다수의 분석가가 여전히 [매수] 등급을 유지하고 있습니다. 또한, ${code}의 서비스 부문, 특히 클라우드 서비스와 디지털 콘텐츠 서비스의 성장세도 주목받고 있습니다.
`;

  return { system, message };
};
