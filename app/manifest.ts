import type { MetadataRoute } from "next";

// PWA instalável (CLAUDE.md §7/§11.7).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Central de Estudos",
    short_name: "Estudos",
    description: "Sessão de estudo offline para concursos.",
    start_url: "/",
    display: "standalone",
    background_color: "#F4F7F4",
    theme_color: "#F4F7F4",
    orientation: "portrait",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
