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

  const cookie = (await cookies()).get("session")?.value;
  const session = cookie ? await decrypt(cookie): null;

  const menus = await prisma.menus.findMany({
    where: { 
        menu: true,
        AND:{
            idFather: null, 
        }
    },
    orderBy: {
      id: "asc"
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
          session?.user 
          ? <Sliderbar menus={menus} appName={appName} companyName={companyName}>
              {children} 
              <Toaster position="top-right" richColors />
            </Sliderbar>
          : children
        }
      </body>
    </html>
  );
}
