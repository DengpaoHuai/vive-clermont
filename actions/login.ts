import { auth } from "@/lib/firebase-web";
import { action } from "@/lib/safe-action";
import { signInWithEmailAndPassword } from "firebase/auth";
import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const login = action(LoginSchema, async ({ email, password }) => {
  return signInWithEmailAndPassword(auth, email, password);
});
