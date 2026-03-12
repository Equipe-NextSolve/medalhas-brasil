"use client";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import Navigation from "./Navigation";
import SideBar from "./SideBar";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreen = () => {
            setIsMobile(window.innerWidth <= 748);
        };

        checkScreen();

        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", checkScreen);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", checkScreen);
        };
    }, []);

    return (
        <header className={`flex fixed top-0 w-full h-20 z-50 transition-all duration-300 bg-[#f0f0f0] ${scrolled ? "shadow-sm" : ""}`}style={{backgroundImage: `radial-gradient(ellipse 100% 80% at 50% -20%, rgba(191,191,191,0.15) 0%, transparent 70%)`,}}>

            <section className="max-w-7xl mx-auto flex items-center justify-around h-full py-10 px-10 w-full">
                <Logo />

                <div className="max-[748px]:hidden">
                    <Navigation />
                </div>

                {isMobile && <SideBar />}
            </section>
        </header>
    );
}