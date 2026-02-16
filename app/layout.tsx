import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { client } from "../lib/sanity";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gempa Tanıtım",
  description: "Gempa dijital web altyapısı",
};

async function getNavigation() {
  return client.fetch(`*[_type == "navigation"][0]`)
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nav = await getNavigation();

  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header
          style={{
            padding: "20px 40px",
            borderBottom: "1px solid #222",
            display: "flex",
            gap: "20px",
          }}
        >
          {nav?.items?.map((item: any) => (
            <a
              key={item._key}
              href={item.href}
              style={{
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              {item.title}
            </a>
          ))}
        </header>

        {children}
      </body>
    </html>
  );
}