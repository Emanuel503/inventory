import { z } from "zod";

export const namesSchema = z.object({
    names: z
        .string()
        .max(255, " El nombre debe contener 255 caracteres como maximo.")
        .min(3, " El nombre debe contener 3 caracteres como minimo.")
        .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, { message: " Solo se permiten letras."})
        .trim(),
});

export const surnamesSchema = z.object({
    surnames: z
        .string()
        .max(255, " El nombre debe contener 255 caracteres como maximo.")
        .min(3, " El nombre debe contener 3 caracteres como minimo.")
        .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, { message: " Solo se permiten letras."})
        .trim(),
});

export const emailSchema = z.object({
    email: z
        .string()
        .email({ message: " Email no invalido" })
        .trim(),
});

export const usernameSchema = z.object({
    username: z
        .string()
        .max(20, " El nombre de usuario debe contener 20 caracteres como maximo.")
        .min(3, " El nombre debe contener 3 caracteres como minimo.")
        .regex(/^[a-zA-Z0-9](?!.*[_.]{2})[a-zA-Z0-9._]*[a-zA-Z0-9]$/, {
            message: " Solo se permiten letras, números, guiones bajos y puntos. No puede iniciar ni terminar con '.' o '_'.",
        })
        .trim()
});

export const idRolSchema = z.object({
    idRol: z
        .string()
        .trim()
        .min(1, " El rol es requerido")
});

export const enabledSchema = z.object({
    enabled: z
        .string()
        .optional()
});