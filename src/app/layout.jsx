import "./globals.css";
import Header from "@/layout/Header/Header";
import Footer from "@/layout/Footer/Footer";
import { Icon } from "lucide-react";

export const metadata = {
  title: "Medalhas Personalizadas e Troféus | Fabricação e Venda no Brasil",
  description:
    "Venda de medalhas e troféus personalizados para eventos esportivos, corporativos e escolares. Qualidade profissional e envio para todo o Brasil.",

  keywords: [
    "medalhas personalizadas",
    "troféus personalizados",
    "medalhas para eventos",
    "medalhas esportivas",
    "compra de medalhas",
    "troféus para premiação",
    "Marlon Ferrari",
  ],
  authors: [{ name: "Medalhas Brasil" }],

  icons: {
    icon: "/logo2.png",
  },

  openGraph: {
    title: "Medalhas Personalizadas e Troféus",
    description:
      "Produção de medalhas e troféus personalizados para todos os tipos de eventos.",
    url: "https://medalhasbrasil.com.br",
    siteName: "Medalhas Brasil",
    images: [
      {
        url: "/og-image.jpg", 
        width: 1200,
        height: 630,
      },
    ],
    locale: "pt_BR",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
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
