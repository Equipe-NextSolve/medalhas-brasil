import "./globals.css";
import Header from "@/layout/Header/Header";
import Footer from "@/layout/Footer/Footer";
import { Icon } from "lucide-react";

export const metadata = {
  title: "Medalhas Brasil - Site Oficial",
  description: "Site de Medalhas, Trofeús, e acessórios comemorativos para Eventos, campeonatos e premiações.",
  icon: {
    Icon: '/logo.png'
  }
};


export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className="min-h-screen flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
