import { firestore } from "@/firebase/firebaseConfig";

import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  limit,
  orderBy,
  Query,
  query,
  Timestamp,
} from "firebase/firestore";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category");
  const limitParams = searchParams.get("limit");

  if (!category) {
    return Response.json({ error: "'sort' 쿼리 매개변수가 누락되었습니다." }, { status: 400 });
  }

  const newsDocRef = doc(firestore, "news", category);
  try {
    const newsDoc = await getDoc(newsDocRef);
    if (newsDoc.exists()) {
      // 하위 컬렉션 접근
      const newsArticles = collection(newsDocRef, "articles");

      // limit이 지정되어 있으면 query에 limit 추가
      let articlesQuery: Query<DocumentData> = newsArticles;
      if (limitParams) {
        articlesQuery = query(newsArticles, orderBy("creationTime", "desc"), limit(parseInt(limitParams, 10)));
      }

      const subCollectionSnapshot = await getDocs(articlesQuery);

      const news = subCollectionSnapshot.docs.map((doc) => doc.data());

      return Response.json(news);
    } else {
      console.log("해당 문서가 없습니다.");
    }
  } catch (error) {
    console.log("문서 가져오기 오류:", error);
  }
}
