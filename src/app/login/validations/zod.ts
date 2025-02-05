import { z } from "zod";

export const emailSchema = z.object({
  email: z.string().email({ message: "Email invalido" }).trim(),
});

export const passwordSchema = z.object({
  password: z
    .string()
    .min(8, { message: "La contraseña debe contener 8 caracteres" })
    .trim(),
});