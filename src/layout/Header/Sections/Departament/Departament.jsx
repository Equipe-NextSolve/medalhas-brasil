"use client";

import Link from "next/link";
import { Building2, CalendarDays, ChevronDown, Code2, Headphones, Mail, Menu, ShieldCheck } from "lucide-react";

const departmentLinks = [
    {
        id: "sobre",
        label: "Sobre a empresa",
        description: "Conheça nossa história",
        href: "/sobre",
        icon: Building2,
    },
    {
        id: "eventos",
        label: "Eventos",
        description: "Eventos e competições",
        href: "/eventos",
        icon: CalendarDays,
    },
    {
        id: "contato",
        label: "Contato",
        description: "Fale com nossa equipe",
        href: "/contato",
        icon: Mail,
    },
    {
        id: "suporte",
        label: "Suporte",
        description: "Como podemos ajudar?",
        href: "/suporte",
        icon: Headphones,
    },
    {
        id: "criador",
        label: "Criador",
        description: "Conheça quem desenvolveu",
        href: "/criador",
        icon: Code2,
    },
    {
        id: "privacidade",
        label: "Política de Privacidade",
        description: "Segurança e seus dados",
        href: "/politica-de-privacidade",
        icon: ShieldCheck,
    },
];

export default function Departament() {
    return (
        <div className="group relative py-2">
            <button type="button" className="flex cursor-pointer select-none items-center gap-2.5 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-yellow hover:text-black">
                <Menu size={18} strokeWidth={2} />

                <span>Menu</span>

                <ChevronDown size={15} strokeWidth={2} className="opacity-70 transition-transform duration-300 group-hover:rotate-180" />
            </button>

            <div className="invisible absolute left-0 top-full z-50 w-72 translate-y-2 pt-2 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="overflow-hidden rounded-xl border border-gray/30 bg-white shadow-xl">
                    <div className="border-b border-gray/30 px-4 py-3">
                        <span className="text-xs font-semibold uppercase tracking-wider text-darkGray">
                            Outros canais
                        </span>
                    </div>

                    <ul className="p-2">
                        {departmentLinks.map((link) => {
                            const Icon = link.icon;

                            return (
                                <li key={link.id}>
                                    <Link href={link.href} className="group/item flex items-center gap-3 rounded-lg px-3 py-3 transition-all duration-200 hover:bg-yellow/10">
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray/20 text-darkGray transition-all duration-200 group-hover/item:bg-yellow group-hover/item:text-black">
                                            <Icon size={17} strokeWidth={1.8} />
                                        </div>

                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-black transition-colors duration-200 group-hover/item:text-yellow">
                                                {link.label}
                                            </span>

                                            <span className="mt-0.5 text-xs text-darkGray">
                                                {link.description}
                                            </span>
                                        </div>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}