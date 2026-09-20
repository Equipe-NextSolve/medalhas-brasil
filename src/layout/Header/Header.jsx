"use client";
import { useEffect, useState } from "react";

import Logo from "./Sections/Logo/Logo";
import SearchBar from "./Sections/SearchBar/SearchBar";
import Buttons from "./Sections/Buttons/Buttons";
import Sidebar from "./Sections/SideBar/SideBar";
import Navigation from "./Sections/Navigation/Navigation";
import Departament from "./Sections/Departament/Departament";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header className={`fixed left-0 top-0 z-50 w-full border-b transition-all duration-300 ${scrolled ? "border-gray/30 bg-white/95 shadow-sm backdrop-blur-md" : "border-gray/20 bg-white"}`}>
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

                <div className="flex h-25 items-center justify-between gap-4 md:gap-7">
                    <div className="shrink-0">
                        <Logo />
                    </div>

                    <div className="mx-auto hidden w-full max-w-2xl flex-1 md:block">
                        <SearchBar />
                    </div>

                    <div className="hidden shrink-0 md:block">
                        <Buttons />
                    </div>

                    <div className="flex shrink-0 items-center md:hidden">
                        <Sidebar />
                    </div>
                </div>

                <div className="pb-4 md:hidden">
                    <SearchBar />
                </div>

                <div className="hidden h-13.5 items-center border-t border-gray/30 md:flex">
                    <div className="flex w-full items-center gap-5">
                        <Departament />

                        <div className="h-5 w-px shrink-0 bg-gray/50" />
                        <Navigation />
                    </div>
                </div>
            </div>
        </header>
    );
}