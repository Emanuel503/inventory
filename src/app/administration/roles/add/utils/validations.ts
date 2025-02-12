import { z } from "zod";

export const rolSchema = z.object({
  rol: z
    .string()
    .max(15, {message: "El rol debe contener 15 caracteres como maximo."})
    .min(3, {message: "El rol debe contener 3 caracteres como minimo."})
    .trim()
});

export const descriptionSchema = z.object({
   description: z
    .string()
    .min(3, { message: "La descripción debe contener 3 caracteres como minimo." })
    .max(255, {message: "La descripción debe contener 255 caracteres como maximo."})
    .trim(),
});