import { reportGptPrompt } from "@/constants/report/reportGptPrompt";

export const fetchReportGptReply = async (code: string) => {
  const { system, message } = await reportGptPrompt(code);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/report/gptReplyStore`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      system,
      message,
      code,
    }),
    cache: "no-store",
  });
  const responseMessage = await res.json(); 
  return responseMessage;
};
