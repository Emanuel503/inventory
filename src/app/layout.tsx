import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";
import { decrypt } from "./login/utils/session";
import Sliderbar from "./components/Sliderbar";

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

  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {
          session?.userId 
          ? <Sliderbar>{children}</Sliderbar>
          : children
        }
      </body>
    </html>
  );
}
