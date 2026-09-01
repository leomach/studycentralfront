import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { AppNav } from "@/components/AppNav";

// IBM Plex Sans para tudo; Plex Mono exclusivamente para números (§4).
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Central de Estudos",
  description: "Sessão de estudo offline para concursos.",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "Estudos", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  themeColor: "#F4F7F4",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${plexSans.variable} ${plexMono.variable}`}>
      <body className="min-h-dvh bg-paper text-ink">
        <Providers>
          <AppNav />
          {children}
        </Providers>
      </body>
    </html>
  );
}
