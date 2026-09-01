"use client";

import { useEffect, useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApiError } from "@/lib/api/error";
import { AuthGate } from "@/components/AuthGate";
import { applyTheme, getTheme } from "@/lib/theme";

export function Providers({ children }: { children: ReactNode }) {
  // Reaplica o tema persistido a cada carregamento — sem isto, a escolha em
  // /perfil só valeria até o próximo refresh (lib/theme.ts só grava; quem
  // reaplica no boot é este efeito).
  useEffect(() => {
    applyTheme(getTheme());
  }, []);

  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Offline é o estado normal (§3): não tratamos rede como erro nem
            // ficamos em retry agressivo.
            retry: (failureCount, error) => {
              // 401/403 não se resolvem tentando de novo — client.ts já fez a
              // única retentativa que faz sentido (renovar o token). Insistir
              // aqui só atrasa a UI mostrar o estado real (login/bloqueio).
              if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
                return false;
              }
              return failureCount < 1;
            },
            refetchOnWindowFocus: false,
            staleTime: 60_000,
          },
        },
      }),
  );

  // Prefetch e sincronização não rodam mais incondicionalmente aqui — só
  // fazem sentido para quem está autenticado e liberado, e isso quem decide
  // é o AuthGate (ver CLAUDE.md do front, seção de multi-tenancy).
  return (
    <QueryClientProvider client={client}>
      <AuthGate>{children}</AuthGate>
    </QueryClientProvider>
  );
}
