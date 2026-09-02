import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  // Em desenvolvimento o SW atrapalha o hot-reload; habilita só em produção.
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // O app é feito pra celular (CLAUDE.md §1) — testar direto no telefone pela
  // rede local, apontando pro IP da máquina de dev, é o caso de uso normal,
  // não uma exceção. Sem isto, o Next.js 15 bloqueia/degrada os recursos
  // `/_next/*` vindos de uma origem diferente de localhost em dev, o que
  // quebra o carregamento de módulo do webpack no meio do Fast Refresh
  // ("Cannot read properties of undefined (reading 'call')"). Ajuste o IP se
  // a máquina de dev mudar de endereço na rede.
  allowedDevOrigins: ["192.168.1.31", "localhost"],
};

export default withSerwist(nextConfig);
