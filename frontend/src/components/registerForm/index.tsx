"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import InputField from "@/components/inputField";

import { register as registerUser } from "@/services/auth";

const schema = z
  .object({
    username: z.string().min(6, "Seu nome de portador é muito curto"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string().min(1, "Confirmação de senha necessaria!"),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas não conferem",
        path: ["confirmPassword"],
      });
    }
  });

type AuthFormInputs = z.infer<typeof schema>;

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormInputs>({
    resolver: zodResolver(schema),
  });

  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: AuthFormInputs) => {
    console.log(data);
    try {
      await registerUser(data.username, data.email, data.password);

      onSwitchToLogin();
    } catch (error) {
      setError("Error ao realizar o registro!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="center-col">
      <h2 className="font-facundoBold text-background text-7xl text-center">
        Bem vindo.
      </h2>

      <p className="font-facundoRegular tracking-wide text-background text-[18px]">
        Cria sua conta de Portador🧙
      </p>

      <InputField
        label="Usuário"
        id="username"
        type="username"
        register={register("username")}
        error={errors.username}
      />

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

      <InputField
        label="Confirmar Senha"
        id="confirmPassword"
        type="password"
        register={register("confirmPassword")}
        error={errors.confirmPassword}
      />

      <button
        className="w-full h-[50px] mt-4 rounded-lg text-background bg-[#7d4911]"
        type="submit"
      >
        Registrar
      </button>

      {error && (
        <p className="text-destructive text-[12px] mt-1 opacity-90">{error}</p>
      )}

      <p className="mt-4 text-center text-sm text-gray-100">
        Já tem uma conta ?
        <button
          onClick={onSwitchToLogin}
          className="text-blue-500 ml-1 hover:underline focus:outline-none"
        >
          Entre
        </button>
      </p>
    </form>
  );
};

export default RegisterForm;
