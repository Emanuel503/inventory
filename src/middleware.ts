import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/login/utils/session";

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const ignoredRoutes = ["/_next", "/favicon.ico", "/robots.txt", "/.well-known"];

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

  // Si es admin
  if (isAuthenticated && session.user.idRol == 1) {
    request.nextUrl.pathname = "/dashboard";
    return NextResponse.next();
  }
  
  // Si autenticado pero intenta acceder al login
  if (isAuthenticated && path == '/login') {
    request.nextUrl.pathname = "/dashboard";
    return NextResponse.redirect(request.nextUrl);
  }

  // Si autenticado pero no tiene permiso a esa ruta
  if (isAuthenticated && !session.access.some((allowedPath: string) => path.startsWith(allowedPath))) {
    request.nextUrl.pathname = "/dashboard";
    return NextResponse.redirect(request.nextUrl);
  }

  return NextResponse.next();
}