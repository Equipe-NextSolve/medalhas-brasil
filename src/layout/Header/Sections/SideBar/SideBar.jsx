"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const pathname = usePathname();

  const sidebarRef = useRef(null);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, []);

  useEffect(() => {
    if (pathname) {
      setIsOpen(false);
      setDropdownOpen(false);
    }
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [isOpen, closeMenu]);

  const mainLinks = [
    { label: 'Home', href: '/' },
    { label: 'Eventos', href: '#events' },
    { label: 'Sobre nós', href: '#about' },
    { label: 'Catálogo', href: '#catalago' },
    {
      label: 'Páginas',
      href: '#',
      drop: [
        { label: 'Sobre nossa Empresa', href: '/About' },
        { label: 'Politica de Privacidade', href: '/Politics' },
        { label: 'Orçamento', href: '/budget' },
      ]
    },
  ];

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <button type="button" onClick={toggleMenu} aria-label="Abrir menu"
        className="flex items-center justify-center w-10 h-10 rounded-xl text-black border border-gray/40 bg-white transition-all duration-300 hover:text-yellow hover:border-yellow hover:bg-yellow/10">
        <FaBars size={16} />
      </button>

      {mounted &&
        createPortal(
          <>
            <button type="button" onClick={closeMenu}
              className={`fixed inset-0 z-9998 min-h-screen h-full transition-all duration-500 bg-black/40 backdrop-blur-sm ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} />
            <aside
              ref={sidebarRef}
              className={`fixed top-0 right-0 z-9999 h-screen w-80 bg-white backdrop-blur-2xl border-l border-gray/20 shadow-[-25px_0_60px_rgba(0,0,0,0.12)]
              transform transition-transform duration-300 ease-in-out flex flex-col justify-between overflow-y-auto ${isOpen
                  ? "translate-x-0"
                  : "translate-x-full"
                }`}
            >
              <div>
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray/20">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-darkGray uppercase opacity-60">
                    Navegação
                  </span>

                  <button
                    type="button"
                    onClick={closeMenu}
                    aria-label="Fechar menu"
                    className="flex items-center justify-center w-8 h-8 rounded-lg text-darkGray/60 border border-transparent transition-all duration-300 hover:text-yellow hover:bg-yellow/10 hover:border-yellow/30">
                    <FaTimes size={14} />
                  </button>
                </div>

                <nav className="flex flex-col px-4 py-4 gap-1.5">
                  {mainLinks.map((link) => {
                    const active =
                      pathname === link.href;

                    if (link.drop) {
                      return (
                        <div
                          key={link.id}
                          className="w-full flex flex-col"
                        >
                          <button
                            type="button"
                            onClick={() =>
                              setDropdownOpen(
                                !dropdownOpen
                              )
                            }
                            className="w-full px-4 py-3 rounded-xl text-sm font-medium tracking-wide flex items-center justify-between text-darkGray hover:text-yellow hover:bg-yellow/10 transition-all duration-200">
                            <span>
                              {link.label}
                            </span>

                            <FaChevronDown
                              size={10}
                              className={`transform transition-transform duration-300 text-yellow
                              ${dropdownOpen
                                  ? "rotate-180"
                                  : ""
                                }`}
                            />
                          </button>

                          <div
                            className={`flex flex-col pl-4 gap-1 overflow-hidden transition-all duration-300 ${dropdownOpen
                              ? "max-h-40 mt-1 opacity-100"
                              : "max-h-0 opacity-0"
                              }`}
                          >
                            {link.drop.map(
                              (sub) => (
                                <Link key={sub.id} href={sub.href} onClick={closeMenu}
                                  className="px-4 py-2 rounded-lg text-xs font-medium text-darkGray hover:text-yellow hover:bg-yellow/10 transition-colors">
                                  {sub.label}
                                </Link>
                              )
                            )}
                          </div>
                        </div>
                      );
                    }

                    return (
                      <Link key={link.id} href={link.href} onClick={closeMenu}
                        className={`px-4 py-3 rounded-xl text-sm font-medium tracking-wide border transition-all duration-200 ${active
                          ? "bg-yellow/10 text-yellow border-yellow/30 font-semibold"
                          : "text-darkGray border-transparent hover:text-yellow hover:bg-yellow/10 hover:border-yellow/20"
                          }`}>
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="px-4 pb-6 pt-4 border-t border-gray/20 bg-white">
                <div className="space-y-2.5">
                  <Link href="/contact" onClick={closeMenu}
                    className="block text-center w-full px-4 py-3 rounded-xl text-sm font-semibold tracking-wide text-white bg-yellow hover:opacity-90 active:scale-[0.99]transition-all shadow-[0_4px_20px_rgba(217,153,35,0.25)]">
                    Contato
                  </Link>

                  <div className="grid grid-cols-2 gap-2">
                    <Link href="/budget" onClick={closeMenu}
                      className="block text-center px-3 py-2.5 rounded-xl text-xs font-medium tracking-wide text-darkGray border border-gray/30 hover:bg-yellow/10 hover:text-yellow transition-all">
                      Orçamento
                    </Link>

                  </div>
                </div>

                <div className="mt-6 flex flex-col items-center">
                  <div className="h-px w-3/4 bg-linear-to-r from-transparent via-yellow/40 to-transparent mb-3" />

                  <span className="text-xs font-bold tracking-widest text-transparent bg-clip-text bg-linear-to-r from-yellow to-blue">
                    Medalhas Brasil
                  </span>
                </div>
              </div>
            </aside>
          </>,
          document.body
        )}
    </>
  );
}