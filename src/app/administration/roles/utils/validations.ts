import { z } from "zod";

export const rolSchema = z.object({
  rol: z
    .string()
    .max(15, {message: "El rol debe contener 15 caracteres como maximo."})
    .min(3, {message: "El rol debe contener 3 caracteres como minimo."})
    .trim()
    .toLowerCase()
    .regex(/^[a-zA-Z]+$/, { message: "El rol solo puede contener letras." })
});

export const descriptionSchema = z.object({
   description: z
    .string()
    .min(3, { message: "La descripción debe contener 3 caracteres como minimo." })
    .max(255, {message: "La descripción debe contener 255 caracteres como maximo."})
    .trim(),
});

export const idSchema = z.object({
  id: z
   .string()
   .trim(),
});