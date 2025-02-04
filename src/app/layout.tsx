import type { Metadata } from "next";
import "./globals.css";
import "./iconGlobals.css";

export const metadata: Metadata = {
  title: "Israel Frota - Essense",
  description: "Rede interna de feedbacks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`antialiased bg-[#D9E6F7]`}
      >
        {children}
      </body>
    </html>
  );
}
