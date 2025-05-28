import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/login/utils/session";
import { ResponseData } from "./app/types";

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const ignoredRoutes = ["/_next", "/favicon.ico", "/robots.txt", "/.well-known", "/api/session"];

  const AppUrl =  process.env.APP_URL as string;
  const AppPort =  process.env.APP_PORT as string;

  // Ignorar rutas internas del sistema
  if (ignoredRoutes.some((route) => path.startsWith(route))) {
    return NextResponse.next();
  }

  const cookie = (await cookies()).get("session")?.value;
  const session = cookie ? await decrypt(cookie) : null;
  
  const isAuthenticated = !!session?.user;
  
  // Si no esta autenticado
  if (!isAuthenticated && path != '/login') {
    request.nextUrl.pathname = "/login";
    return NextResponse.redirect(request.nextUrl);
  }

  // Si autenticado pero intenta acceder al login
  if (isAuthenticated && path == '/login') {
    request.nextUrl.pathname = "/dashboard";
    return NextResponse.redirect(request.nextUrl);
  }

  // Si autenticado pero no tiene permiso a esa ruta y no es administrador
  if (isAuthenticated && !session.access.some((allowedPath: string) => path.startsWith(allowedPath)) && session.user.idRol != 1) {
    request.nextUrl.pathname = "/dashboard";
    return NextResponse.redirect(request.nextUrl);
  }

  //Validacion del token de sesion
  if (isAuthenticated) {
    const res = await fetch(`${AppUrl}:${AppPort}/api/session`, {
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
      cache: 'no-store',
    });

    const data: ResponseData = await res.json();
    if(!data.valid){

      (await cookies()).delete("session");
      request.nextUrl.pathname = "/login";
      return NextResponse.redirect(request.nextUrl);
    }
  }

  return NextResponse.next();
}