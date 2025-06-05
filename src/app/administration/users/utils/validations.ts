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

export const passwordSchema = z.object({
  password: z
    .string()
    .trim()
    .optional()
    .superRefine((value, ctx) => {
      if (value) {
        if (value.length < 8) {
          ctx.addIssue({
            code: z.ZodIssueCode.too_small,
            type: 'string',
            minimum: 8,
            inclusive: true,
            message: 'La contraseña debe contener al menos 8 caracteres.',
          });
        }

        if (value.length > 20) {
          ctx.addIssue({
            code: z.ZodIssueCode.too_big,
            type: 'string',
            maximum: 20,
            inclusive: true,
            message: 'La contraseña debe contener como máximo 20 caracteres.',
          });
        }

        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/.test(value)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.',
          });
        }
      }
    }),
});

export const confirmPasswordSchema = z.object({
    confirm_password: z
        .string()
        .optional(),
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

export const idSchema = z.object({
    id: z
        .string()
        .trim()
        .min(1, " El id es requerido")
});

export const imageSchema = z.object({
    image: z
        .any()
        .optional()
});

export const idUserSchema = z.object({
    idUser: z
        .string()
        .trim()
        .min(1, " El id del usuario es requerido")
});

export const oldPasswordSchema = z.object({
  oldPassword: z
    .string()
    .trim()
    .min(1, "La contraseña actual es requerida")
});

export const passwordChangeSchema = z.object({
  password: z
    .string()
    .max(20, " La contraseña debe contener 255 caracteres como maximo.")
    .min(8, " La contraseña debe contener 3 caracteres como minimo.")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/, 
      { message: " La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial."}
    )
    .trim()
});

export const confirmPasswordChangeSchema = z.object({
  confirm_password: z
    .string()
    .min(1, "La confirmacion de la contraseña es requerida")
    .trim()
});