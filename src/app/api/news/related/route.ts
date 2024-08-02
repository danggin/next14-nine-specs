import { firestore } from "@/firebase/firebaseConfig";
import { collectionGroup, getDocs, limit, orderBy, query, where } from "firebase/firestore";

export async function POST(request: Request) {
  const { relatedStocks } = await request.json();

  try {
    // 'articles' 컬렉션 그룹에서 relatedStocks 문서 검색
    const q = query(
      collectionGroup(firestore, "articles"),
      where("relatedStocks", "array-contains-any", relatedStocks),
      orderBy("creationTime", "desc"),
      limit(3),
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const categoryNews = querySnapshot.docs.map((doc) => doc.data());

      return new Response(JSON.stringify(categoryNews), {
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
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch news" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
