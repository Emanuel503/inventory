import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";
import { decrypt } from "./login/utils/session";
import Sliderbar from "./components/Sliderbar";
import { Toaster } from "sonner";
import { prisma } from "@/utils/prisma";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inventario",
  description: "Sistema de inventario",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookie = (await cookies()).get("session")?.value;
  const session = cookie ? await decrypt(cookie): null;

  const menus = await prisma.menus.findMany({
    where: { 
        menu: true,
        AND:{
            idFather: null, 
        }
    },
    include: {
      children: true
    }
 })

  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {
          session?.userId 
          ? <Sliderbar menus={menus}>
              {children} 
              <Toaster position="top-right" richColors />
            </Sliderbar>
          : children
        }
      </body>
    </html>
  );
}
