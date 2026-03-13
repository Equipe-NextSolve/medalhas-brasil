"use client"
import React from 'react'
import Image from 'next/image'
import { motion } from "framer-motion"

export default function ContentInitial() {
    const fadeUp = {
        hidden: { opacity: 0, y: 80 },
        visible: { opacity: 1, y: 0 }
    }

    const dtImage = [
        {
            id: 1,
            image: '/ilustrative1.png',
            text: 'CANIDE-CE 2026',
            alt: 'image-ilutrative'
        },
        {
            id: 2,
            image: '/ilustrative2.png',
            text: 'CURSO DE APERFEIÇOAMENTO DE OFICIAIS 2019',
            alt: 'image-ilutrative'
        },
        {
            id: 3,
            image: '/ilustrative3.png',
            text: 'MARATONA RIOCITY 2024',
            alt: 'image-ilutrative'
        },
    ]

    return (
        <section className='relative w-full min-h-screen py-16 overflow-hidden bg-gradient-to-br from-[#222222] via-[#262626] to-[#1a1a1a]'>
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#BFBFBF]/10 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#f0f0f0]/5 blur-[140px] rounded-full"></div>

            <motion.div
                className="max-w-3xl mx-auto"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-center text-3xl py-9 text-white">Medalhas Brasil, Medalhas e troféus de alta qualidade para todos os tipos de premiações e eventos.</h2>
            </motion.div>

            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">

                {dtImage.map((item, index) => (
                    <motion.div
                        key={item.id}
                        className="flex flex-col items-center"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.8,
                            delay: index * 0.2
                        }}
                    >

                        <Image
                            src={item.image}
                            alt={item.alt}
                            width={350}
                            height={500}
                            className="rounded-xl object-cover shadow-lg"
                        />

                        <p className="text-white text-center mt-4 uppercase tracking-wider text-sm">
                            {item.text}
                        </p>

                    </motion.div>
                ))}
            </div>
        </section>
    )
}