import { db } from "@/lib/firebase-web";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export const GET = async () => {
  console.log("stp ");
  const fromages = await getDocs(collection(db, "fromages"));
  return NextResponse.json({
    fromages: fromages.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })),
  });
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
