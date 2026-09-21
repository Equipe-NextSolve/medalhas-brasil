"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Box, ChevronDown, CircleUserRound, Headphones, Menu, PackageSearch, ShoppingBag, Sparkles, Trophy, X, } from "lucide-react";

import { handleInDevelopment } from "@/utils/inDevelopment";

const shopLinks = [
  {
    id: "todos-produtos",
    label: "Todos os produtos",
    href: "/produtos",
    development: true,
  },
  {
    id: "trofeus",
    label: "Troféus",
    href: "/produtos/trofeus",
    development: true,
  },
  {
    id: "medalhas",
    label: "Medalhas",
    href: "/produtos/medalhas",
    development: true,
  },
  {
    id: "fitas",
    label: "Fitas",
    href: "/produtos/fitas",
    development: true,
  },
  {
    id: "couros",
    label: "Couros",
    href: "/produtos/couros",
    development: true,
  },
  {
    id: "acessorios",
    label: "Acessórios",
    href: "/produtos/acessorios",
    development: true,
  },
];

const mainLinks = [
  {
    id: "inicio",
    label: "Início",
    href: "/",
  },
  {
    id: "personalizados",
    label: "Personalizados",
    href: "/produtos/personalizados",
    development: true,
  },
  {
    id: "ofertas",
    label: "Ofertas",
    href: "/ofertas",
    development: true,
    highlight: true,
  },
];

