import { firestore } from "@/firebase/firebaseConfig";
import { collectionGroup, getDocs, query, where } from "firebase/firestore";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  try {
    // 'articles' 컬렉션 그룹에서 특정 newsId로 문서 검색
    const q = query(collectionGroup(firestore, "articles"), where("newsId", "==", id));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docData = querySnapshot.docs[0].data();
      return new Response(JSON.stringify(docData), {
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
