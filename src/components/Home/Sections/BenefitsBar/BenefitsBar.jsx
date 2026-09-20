"use client";

import Link from "next/link";
import { Award, Headphones, PackageCheck, Sparkles } from "lucide-react";

const benefits = [
    {
        id: "personalizacao",
        title: "Produtos Personalizados",
        text: "Premiações desenvolvidas para o seu evento",
        icon: Award,
        href: "/produtos/personalizados",
    },
    {
        id: "entrega",
        title: "Entrega para todo o Brasil",
        text: "Receba seu pedido com segurança",
        icon: PackageCheck,
        href: "/entregas",
    },
    {
        id: "orcamento",
        title: "Solicite seu Orçamento",
        text: "Condições especiais para grandes pedidos",
        icon: Sparkles,
        href: "/orcamento",
    },
    {
        id: "atendimento",
        title: "Atendimento Especializado",
        text: "Nossa equipe está pronta para ajudar",
        icon: Headphones,
        href: "/contato",
    },
];

export default function BenefitsBar() {
    return (
        <section className="w-full border-y border-gray/30 bg-white">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <ul className="grid grid-cols-1 divide-y divide-gray/30 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
                    {benefits.map((item) => {
                        const Icon = item.icon;

                        return (
                            <li key={item.id} className="group relative">
                                <Link href={item.href} className="flex min-h-30 items-center gap-4 px-3 py-6 transition-all duration-300 hover:bg-yellow/5 sm:px-5 lg:min-h-32.5 lg:px-6">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-yellow/30 bg-yellow/10 text-yellow transition-all duration-300 group-hover:border-yellow group-hover:bg-yellow group-hover:text-black">
                                        <Icon size={21} strokeWidth={1.8} className="transition-transform duration-300 group-hover:scale-110" />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <h3 className="text-sm font-semibold text-black transition-colors duration-300 group-hover:text-yellow">
                                            {item.title}
                                        </h3>

                                        <p className="max-w-47.5 text-xs font-medium leading-relaxed text-darkGray">
                                            {item.text}
                                        </p>
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}