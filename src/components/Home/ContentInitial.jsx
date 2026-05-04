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
            image: '/image21.jpeg',
            text: 'CIRCUITO DO PACOTI - 2026',
            alt: 'image-ilustrative'
        },
        {
            id: 3,
            image: '/image22.jpeg',
            text: 'CORRIDA VENUS 2026',
            alt: 'image-ilustrative'
        },
    ]

    return (
        <section className='relative w-full min-h-screen py-16 overflow-hidden bg-linear-to-br from-darkGray via-[#262626] to-[#1a1a1a]'>

            <div className="absolute top-0 left-0 w-25 h-25 bg-gray/10 blur-[60px] rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-25 h-25 bg-white/5 blur-[60px] rounded-full"></div>

            <motion.div
                className="max-w-3xl mx-auto"
                variants={item}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-center text-3xl py-9 text-white"> Medalhas Brasil, Medalhas e troféus de alta qualidade para todos os tipos de premiações e eventos.</h2>
            </motion.div>

            <motion.div
                className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6"
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >

                {dtImage.map((itemData) => (
                    <motion.div key={itemData.id} className="flex flex-col items-center" variants={item} transition={{ duration: 0.5 }}>
                        <div className="relative w-full aspect-3/4 max-w-87.5 overflow-hidden rounded-xl shadow-lg">
                            <Image
                                src={itemData.image}
                                alt={itemData.alt}
                                fill
                                sizes="(max-width: 768px) 90vw, 350px"
                                className="object-cover"
                            />
                        </div>

                        <p className="text-white text-center mt-4 uppercase tracking-wider text-sm">{itemData.text}</p>

                    </motion.div>
                ))}
            </motion.div>
        </section>
    )
}