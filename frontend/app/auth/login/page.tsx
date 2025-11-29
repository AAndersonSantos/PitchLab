"use client";

import { useState, FormEvent } from "react";
import FormContainer from "../../../components/FormContainer";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { apiLogin } from "../../../lib/api";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/auth-context";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("Preencha todos os campos!");
      return;
    }

   try {
      const user = await apiLogin({
        email: email.trim(),
        password_hash: password.trim(),
      });

      setUser(user);
      router.push("/rooms");
    } catch (error) {
      console.error("Erro no registro:", error);
      alert("Erro ao registrar. Tente novamente.");
    }
  }

  return (
    <FormContainer title="Criar Conta">
      <form onSubmit={handleSubmit}>
        <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button type="submit">Entrar</Button>

        <p className="text-gray-400 text-sm mt-4 text-center">
          Ainda não tem conta?{" "}
          <a href="/auth/register" className="text-blue-500 hover:underline">
            Criar Conta
          </a>
        </p>
      </form>
    </FormContainer>
  );
}
