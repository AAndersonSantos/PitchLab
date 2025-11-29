"use client";

import { useState, FormEvent } from "react";
import FormContainer from "../../../components/FormContainer";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { apiRegister } from "../../../lib/api";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/auth-context";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("Digite seu nome!");
      return;
    }

   try {
      const user = await apiRegister({
        name: name.trim(),
        email: email.trim(),
        password_hash: password.trim(),
      });


      setUser(user);
      router.push("/auth/login");
    } catch (error) {
      console.error("Erro no registro:", error);
      alert("Erro ao registrar. Tente novamente.");
    }
  }

  return (
    <FormContainer title="Criar Conta">
      <form onSubmit={handleSubmit}>
        <Input label="Nome" value={name} onChange={e => setName(e.target.value)} />
        <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button type="submit">Registrar</Button>

        <p className="text-gray-400 text-sm mt-4 text-center">
          Já tem conta?{" "}
          <a href="/auth/login" className="text-blue-500 hover:underline">
            Entrar
          </a>
        </p>
      </form>
    </FormContainer>
  );
}
