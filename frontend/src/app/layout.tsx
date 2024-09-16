import type { Metadata } from "next";

import "@/styles/globals.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { AuthWrapper } from "@/context/authContext";

export const metadata: Metadata = {
  title: "Portadores de Aneis",
  description: "Portadores de Aneis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="font-poppinsLight">
        <AuthWrapper>{children}</AuthWrapper>
      </body>
    </html>
  );
}
