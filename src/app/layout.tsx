import "../styles/globals.css";
import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
    title: "Marvel Universe | Explore Comics e Personagens",
    description: "Descubra o universo Marvel através de quadrinhos, personagens e eventos épicos. Sua jornagem heróica começa aqui!",
    openGraph: {
        images: "/og-image.jpg",
    },
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="pt-BR" className="scroll-smooth">
        <body className={`${inter.variable} font-sans bg-white text-gray-950 antialiased`}>
        <Navbar />


        <main className="min-h-[calc(100vh-160px)]">
            {children}
        </main>

        <Footer />
        </body>
        </html>
    );
}