import './globals.css'
import React from "react";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Gacha-bot',
  description: 'ガチャを回そう！',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className="">
      <body className="">
        <main className="">
          {children}
        </main>
      </body>
    </html>
  )
}
