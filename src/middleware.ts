import { NextRequest, NextResponse } from "next/server";
import { ResponseData } from "./app/types";
import { cookies } from "next/headers";

const AppUrl =  process.env.APP_URL as string;
const AppPort =  process.env.APP_PORT as string;
const ignoredRoutes = ["/_next", "/favicon.ico", "/robots.txt", "/.well-known", "/api/session", "/public/uploads/"];

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const cookie = (await cookies()).get("session")?.value;

  // Ignorar rutas internas del sistema
  if (ignoredRoutes.some((route) => path.startsWith(route))) {
    return NextResponse.next();
  }

  //Obtenemos la sesion
  const res = await fetch(`${AppUrl}:${AppPort}/api/session`, {
      cache: 'no-store',
      headers: {
        Cookie: `session=${cookie}`,
    },
  });
  const { valid, session }: ResponseData = await res.json();
  
  if (valid && session?.user.twoFactorAuth && !session?.user.twoFactorConfirm && path != '/2fa') {
    request.nextUrl.pathname = "/2fa";
    return NextResponse.redirect(request.nextUrl);
  }
  
  // Si no esta autenticado
  if (!valid && path != '/login') {
    (await cookies()).delete("session");
    request.nextUrl.pathname = "/login";
    return NextResponse.redirect(request.nextUrl);
  }

  // Si autenticado pero intenta acceder al login o 2fa
  console.log(session);
  
  if ((valid && path == '/login') || (session?.user.twoFactorAuth && session?.user.twoFactorConfirm && path == '/2fa')) {
    request.nextUrl.pathname = "/dashboard";
    return NextResponse.redirect(request.nextUrl);
  }

  // // Si autenticado pero no tiene permiso a esa ruta y no es administrador
  if (valid && session!.user.idRol != 1 && !session!.access.some((allowedPath: string) => path.startsWith(allowedPath))) {
    request.nextUrl.pathname = "/dashboard";
    return NextResponse.redirect(request.nextUrl);
  }

  return NextResponse.next();
}