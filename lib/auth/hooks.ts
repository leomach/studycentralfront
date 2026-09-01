"use client";

import { useSyncExternalStore } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  USING_MOCK,
  getSession,
  login as loginRequest,
  logout as logoutRequest,
  onSessionChange,
  register as registerRequest,
  type Session,
} from "./session";

// Estado local (fora do React) que useSyncExternalStore expõe de forma
// reativa. Dexie é assíncrono, então o snapshot síncrono exigido pelo React
// vem de um cache atualizado em segundo plano — é o padrão recomendado para
// "external store" cuja leitura real é assíncrona.
let cached: Session | null | undefined = undefined; // undefined = ainda não carregou

function refreshCache(notify: () => void) {
  void getSession().then((s) => {
    cached = s;
    notify();
  });
}

export type SessionState =
  | { status: "loading" }
  | { status: "mock" }
  | { status: "anonymous" }
  | { status: "authenticated"; plan: string };

/** Estado de sessão reativo — reage a login/logout/renovação em qualquer
 * parte do app sem precisar de polling (lib/auth/session.ts notifica). */
export function useSession(): SessionState {
  const snapshot = useSyncExternalStore(
    (notify) => {
      refreshCache(notify);
      return onSessionChange(() => refreshCache(notify));
    },
    () => cached,
    () => cached,
  );

  if (USING_MOCK) return { status: "mock" };
  if (snapshot === undefined) return { status: "loading" };
  if (snapshot === null) return { status: "anonymous" };
  return { status: "authenticated", plan: snapshot.plan };
}

export function useLogin() {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginRequest(email, password),
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => registerRequest(name, email, password),
  });
}

export function useLogout() {
  return useMutation({ mutationFn: () => logoutRequest() });
}
