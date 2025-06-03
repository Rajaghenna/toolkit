import type React from "react";
import { Inter } from "next/font/google";
import Script from "next/script";
import ClientOnly from "@/components/ClientOnly";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CricketON Editor",
  description: "Editor u loves",
};

export default function ImageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <head>
        <Script
          src="https://evanw.github.io/glfx.js/glfx.js"
          strategy="afterInteractive"
        />
      </head>
      <ClientOnly>
        <section className={inter.className}>{children}</section>
      </ClientOnly>
    </>
  );
}
