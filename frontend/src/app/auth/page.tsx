"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

import LoginForm from "@/components/loginForm";
import RegisterForm from "@/components/registerForm";

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchToRegister = () => setIsLogin(false);
  const switchToLogin = () => setIsLogin(true);

  return (
    <main className="center-col h-full min-h-screen bg-foreground overflow-hidden relative">
      <img
        src="/images/circle.png"
        className="absolute bottom-[-70%] left-[-30%] invert opacity-10"
      />
      <div className="relative w-full max-w-xl">
        <motion.div
          key={isLogin ? "login" : "register"}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
        >
          {isLogin ? (
            <LoginForm onSwitchToRegister={switchToRegister} />
          ) : (
            <RegisterForm onSwitchToLogin={switchToLogin} />
          )}
        </motion.div>
      </div>
    </main>
  );
};

export default Auth;
