import "../styles/globals.css";
import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Head from "next/head";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <Head>
        <title>Marvel Comics</title>
      </Head>
      <body className="bg-gray-100 text-gray-900">
        <Navbar />
        <main className="container mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
