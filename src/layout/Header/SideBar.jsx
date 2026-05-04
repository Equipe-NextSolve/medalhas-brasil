"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  const pathname = usePathname();
  const sidebarRef = useRef(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  const mainLinks = [
    { label: "Home", href: "/" },
    { label: "Eventos", href: "#events" },
    { label: "Sobre nós", href: "#about" },
    { label: "Catálogo", href: "#catalogo" },
  ];

  const subLinks = [
    { label: "Sobre a Empresa", href: "/About" },
    { label: "Política de Privacidade", href: "/Politics" },
    { label: "Orçamento", href: "/budget" },
  ];

  return (
    <section className="relative z-50">
      <button
        onClick={toggleMenu}
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        className="flex items-center justify-center w-10 h-10 rounded-lg text-black hover:bg-yellow/10 transition-colors duration-200"
      >
        {isOpen ? (
          <FaTimes className="text-xl text-yellow" />
        ) : (
          <FaBars className="text-xl" />
        )}
      </button>

      <div
        className={`fixed inset-0 z-40 transition-all duration-300 ${isOpen
            ? "bg-black/40 backdrop-blur-sm opacity-100"
            : "opacity-0 pointer-events-none"
          }`}
        onClick={closeMenu}
      />

      <aside
        ref={sidebarRef}
        onClick={(e) => e.stopPropagation()} 
        className={`fixed top-0 right-0 z-50 h-screen w-72 bg-white
          shadow-[-12px_0_50px_rgba(0,0,0,0.12)]
          transform transition-transform duration-300 ease-in-out
          flex flex-col
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
    
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-300">
          <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">
            Navegação
          </span>
          <button
            onClick={closeMenu}
            className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:bg-yellow/10 hover:text-yellow transition"
          >
            <FaTimes />
          </button>
        </div>
        <nav className="flex flex-col px-4 py-4 gap-1 flex-1 overflow-y-auto">
          {mainLinks.map((link, i) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                style={{
                  animationDelay: isOpen ? `${i * 60}ms` : "0ms",
                  animation: isOpen
                    ? "slideInRight 0.3s ease forwards"
                    : "none",
                  opacity: 0,
                }}
                className={`px-4 py-3 rounded-lg font-semibold transition
                  border-l-2
                  ${active
                    ? "bg-yellow/10 text-yellow border-yellow"
                    : "text-black hover:bg-yellow/10 hover:text-yellow border-transparent"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}

          <div
            style={{
              animationDelay: isOpen ? `${mainLinks.length * 60}ms` : "0ms",
              animation: isOpen
                ? "slideInRight 0.3s ease forwards"
                : "none",
              opacity: 0,
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation(); 
                setPagesOpen((prev) => !prev);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-semibold transition
                border-l-2
                ${pagesOpen
                  ? "bg-yellow/10 text-yellow border-yellow"
                  : "text-black hover:bg-yellow/10 hover:text-yellow border-transparent"
                }`}
            >
              <span>Páginas</span>
              <FaChevronDown
                className={`text-sm transition-transform duration-300 ${pagesOpen ? "rotate-180" : ""
                  }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${pagesOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                }`}
            >
              <div className="flex flex-col ml-4 mt-1 gap-1 border-l border-gray-300 pl-3">
                {subLinks.map((sub) => {
                  const active = pathname === sub.href;

                  return (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={closeMenu}
                      className={`px-3 py-2 rounded-lg text-sm transition
                        ${active
                          ? "text-yellow bg-yellow/10"
                          : "text-gray-700 hover:text-yellow hover:bg-yellow/10"
                        }`}
                    >
                      {sub.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="my-3 border-t border-gray-200" />

          <Link
            href="/budget"
            onClick={closeMenu}
            className="mx-2 py-3 rounded-full bg-black text-white text-center font-semibold
              hover:bg-blue-600 transition active:scale-95"
          >
            Orçamentos
          </Link>
        </nav>

        <div className="px-6 py-4 border-t border-gray-300">
          <span className="text-sm font-bold text-yellow">
            Medalhas Brasil
          </span>
        </div>
      </aside>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(16px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}