"use client";
import BodyFont from "@/common/BodyFont";
import { LanguageButton } from "@/common/LanguageButton";
import SideBar from "../_components/SideBar";
import { useEffect, useState } from "react";
import loadingSpinner from "/public/images/loading/loadingSpiner.gif";
import Image from "next/image";
import { BASE_URL } from "@/constants";

export default function Language() {
  const [lang, setLang] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMyStocks = async () => {
      try {
        const result = await (
          await fetch(`${BASE_URL}/api/profile`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          })
        ).json();
        console.log(result.data.language);
        setLang(result.data.language);
      } catch (error) {
        console.log("에러발생:" + error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMyStocks();
  }, []);

  return (
    <div className=" w-[1200px] min-h-[720px] flex gap-[27px] mt-[20px] mb-[112px]">
      {/* 사이드바 */}
      <SideBar menu="language" />
      {/* 우측 영역 */}
      <div className="w-[888px] h-[720px] bg-grayscale-0 rounded-[16px] p-[32px]">
        {isLoading ? (
          <div className="w-full items-center h-full flex justify-center">
            <Image src={loadingSpinner} alt="Loading" width={85} height={85} />
          </div>
        ) : (
          <>
            <div className=" w-full h-full flex flex-col flex-grow gap-6">
              <div className="flex flex-col">
                <BodyFont level="2" weight="bold" className="text-primary-900">
                  언어 설정
                </BodyFont>
                <BodyFont level="4" weight="regular" className="text-gray-900 mt-2">
                  이 설정에서 번역할 언어 선택하시면 뉴스에서 번역된 기사를 확인하실 수 있습니다.
                </BodyFont>
              </div>
              <div className="flex justify-between">
                <LanguageButton country="USA" lang={lang} setLang={setLang} />
                <LanguageButton country="CH" lang={lang} setLang={setLang} />
                <LanguageButton country="JP" lang={lang} setLang={setLang} />
                <LanguageButton country="FR" lang={lang} setLang={setLang} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
