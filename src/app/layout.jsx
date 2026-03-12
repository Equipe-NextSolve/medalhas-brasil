import "./globals.css";
import Header from "@/layout/Header/Header";
import Footer from "@/layout/Footer/Footer";

export const metadata = {
  title: "Medalhas Brasil - Site Oficial",
  description: "Site de Medalhas, Trofeús, e acessórios comemorativos para Eventos, campeonatos e premiações.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className="min-h-screen flex flex-col">
        <Header />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
