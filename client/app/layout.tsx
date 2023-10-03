import { Header } from "@/components/header";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test Work",
  description: "Client-server app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center">
        <Header />
        {children}
      </body>
    </html>
  );
}
