import { firestore } from "@/firebase/firebaseConfig";
import { collectionGroup, getDocs, limit, orderBy, query, where } from "firebase/firestore";

export async function POST(request: Request) {
  const { data } = await request.json();

  const stockQuery = query(collectionGroup(firestore, "stockList"), where("code", "==", data));

  try {
    const stocks = await getDocs(stockQuery);

    if (!stocks.empty) {
      const stock = stocks.docs.map((doc) => doc.data().ticker);

      // 'articles' 컬렉션 그룹에서 relatedStocks로 문서 검색
      const q = query(
        collectionGroup(firestore, "articles"),
        where("relatedStocks", "array-contains-any", stock),
        // orderBy("creationTime", "desc"),
        limit(3),
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const stockRelatedNews = querySnapshot.docs.map((doc) => doc.data());

        return new Response(JSON.stringify(stockRelatedNews), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        return new Response(JSON.stringify({ message: "No related news articles found" }), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch news" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
