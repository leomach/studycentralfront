"use client";

import { useEffect, useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { startSyncEngine } from "@/lib/sync/engine";
import { prefetchAll } from "@/lib/sync/prefetch";

export function Providers({ children }: { children: ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Offline é o estado normal (§3): não tratamos rede como erro nem
            // ficamos em retry agressivo.
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: 60_000,
          },
        },
      }),
  );

  useEffect(() => {
    // Liga a sincronização e dispara o prefetch na abertura (§7). Falha de rede
    // aqui é silenciosa — o app segue com o que já está no IndexedDB.
    startSyncEngine();
    void prefetchAll().catch(() => {});

    const onFocus = () => void prefetchAll().catch(() => {});
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
