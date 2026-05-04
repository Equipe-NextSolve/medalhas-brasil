"use client";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import Navigation from "./Navigation";
import SideBar from "./SideBar";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreen = () => setIsMobile(window.innerWidth <= 748);
        checkScreen();

        const handleScroll = () => setScrolled(window.scrollY > 20);

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", checkScreen);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", checkScreen);
        };
    }, []);

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-500 border-b 
            ${scrolled
                    ? "h-16 bg-white/80 backdrop-blur-md border-gray/20 shadow-md"
                    : "h-24 bg-white border-transparent"}`}>
            <div className="absolute inset-0 pointer-events-none opacity-40" style={{ background: 'linear-gradient(to bottom, rgba(191,191,191,0.08), transparent)' }}/>

            <section className="relative max-w-7xl mx-auto flex items-center justify-between h-full px-6 lg:px-12">

                <div className="shrink-0 hover:scale-105 transition-transform duration-300"><Logo /></div>

                <div className="hidden md:flex items-center"><Navigation /></div>

                {isMobile && (
                    <div className="p-2 rounded-lg bbg-gray/10 hover:bg-gray/20 transition-colors"><SideBar /></div>
                )}
            </section>
        </header>
    );
}