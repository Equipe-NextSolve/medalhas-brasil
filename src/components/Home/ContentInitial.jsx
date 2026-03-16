"use client"
import React from 'react'
import Image from 'next/image'
import { motion } from "framer-motion"

export default function ContentInitial() {

    const container = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15
            }
        }
    }

    const item = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    }

    const dtImage = [
        {
            id: 1,
            image: '/ilustrative1.png',
            text: 'CANIDE-CE 2026',
            alt: 'image-ilustrative'
        },
        {
            id: 2,
            image: '/ilustrative2.png',
            text: 'CURSO DE APERFEIÇOAMENTO DE OFICIAIS 2019',
            alt: 'image-ilustrative'
        },
        {
            id: 3,
            image: '/ilustrative3.png',
            text: 'MARATONA RIOCITY 2024',
            alt: 'image-ilustrative'
        },
    ]

    return (
        <section className='relative w-full min-h-[80vh] py-16 overflow-hidden bg-gradient-to-br from-[#222222] via-[#262626] to-[#1a1a1a]'>

            {/* blur reduzido (mais leve no mobile) */}
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#BFBFBF]/10 blur-[60px] rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#f0f0f0]/5 blur-[60px] rounded-full"></div>

            <motion.div
                className="max-w-3xl mx-auto"
                variants={item}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-center text-3xl py-9 text-white">
                    Medalhas Brasil, Medalhas e troféus de alta qualidade para todos os tipos de premiações e eventos.
                </h2>
            </motion.div>

            <motion.div
                className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6"
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >

                {dtImage.map((itemData) => (
                    <motion.div
                        key={itemData.id}
                        className="flex flex-col items-center"
                        variants={item}
                        transition={{ duration: 0.5 }}
                    >

                        <Image
                            src={itemData.image}
                            alt={itemData.alt}
                            width={350}
                            height={500}
                            sizes="(max-width: 768px) 90vw, 350px"
                            className="rounded-xl object-cover shadow-lg"
                        />

                        <p className="text-white text-center mt-4 uppercase tracking-wider text-sm">
                            {itemData.text}
                        </p>

                    </motion.div>
                ))}

            </motion.div>

        </section>
    )
}