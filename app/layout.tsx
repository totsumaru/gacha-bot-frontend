import './globals.css'
import React from "react";
import { Providers } from "@/app/providers";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Gacha-bot',
  description: "ガチャを回そう！Discordで使えるガチャボットです。",
  openGraph: {
    images: {
      url: `${process.env.NEXT_PUBLIC_FE_URL}/ogp.png`,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Gacha-bot",
    description: "ガチャを回そう！Discordで使えるガチャボットです。",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
