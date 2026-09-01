// Flag local de "onboarding já visto" (§6, tela nova). Mostrado uma vez só
// para quem chega sem sessão; depois disso o destino padrão volta a ser
// /entrar. Não depende do backend — é puramente client-side.

const KEY = "onboarding_seen";

export function hasSeenOnboarding(): boolean {
  if (typeof window === "undefined") return true;
  return localStorage.getItem(KEY) === "1";
}

export function markOnboardingSeen(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, "1");
}
