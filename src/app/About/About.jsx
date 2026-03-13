"use client"
import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"

export default function About() {
    return (
        <section className="w-full bg-gray-100 py-20">
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -80 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="flex justify-center"
                >
                    <Image
                        width={500}
                        height={700}
                        alt="Marlon Ferrari"
                        src="/manager.png"
                        className="rounded-xl shadow-lg object-cover"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 80 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
                        Marlon Ferrari
                    </h1>

                    <div className="w-20 h-[3px] bg-blue-600 mt-2 mb-6"></div>

                    <p className="text-gray-700 leading-relaxed space-y-4">
                        Muito prazer, meu nome é Marlon Alessandro Ferrari. Sou empresário há mais de 30 anos no segmento de acessórios, sempre buscando inovação e qualidade em cada projeto que desenvolvo.
                        <br /><br />
                        Minha trajetória começou com a produção de acessórios para calças jeans, além de itens elegantes e decorativos voltados para marcas de bolsas e moda. Com o passar dos anos, ampliei minha atuação no mercado e fundei a empresa Flowfun, onde trabalhamos com garrafas térmicas e diversos acessórios exclusivos.
                        <br /><br />
                        Com toda essa experiência no mercado e visão empreendedora, decidi também fundar a Medalhas Brasil, uma empresa criada com o objetivo de oferecer troféus e medalhas de alta qualidade para campeonatos, eventos e premiações.
                        <br /><br />
                        Todos os produtos da Medalhas Brasil são autênticos, desenvolvidos com dedicação, criatividade e profissionalismo.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}