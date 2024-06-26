"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { FormEvent } from "react";
import { createFromage } from "@/actions/fromages";
import { useFormState } from "react-dom";
import { ButtonForm } from "@/components/ui/button-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fromageSchema } from "@/schemas/fromages";
import { z } from "zod";
import { storage } from "@/lib/firebase-web";
import {
  UploadResult,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useSession } from "@/store/useAuth";

export default function Dashboard() {
  /*const [state, action] = useFormState(createFromage, null);
  console.log(state);*/
  const session = useSession();

  console.log("session", session);

  const customOnSubmit = async (data: z.infer<typeof fromageSchema>) => {
    console.log(formState);

    const demo = await createFromage({
      title: data.title,
      rating: data.rating,
    });
    console.log(demo);
  };

  const { register, handleSubmit, formState } = useForm<
    z.infer<typeof fromageSchema>
  >({
    resolver: zodResolver(fromageSchema),
  });
  console.log(formState.errors);

  const uploadImageToFirebaseStorage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "wine");
    const generatedImageName = `${Date.now()}-${file.name}`;
    const wineImageRef = ref(storage, `wines/${generatedImageName}`);
    uploadBytes(wineImageRef, file).then((response: UploadResult) => {
      console.log("Image uploaded successfully");
      console.log("response", response);
      getDownloadURL(wineImageRef).then((url) => {
        console.log("url", url);
      });
    });
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <Card x-chunk="dashboard-04-chunk-2">
          <CardHeader>
            <CardTitle>Plugins Directory</CardTitle>
            <button
              type="button"
              className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
              onClick={() => {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = "image/*";
                input.onchange = (e) => {
                  const files = (e.target as HTMLInputElement).files;
                  if (files && files.length) {
                    uploadImageToFirebaseStorage(files[0]);
                  }
                };
                input.click();
              }}
            >
              <span className="sr-only">Upload</span>
            </button>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit(customOnSubmit)}
              className="flex flex-col gap-4"
            >
              <Input {...register("title", {})} required />
              <Input
                {...register("rating", {
                  valueAsNumber: true,
                })}
                type="number"
                required
              />
              {formState.errors.title && (
                <p className="text-red-500">{formState.errors.title.message}</p>
              )}
              {formState.errors.rating && (
                <p className="text-red-500">
                  {formState.errors.rating.message}
                </p>
              )}
              <ButtonForm>Save</ButtonForm>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
