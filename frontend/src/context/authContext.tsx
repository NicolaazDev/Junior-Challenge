"use client";

import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { AuthContextData, User } from "@/types/auth";

import {
  login as loginService,
  logout as logoutService,
} from "@/services/auth";

import { getToken } from "@/utils/storage";

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      router.push("/home");
    }
  }, []);

  const login = async (email: string, password: string) => {
    const { user } = await loginService(email, password);
    setUser(user);
  };

  const logout = () => {
    logoutService();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <AuthProvider>{children}</AuthProvider>;
};
