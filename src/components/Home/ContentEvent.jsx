"use client"
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ContentEvent() {

    const fadeLeft = {
        hidden: { opacity: 0, x: -80 },
        visible: { opacity: 1, x: 0 }
    };

    const fadeRight = {
        hidden: { opacity: 0, x: 80 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <section className="relative w-full py-20 bg-gradient-to-br from-[#f0f0f0] via-[#e9e9e9] to-[#BFBFBF] overflow-hidden" id="about">

            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-white/40 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#BFBFBF]/30 blur-[120px] rounded-full"></div>

            <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

                <motion.div
                    className="flex flex-col"
                    variants={fadeLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >

                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-snug">
                        Troféus e Medalhas Perfeitos para o Seu Evento!!
                    </h2>

                    <div className="w-48 h-1 bg-gray-300 rounded mt-4 mb-6"></div>

                    <p className="text-gray-700 leading-relaxed mb-4">
                        Na Medalhas Brasil, somos especialistas na criação de troféus e
                        medalhas personalizadas para todo o Brasil. Atendemos diversos tipos
                        de esportes, campeonatos e eventos, produzindo peças exclusivas que
                        valorizam o seu evento exatamente do jeito que você imagina.
                    </p>

                    <p className="text-gray-700 leading-relaxed mb-4">
                        Sabemos que cada competição e celebração merece reconhecimento à
                        altura. Por isso, dedicamos todo o nosso trabalho e atenção ao seu
                        projeto, trazendo qualidade, destaque e autoridade para o seu
                        evento.
                    </p>

                    <p className="text-gray-700 leading-relaxed mb-8">
                        Não perca essa oportunidade de transformar sua ideia em realidade.
                        Fale agora com um de nossos especialistas e vamos tirar esses planos
                        do papel!
                    </p>

                    <motion.div whileHover={{ scale: 1.05 }}>
                        <Link href="/About" className="w-fit bg-darkGray text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-800 transition-all duration-300" >
                            Saiba mais sobre nossa Empresa
                        </Link>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="flex justify-center"
                    variants={fadeRight}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="rounded-xl overflow-hidden shadow-xl">
                        <Image
                            src="/ilustrative4.png"
                            alt="Troféu esportivo"
                            width={500}
                            height={650}
                            className="object-cover"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}