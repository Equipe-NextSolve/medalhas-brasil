"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, CalendarDays } from "lucide-react";

const events = [
    {
        id: "caninde-2026",
        image: "/images/ilustrative1.png",
        title: "Canindé-CE 2026",
        category: "Corrida",
        alt: "Premiação do evento em Canindé",
    },
    {
        id: "circuito-pacoti-2026",
        image: "/images/image21.jpeg",
        title: "Circuito do Pacoti - 2026",
        category: "Circuito",
        alt: "Premiação do Circuito do Pacoti",
    },
    {
        id: "corrida-venus-2026",
        image: "/images/image22.jpeg",
        title: "Corrida Vênus 2026",
        category: "Corrida",
        alt: "Premiação da Corrida Vênus",
    },
    {
        id: "Primeiro Team Run",
        image: "/images/ilustrative5.png",
        title: "Primeiro Team Run",
        category: "Evento",
        alt: "Premiação de evento esportivo",
    },
];

const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, }, },
};

const item = {
    hidden: { opacity: 0, y: 35, },
    visible: { opacity: 1, y: 0, },
};

export default function Hero() {
    return (
        <section id="events" className="relative w-full overflow-hidden bg-white py-20 md:py-24 lg:py-28">
            <div className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-yellow/5 blur-3xl" />

            <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

                <motion.div
                    variants={item}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 flex flex-col gap-6 md:mb-16 lg:flex-row lg:items-end lg:justify-between"
                >
                    <div className="max-w-3xl">
                        <div className="mb-4 flex items-center gap-2">
                            <span className="h-px w-8 bg-yellow" />

                            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow">
                                Nossas premiações
                            </span>
                        </div>

                        <h2 className="text-3xl font-semibold leading-tight tracking-tight text-black sm:text-4xl lg:text-5xl">
                            Presentes nos momentos que{" "}
                            <span className="text-yellow">
                                merecem ser lembrados.
                            </span>
                        </h2>

                        <p className="mt-5 max-w-2xl text-sm font-medium leading-7 text-darkGray sm:text-base">
                            Medalhas e troféus desenvolvidos para transformar conquistas em lembranças. Conheça alguns dos eventos que fizeram parte da nossa história.
                        </p>
                    </div>

                    <Link href="/eventos" className="group flex w-fit items-center gap-2 text-sm font-semibold text-black transition-colors duration-300 hover:text-yellow">
                        Ver todos os eventos

                        <ArrowUpRight size={17} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {events.map((event) => (
                        <motion.article
                            key={event.id}
                            variants={item}
                            transition={{ duration: 0.55, ease: "easeOut" }}
                            className="group"
                        >
                            <Link href={`/eventos/${event.id}`} className="block">

                                <div className="relative aspect-3/4 w-full overflow-hidden rounded-2xl bg-gray/20">
                                    <Image
                                        src={event.image}
                                        alt={event.alt}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                                    />

                                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/5 to-transparent" />

                                    <div className="absolute left-4 top-4">
                                        <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                                            {event.category}
                                        </span>
                                    </div>

                                    <div className="absolute bottom-0 left-0 w-full p-5">
                                        <div className="mb-2 flex items-center gap-1.5 text-white/70">
                                            <CalendarDays size={13} />

                                            <span className="text-[11px] font-medium uppercase tracking-wider">
                                                Evento realizado
                                            </span>
                                        </div>

                                        <h3 className="text-lg font-semibold text-white">
                                            {event.title}
                                        </h3>
                                    </div>
                                </div>

                            </Link>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}