const institutionalLinks = [
  {
    id: "sobre",
    label: "Sobre a empresa",
    href: "/About",
    development: true,
  },
  {
    id: "eventos",
    label: "Eventos",
    href: "/eventos",
    development: true,
  },
  {
    id: "orcamento",
    label: "Orçamento",
    href: "/budget",
    development: true,
  },
  {
    id: "privacidade",
    label: "Política de Privacidade",
    href: "/Politics",
    development: true,
  },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();
  const sidebarRef = useRef(null);

  const cartItems = 0;

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setProductsOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpen((current) => !current);
  }, []);

  const handleDevelopmentLink = (event) => {
    handleInDevelopment(event);
    closeMenu();
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, closeMenu]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeMenu]);

  return (
    <>
      <button type="button" onClick={toggleMenu} aria-label="Abrir menu" aria-expanded={isOpen}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-gray/40 bg-white text-black transition-all duration-300 hover:border-yellow hover:bg-yellow/10 hover:text-yellow">
        <Menu size={19} strokeWidth={1.8} />
      </button>

      {mounted &&
        createPortal(
          <>
            <button type="button" onClick={closeMenu} aria-label="Fechar menu"
              className={`fixed inset-0 z-9998 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isOpen
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0"
                }`} />

            <aside
              ref={sidebarRef}
              className={`fixed right-0 top-0 z-9999 flex h-dvh w-[90%] max-w-95 flex-col border-l border-gray/20 bg-white shadow-2xl transition-transform duration-300 ease-out ${isOpen
                ? "translate-x-0"
                : "translate-x-full"}`}>

              <div className="flex shrink-0 items-center justify-between border-b border-gray/30 px-5 py-4">
                <div>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-yellow">Medalhas Brasil</span>

                  <span className="mt-1 block text-base font-semibold text-black">Menu</span>
                </div>

                <button type="button" onClick={closeMenu} aria-label="Fechar menu"
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-darkGray transition-all duration-200 hover:bg-gray/20 hover:text-black">
                  <X size={19} strokeWidth={1.8} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">

                <div className="grid grid-cols-2 gap-2 border-b border-gray/30 p-4">

                  <button type="button" onClick={handleDevelopmentLink}
                    className="group flex cursor-pointer items-center gap-3 rounded-xl border border-gray/30 bg-white p-3 text-left transition-all duration-200 hover:border-yellow/40 hover:bg-yellow/5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray/20 text-black transition-colors duration-200 group-hover:bg-yellow group-hover:text-black">
                      <CircleUserRound
                        size={18}
                        strokeWidth={1.8}
                      />
                    </div>

                    <div className="min-w-0">
                      <span className="block text-[10px] font-medium text-darkGray">Sua conta</span>

                      <span className="block truncate text-xs font-semibold text-black">Entrar</span>
                    </div>
                  </button>

                  <button type="button" onClick={handleDevelopmentLink} className="group flex cursor-pointer items-center gap-3 rounded-xl border border-gray/30 bg-white p-3 text-left transition-all duration-200 hover:border-yellow/40 hover:bg-yellow/5">
                    <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray/20 text-black transition-colors duration-200 group-hover:bg-yellow">
                      <ShoppingBag size={18} strokeWidth={1.8} />

                      {cartItems > 0 && (
                        <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-yellow px-1 text-[9px] font-bold text-black">
                          {cartItems > 99
                            ? "99+"
                            : cartItems}
                        </span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <span className="block text-[10px] font-medium text-darkGray">Carrinho</span>

                      <span className="block truncate text-xs font-semibold text-black">
                        {cartItems === 0
                          ? "Vazio"
                          : `${cartItems} itens`}
                      </span>
                    </div>
                  </button>
                </div>

                <nav className="px-4 py-5">

                  <span className="mb-2 block px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-darkGray">Navegação</span>

                  <div className="flex flex-col gap-1">

                    {mainLinks.map((link) => {
                      const active =
                        pathname === link.href;

                      return (
                        <Link key={link.id} href={link.href}
                          onClick={link.development ? handleDevelopmentLink : closeMenu}
                          className={`flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 ${active
                            ? "bg-yellow/10 text-yellow"
                            : link.highlight ? "text-yellow hover:bg-yellow/10" : "text-darkGray hover:bg-gray/20 hover:text-black"}`}>
                          {link.label}

                          {link.highlight && (
                            <span className="rounded-full bg-yellow/10 px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-yellow">Confira</span>
                          )}
                        </Link>
                      );
                    })}

                    <div>
                      <button type="button"
                        onClick={() =>
                          setProductsOpen(
                            (current) => !current
                          )
                        }
                        className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-darkGray transition-all duration-200 hover:bg-gray/20 hover:text-black">
                        <span className="flex items-center gap-2">Produtos</span>

                        <ChevronDown size={15} strokeWidth={1.8}
                          className={`transition-transform duration-300 ${productsOpen ? "rotate-180" : ""}`} />
                      </button>

                      <div className={`grid transition-all duration-300 ${productsOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                        <div className="overflow-hidden">
                          <div className="ml-3 flex flex-col border-l border-gray/40 pb-2 pl-3 pt-1">
                            {shopLinks.map(
                              (link) => (
                                <Link key={link.id} href={link.href} onClick={link.development ? handleDevelopmentLink : closeMenu}
                                  className="rounded-lg px-3 py-2.5 text-xs font-medium text-darkGray transition-colors duration-200 hover:bg-yellow/10 hover:text-yellow">
                                  {link.label}
                                </Link>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </nav>

                <div className="border-y border-gray/30 px-4 py-5">
                  <Link href="/visualizador3d" onClick={closeMenu} className="group flex items-center justify-between rounded-2xl bg-black p-4 text-white transition-all duration-300 hover:bg-yellow hover:text-black">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 transition-colors duration-300 group-hover:bg-black/10">
                        <Box size={20} strokeWidth={1.8} />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold">Modelo 3D</span>

                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow opacity-75 group-hover:bg-black" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-yellow group-hover:bg-black" />
                          </span>
                        </div>

                        <span className="mt-0.5 block text-[10px] text-gray group-hover:text-black/70">
                          Visualize nossos modelos
                        </span>
                      </div>
                    </div>

                    <PackageSearch size={18} strokeWidth={1.8} />
                  </Link>
                </div>

                <div className="px-4 py-5">
                  <span className="mb-2 block px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-darkGray">Institucional</span>

                  <div className="flex flex-col gap-1">
                    {institutionalLinks.map((link) => (
                      <Link key={link.id} href={link.href} onClick={link.development ? handleDevelopmentLink : closeMenu}
                        className="rounded-xl px-3 py-2.5 text-xs font-medium text-darkGray transition-all duration-200 hover:bg-gray/20 hover:text-black">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="shrink-0 border-t border-gray/30 bg-white p-4">
                <button type="button" onClick={handleDevelopmentLink}
                  className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-yellow px-4 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-black hover:text-white">
                  <Headphones size={17} strokeWidth={1.8} />
                  Falar com atendimento
                </button>

                <div className="mt-3 flex items-center justify-center gap-2">
                  <Trophy size={13} strokeWidth={1.8} className="text-yellow" />

                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-darkGray">Medalhas Brasil</span>

                  <Sparkles size={12} strokeWidth={1.8} className="text-yellow" />
                </div>
              </div>
            </aside>
          </>,
          document.body
        )}
    </>
  );
}