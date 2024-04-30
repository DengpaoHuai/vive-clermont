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

export default function Dashboard() {
  /*const [state, action] = useFormState(createFromage, null);
  console.log(state);*/
  const customOnSubmit = async (data: z.infer<typeof fromageSchema>) => {
    const demo = await createFromage({
      title: data.title,
    });
    console.log(demo);
  };

  const { register, handleSubmit, formState } = useForm<
    z.infer<typeof fromageSchema>
  >({
    resolver: zodResolver(fromageSchema),
  });
  console.log(formState.errors);
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <Card x-chunk="dashboard-04-chunk-2">
          <CardHeader>
            <CardTitle>Plugins Directory</CardTitle>
            <CardDescription>
              The directory within your project, in which your plugins are
              located.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit(customOnSubmit)}
              className="flex flex-col gap-4"
            >
              <Input {...register("title", {})} required />
              <Input {...register("rating")} type="number" required />
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
