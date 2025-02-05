"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "./utils/actions";
import { LoginForm } from "./components/LoginForm";

export default function Login() {
  const [state, loginAction] = useActionState(login, undefined);

  return (
    // <form action={loginAction} className="flex max-w-[300px] flex-col gap-2">
    //   <div className="flex flex-col gap-2">
    //     <input id="email" name="email" placeholder="Email" />
    //   </div>
    //   {state?.errors?.email && (
    //     <p className="text-red-500">{state.errors.email}</p>
    //   )}

    //   <div className="flex flex-col gap-2">
    //     <input
    //       id="password"
    //       name="password"
    //       type="password"
    //       placeholder="Password"
    //     />
    //   </div>
    //   {state?.errors?.password && (
    //     <p className="text-red-500">{state.errors.password}</p>
    //   )}
    //   <SubmitButton />
    // </form>

    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>

  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit">
      Login
    </button>
  );
}