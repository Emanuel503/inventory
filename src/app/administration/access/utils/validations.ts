import { z } from "zod";

export const idRolSchema = z.object({
    idRol: z
        .string()
        .trim()
        .min(1, " El rol es requerido")
});

export const idMenuSchema = z.object({
    idMenu: z
        .string()
        .trim()
        .min(1, " El menu es requerido")
});

export const idSchema = z.object({
    id: z
        .string()
        .trim()
        .min(1, " El id es requerido")
});