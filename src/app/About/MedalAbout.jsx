"use client"
import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"

export default function MedalAbout() {
    return (
        <section className="w-full bg-zinc-950 text-white py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-900 to-black opacity-60"></div>
            <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">

                <motion.div
                    initial={{ opacity: 0, x: -80 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                >
                    <h1 className="text-3xl md:text-4xl font-semibold">Medalhas Brasil</h1>
                    <div className="w-24 h-[3px] bg-yellow-500"></div>

                    <div className="space-y-4 text-zinc-300 leading-relaxed">
                        <p>A Medalhas Brasil chegou ao mercado com a missão de oferecer produtos de alta qualidade, trazendo personalização, autenticidade e um atendimento profissional para cada cliente.</p>
                        <p>Nosso objetivo é superar suas expectativas, oferecendo as melhores medalhas e troféus para torneios, campeonatos, eventos e premiações de todos os tipos.</p>

                        <p>Gostou do que viu em nossa página? Então não perca tempo! Entre em contato conosco agora mesmo e solicite seu orçamento.</p>

                        <p>Vamos começar a desenvolver o seu projeto da forma mais profissional possível, criando troféus e medalhas personalizados que valorizem ainda mais o seu campeonato, evento ou comemoração.</p>

                        <p>Garanta um prêmio especial, exclusivo e à altura da sua conquista.</p>
                    </div>

                    <button className="mt-4 px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition">Solicitar orçamento</button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 80 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="flex justify-center"
                >
                    <Image
                        src="/slidemedal.png"
                        width={1280}
                        height={600}
                        alt="Medalhas Brasil"
                        className="rounded-xl shadow-2xl object-cover"
                    />
                </motion.div>
            </div>
        </section>
    )
}