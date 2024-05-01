"use server";

import { db } from "@/lib/firebase-web";
import { action } from "@/lib/safe-action";
import { fromageSchema } from "@/schemas/fromages";
import { Fromage } from "@/types/fromage";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

export const createFromage = action(
  fromageSchema,
  async ({ title, rating }) => {
    try {
      const docRef = await addDoc(collection(db, "fromages"), {
        title,
        rating,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    revalidatePath("/fromages");
    redirect("/fromages");
  }
);

/*
export const createFromage = async (previousState: any, formData: FormData) => {
  await sleep(2000);
  const data = fromageSchema.parse({
    title: formData.get("title") as string,
  });
  console.log("data");
  console.log(data);
  const title = formData.get("title") as string;
  console.log(title);
  return {
    title,
  };
};
*/

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getFromagesAction = async () => {
  await sleep(3000);
  const fromages = await getDocs(collection(db, "fromages"));
  return fromages.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const deleteItem = async (id: string) => {
  await deleteDoc(doc(db, `fromages/${id}`));

  revalidatePath("/fromages");
  return "okkkk";
};
