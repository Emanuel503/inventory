'use only server'

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";
import { decrypt } from "./login/utils/session";
import Sliderbar from "./components/Sliderbar";
import { Toaster } from "sonner";
import { prisma } from "@/utils/prisma";

const appName =  process.env.APP_NAME as string;
const appDescription =  process.env.APP_DESCRIPTION as string;
const companyName =  process.env.COMPANY_NAME as string;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${appName}`,
  description: `${appDescription}`,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  let menus = null;
  const cookie = (await cookies()).get("session")?.value;
  const session = cookie ? await decrypt(cookie): null;

  const access = await prisma.access.findMany({
    include: {
      menu: {
        select:{
          menu: true
        }
      }
    },
    where:{
      idRol: session?.user.idRol,
      menu: {
        idFather: null,
        showMenu: true
      }
    }
  })

  const idsMenus = access.map((menu) => (
    menu.idMenu
  ))

  if(session?.user.idRol == 1){
    menus = await prisma.menus.findMany({
      where: { 
          menu: true,
          idFather: null,
          showMenu: true
      },
      orderBy: {
        id: "asc"
      },
      include: {
        children: true
      }
    })
  }else{
     menus = await prisma.menus.findMany({
      where: { 
          menu: true,
          idFather: null,
          id:{
            in: idsMenus
          } 
      },
      orderBy: {
        id: "asc"
      },
      include: {
        children: true
      }
    })
  }  

  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {
          session?.user 
          ? <Sliderbar menus={menus} appName={appName} companyName={companyName} user={session.user}>
              {children} 
              <Toaster position="top-right" richColors />
            </Sliderbar>
          : children
        }
      </body>
    </html>
  );
}
