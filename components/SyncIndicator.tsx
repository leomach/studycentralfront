"use client";

import { useEffect, useState } from "react";
import { onSyncChange } from "@/lib/sync/engine";
import { pendingCount } from "@/lib/db/outbox";

// Indicador discreto de sincronização pendente (§3). Nunca bloqueia, nunca vira
// modal ou alerta. Some quando não há nada a sincronizar e há rede.
export function SyncIndicator() {
  const [pending, setPending] = useState(0);
  const [online, setOnline] = useState(true);

  useEffect(() => {
    let alive = true;
    const refresh = async () => {
      const n = await pendingCount();
      if (alive) setPending(n);
    };
    void refresh();
    const off = onSyncChange(refresh);

    setOnline(navigator.onLine);
    const on = () => setOnline(true);
    const offline = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", offline);

    const interval = window.setInterval(refresh, 4000);
    return () => {
      alive = false;
      off();
      window.removeEventListener("online", on);
      window.removeEventListener("offline", offline);
      window.clearInterval(interval);
    };
  }, []);

  if (online && pending === 0) return null;

  return (
    <div className="flex items-center gap-1.5 whitespace-nowrap font-mono text-[12px] font-medium opacity-70">
      <span
        className="inline-block h-2 w-2 rounded-full"
        style={{ backgroundColor: online ? "var(--sun)" : "currentColor" }}
        aria-hidden
      />
      {!online
        ? "Offline"
        : `${pending} ${pending === 1 ? "pendente" : "pendentes"}`}
    </div>
  );
}
