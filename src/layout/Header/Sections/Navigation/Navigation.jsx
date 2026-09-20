"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

const navigationLinks = [
    {
        id: "inicio",
        label: "Início",
        href: "/",
    },
    {
        id: "produtos",
        label: "Produtos",
        href: "/produtos",
        drop: [
            {
                id: "todos-produtos",
                label: "Todos os produtos",
                href: "/produtos",
            },
            {
                id: "trofeus",
                label: "Troféus",
                href: "/produtos/trofeus",
            },
            {
                id: "medalhas",
                label: "Medalhas",
                href: "/produtos/medalhas",
            },
            {
                id: "fitas",
                label: "Fitas",
                href: "/produtos/fitas",
            },
            {
                id: "couros",
                label: "Couros",
                href: "/produtos/couros",
            },
        ],
    },
    {
        id: "trofeus",
        label: "Troféus",
        href: "/produtos/trofeus",
    },
    {
        id: "medalhas",
        label: "Medalhas",
        href: "/produtos/medalhas",
    },
    {
        id: "acessorios",
        label: "Acessórios",
        href: "/produtos/acessorios",
    },
    {
        id: "personalizados",
        label: "Personalizados",
        href: "/produtos/personalizados",
    },
    {
        id: "ofertas",
        label: "Ofertas",
        href: "/ofertas",
        highlight: true,
    },
    {
        id: "modelo-3d",
        label: "Modelo 3D",
        href: "/visualizador3d",
        badge: true,
    },
];

export default function Navigation() {
    return (
        <nav className="flex items-center">
            <ul className="flex items-center gap-7">
                {navigationLinks.map((link) => (
                    <li key={link.id} className="group relative flex items-center">
                        {link.drop ? (
                            <>
                                <Link href={link.href} className="flex items-center gap-1.5 py-2 text-sm font-medium text-darkGray transition-colors duration-200 hover:text-yellow">
                                    {link.label}

                                    <ChevronDown size={14} strokeWidth={2} className="transition-transform duration-300 group-hover:rotate-180" />
                                </Link>

                                <div className="invisible absolute left-0 top-full z-60 w-56 translate-y-2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                                    <div className="overflow-hidden rounded-lg border border-gray/30 bg-white shadow-xl">
                                        {link.drop.map((sub) => (
                                            <Link key={sub.id} href={sub.href} className="flex items-center border-b border-gray/20 px-4 py-3 text-sm font-medium text-darkGray transition-colors duration-200 last:border-b-0 hover:bg-yellow/10 hover:text-yellow">
                                                {sub.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : link.badge ? (
                            <Link href={link.href} className="flex items-center gap-1.5 rounded-full bg-black px-4 py-1.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-yellow hover:text-black">
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow opacity-75" />
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-yellow" />
                                </span>
                                {link.label}
                            </Link>
                        ) : (
                            <Link href={link.href} className={`relative py-2 text-sm font-medium transition-colors duration-200 ${link.highlight ? "text-yellow hover:text-black" : "text-darkGray hover:text-yellow"}`}>
                                {link.label}
                                <span className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 group-hover:w-full ${link.highlight ? "w-full bg-yellow" : "w-0 bg-yellow"}`} />
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
}