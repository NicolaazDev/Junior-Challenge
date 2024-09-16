"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import InputField from "@/components/inputField";
import { login } from "@/services/auth";
import { useRouter } from "next/navigation";

const schema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type AuthFormInputs = z.infer<typeof schema>;

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormInputs>({
    resolver: zodResolver(schema),
  });

  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const onSubmit = async (data: AuthFormInputs) => {
    console.log("Login form data:", data);

    try {
      await login(data.email, data.password);

      router.push("/home");
    } catch (error) {
      setError("Error ao realizar o login!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="center-col">
      <h2 className="font-facundoBold text-center text-background text-7xl">
        Ola novamente.
      </h2>

      <p className="font-facundoRegular tracking-wide text-background text-[18px]">
        Entre com sua conta de Portador🧙
      </p>

      <InputField
        label="Email"
        id="email"
        type="email"
        register={register("email")}
        error={errors.email}
      />

      <InputField
        label="Senha"
        id="password"
        type="password"
        register={register("password")}
        error={errors.password}
      />

      {error && (
        <p className="text-destructive text-[12px] mt-1 opacity-90">{error}</p>
      )}

      <button
        className="w-full h-[50px] mt-4 rounded-lg text-background bg-[#7d4911]"
        type="submit"
      >
        Entrar
      </button>

      <p className="mt-4 text-center text-sm text-gray-100">
        Não tem uma conta ?
        <button
          onClick={onSwitchToRegister}
          className="text-blue-500 ml-1 hover:underline focus:outline-none"
        >
          Registre-se
        </button>
      </p>
    </form>
  );
};

export default LoginForm;
