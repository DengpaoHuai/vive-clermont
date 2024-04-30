import { zod } from "@/lib/zod-i18n";

export const fromageSchema = zod.object({
  title: zod.string().min(3).max(255),
  rating: zod.number().int().min(1).max(5),
});
