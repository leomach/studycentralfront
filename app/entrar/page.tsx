"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLogin } from "@/lib/auth/hooks";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { Canvas } from "@/components/ui/Card";
import { Face } from "@/components/ui/Face";

export default function EntrarPage() {
  const router = useRouter();
  const login = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRecovery, setShowRecovery] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login.mutateAsync({ email, password });
      router.replace("/");
    } catch {
      // O erro já fica em login.error, mostrado abaixo do formulário.
    }
  };

  return (
    <Canvas tone="forest" className="min-h-dvh text-cream">
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-[var(--canvas-pad)] pt-12 text-center">
        <Face mood="calm" tone="cream" size={80} />
        <h1 className="m-0 whitespace-pre-line font-poster text-[44px] uppercase leading-[0.9] tracking-[-0.04em]">
          Bem-vindo{"\n"}de volta
        </h1>
        <p className="max-w-[var(--measure-read)] font-sans text-[15px] font-semibold opacity-80">
          Entre para continuar de onde parou.
        </p>
      </div>

      <div className="flex-shrink-0 rounded-t-panel bg-forest px-[var(--screen-pad)] pb-8 pt-6">
        <form onSubmit={submit} className="flex flex-col gap-4">
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Senha"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {login.isError && (
            <p className="font-sans text-[14px] font-bold text-wrong">{errorMessage(login.error)}</p>
          )}

          <Button size="xl" type="submit" variant="light" block trailing="→" disabled={login.isPending}>
            {login.isPending ? "Entrando…" : "Entrar"}
          </Button>

          <button
            type="button"
            onClick={() => setShowRecovery(true)}
            className="border-0 bg-transparent text-center font-sans text-[13px] font-bold opacity-70"
          >
            Esqueci minha senha
          </button>
          {showRecovery && (
            <p className="text-center font-sans text-[13px] font-semibold opacity-60">
              Em breve — essa recuperação ainda não existe. Fale com quem administra a conta.
            </p>
          )}
        </form>

        <p className="mt-6 text-center font-sans text-[14px] font-semibold opacity-80">
          Não tem conta?{" "}
          <Link href="/cadastro" className="font-black text-cream underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </Canvas>
  );
}

function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "Não foi possível entrar.";
}
