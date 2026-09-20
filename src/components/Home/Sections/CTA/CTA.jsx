"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function CTA() {
    return (
        <section className="w-full bg-white px-4 py-10 sm:px-6 md:py-14 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-black"
            >
                <div className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full border border-yellow/20" />
                <div className="pointer-events-none absolute -right-10 -top-20 h-64 w-64 rounded-full border border-yellow/10" />
                <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-yellow/5 blur-3xl" />

                <div className="relative flex flex-col gap-10 px-6 py-12 sm:px-10 md:px-12 md:py-16 lg:flex-row lg:items-center lg:justify-between lg:px-16 lg:py-20">

                    <div className="max-w-2xl">

                        <div className="mb-5 flex items-center gap-3">
                            <span className="h-px w-8 bg-yellow" />

                            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow">
                                Sua próxima premiação começa aqui
                            </span>
                        </div>

                        <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                            Tem um grande evento{" "}
                            <span className="text-yellow">
                                chegando?
                            </span>
                        </h2>

                        <p className="mt-5 max-w-xl text-sm font-medium leading-7 text-gray sm:text-base">
                            Encontre medalhas, troféus e premiações para tornar cada conquista inesquecível. Escolha entre nossos produtos ou fale com nossa equipe para criar algo especial.
                        </p>

                    </div>

                    <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">

                        <Link
                            href="/produtos"
                            className="group flex min-h-12 items-center justify-center gap-2 rounded-xl bg-yellow px-6 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-white"
                        >
                            Explorar produtos

                            <ArrowRight
                                size={17}
                                strokeWidth={1.8}
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                        </Link>

                        <Link
                            href="/contato"
                            className="group flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
                        >
                            <MessageCircle
                                size={17}
                                strokeWidth={1.8}
                            />

                            Falar com a equipe
                        </Link>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}