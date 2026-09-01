import type { Metadata, Viewport } from "next";
import { Archivo_Black, IBM_Plex_Mono, Instrument_Serif, Nunito } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

// Quatro vozes, cada uma com um só trabalho (design system STUD, ver
// CLAUDE.md §4/§12): Nunito é a voz padrão (corpo, headers, números, botões
// — substitui o IBM Plex Sans que fazia esse papel antes); Archivo Black só
// para headlines poster; Instrument Serif só para o verso de flashcard e
// citações; IBM Plex Mono (mantido) só para valores tipo relógio.
const nunito = Nunito({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-nunito",
  display: "swap",
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo-black",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
  themeColor: "#F5F1E6",
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
    <html
      lang="pt-BR"
      className={`${nunito.variable} ${archivoBlack.variable} ${instrumentSerif.variable} ${plexMono.variable}`}
    >
      <body className="min-h-dvh bg-paper text-ink">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
