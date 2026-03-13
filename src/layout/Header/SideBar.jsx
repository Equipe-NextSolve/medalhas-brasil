"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const sideBarRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        sideBarRef.current &&
        !sideBarRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, closeMenu]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const dt_links = [
    { label: 'Home', href: '#' },
    { label: 'Quem Somos', href: '/About' },
    { label: 'Suporte', href: '#' },
    { label: 'Orçamento', href: '#' },
  ];

  return (
    <>
      <style>{`
        .sidebar-panel {
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .sidebar-panel.open {
          transform: translateX(0);
        }
        .nav-item {
          transition: background 0.18s ease, color 0.18s ease, padding-left 0.18s ease;
        }
        .nav-item:hover {
          background: rgba(217, 153, 35, 0.09);
          color: #D99923;
          padding-left: 22px;
        }
        .icon-btn {
          transition: color 0.2s ease, background 0.2s ease;
        }
        .icon-btn:hover {
          background: rgba(217, 153, 35, 0.09);
          color: #D99923;
        }
      `}</style>

      <section className="relative z-[1000]">

        {/* Botão abrir — ícone FaBars */}
        <button
          ref={buttonRef}
          onClick={toggleMenu}
          aria-label="Abrir menu"
          aria-expanded={isOpen}
          className="icon-btn flex items-center justify-center w-10 h-10 bg-transparent border-none cursor-pointer rounded-lg text-[#0D0D0D]"
        >
          <FaBars className="text-xl" />
        </button>

        <div
          onClick={closeMenu}
          className={`fixed inset-0 z-[999] pointer-events-none transition-all duration-[350ms] ease-in-out ${isOpen
              ? "bg-[rgba(13,13,13,0.25)] backdrop-blur-[4px] pointer-events-auto"
              : "bg-[rgba(13,13,13,0)] backdrop-blur-none"
            }`}
        >
          <aside
            ref={sideBarRef}
            aria-label="Menu lateral"
            onClick={(e) => e.stopPropagation()}
            className={`sidebar-panel ${isOpen ? "open" : ""}
              fixed top-0 right-0 h-dvh w-[300px] bg-[#f0f0f0] shadow-[-8px_0_40px_rgba(13,13,13,0.1)] flex flex-col z-[1000] border-l border-[rgba(3,140,76,0.12)]`}
          >
            <div className="flex items-center justify-between px-7 py-6 border-b border-[#BFBFBF]/30">
              <h2 className="text-[0.8rem] font-semibold tracking-[0.08em] uppercase text-[#BFBFBF]">
                Menu de Navegação
              </h2>

              {/* Botão fechar — ícone FaTimes */}
              <button
                onClick={closeMenu}
                aria-label="Fechar menu"
                className="icon-btn flex items-center justify-center w-8 h-8 bg-transparent border-none cursor-pointer rounded-lg text-[#BFBFBF]"
              >
                <FaTimes className="text-base" />
              </button>
            </div>

            <nav className="flex-1 flex flex-col px-4 py-4 gap-[2px] overflow-y-auto cursor-pointer">
              {dt_links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  onClick={closeMenu}
                  className="nav-item flex items-center px-4 py-[13px] rounded-[10px] text-base font-medium text-[#0D0D0D] no-underline cursor-pointer  "
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="px-7 py-5 border-t border-[#BFBFBF]/30">
              <span className="text-[0.8rem] font-semibold text-[#038C4C] tracking-[0.03em]">
                Medalhas Brasil
              </span>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}