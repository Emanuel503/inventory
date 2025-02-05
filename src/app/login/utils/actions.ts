"use server";

import { emailSchema, passwordSchema } from "../validations/zod";
import { createSession, deleteSession } from "./session";
import { redirect } from "next/navigation";

const testUser = {
  id: "1",
  email: "emanueljosemolina@gmail.com",
  password: "12345678",
};

const loginSchema = emailSchema.merge(passwordSchema);

export async function login(prevState: unknown, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  //TODO: Validar el usuario con la base de datos
  if (email !== testUser.email || password !== testUser.password) {
    return {
      errors: {
        email: ["Correo o contraseña incorrectos"],
      },
    };
  }

  await createSession(testUser.id);

  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}