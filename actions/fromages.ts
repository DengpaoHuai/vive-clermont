"use server";

import { action } from "@/lib/safe-action";
import { fromageSchema } from "@/schemas/fromages";
import z from "zod";

export const createFromage = action(fromageSchema, async ({ title }) => {
  await sleep(2000);
  console.log(title);
  return {
    title,
  };
});

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
