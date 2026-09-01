"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useRegister } from "@/lib/auth/hooks";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { Canvas } from "@/components/ui/Card";
import { Face } from "@/components/ui/Face";

const MIN_PASSWORD_LEN = 10;
const MAX_PASSWORD_BYTES = 72;

export default function CadastroPage() {
  const router = useRouter();
  const register = useRegister();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const passwordBytes = new TextEncoder().encode(password).length;
  const canSave =
    name.trim() !== "" &&
    email.includes("@") &&
    password.length >= MIN_PASSWORD_LEN &&
    passwordBytes <= MAX_PASSWORD_BYTES;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSave) return;
    try {
      await register.mutateAsync({ name: name.trim(), email, password });
      router.replace("/");
    } catch {
      // O erro já fica em register.error, mostrado abaixo do formulário.
    }
  };

  return (
    <Canvas tone="forest" className="min-h-dvh text-cream">
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-[var(--canvas-pad)] pt-12 text-center">
        <Face mood="wow" tone="cream" size={80} />
        <h1 className="m-0 whitespace-pre-line font-poster text-[44px] uppercase leading-[0.9] tracking-[-0.04em]">
          Criar{"\n"}conta
        </h1>
        <p className="max-w-[var(--measure-read)] font-sans text-[15px] font-semibold opacity-80">
          Sua fila de estudo, offline e sem enrolação.
        </p>
      </div>

      <div className="flex-shrink-0 rounded-t-panel bg-forest px-[var(--screen-pad)] pb-8 pt-6">
        <form onSubmit={submit} className="flex flex-col gap-4">
          <Input label="Nome" autoComplete="name" required value={name} onChange={(e) => setName(e.target.value)} />
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
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {password !== "" && password.length < MIN_PASSWORD_LEN && (
            <p className="-mt-2 font-sans text-[13px] font-semibold opacity-60">
              Mínimo de {MIN_PASSWORD_LEN} caracteres.
            </p>
          )}

          {register.isError && (
            <p className="font-sans text-[14px] font-bold text-wrong">{errorMessage(register.error)}</p>
          )}

          <Button size="xl" type="submit" variant="light" block trailing="→" disabled={!canSave || register.isPending}>
            {register.isPending ? "Criando conta…" : "Criar conta"}
          </Button>
        </form>

        <p className="mt-6 text-center font-sans text-[14px] font-semibold opacity-80">
          Já tem conta?{" "}
          <Link href="/entrar" className="font-black text-cream underline">
            Entrar
          </Link>
        </p>
      </div>
    </Canvas>
  );
}

function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "Não foi possível criar a conta.";
}
