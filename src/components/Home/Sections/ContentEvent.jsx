"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const banners = [
    {
        id: "medalhas",
        image: "/images/ilustrative-01.png",
        alt: "Medalhas personalizadas para eventos e competições",
        href: "/produtos/medalhas",
    },
    {
        id: "trofeus",
        image: "/images/ilustrative-02.png",
        alt: "Troféus personalizados para eventos e competições",
        href: "/produtos/trofeus",
    },
];

const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, }, },
};

const item = {
    hidden: { opacity: 0, y: 25, },
    visible: { opacity: 1, y: 0, },
};

export default function ContentEvent() {
    return (
        <section id="about" className="w-full bg-white py-8 md:py-10 lg:py-12">
            <motion.div
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="mx-auto grid w-full max-w-345 grid-cols-1 gap-3 px-4 sm:px-6 md:grid-cols-2 lg:px-8"
            >
                {banners.map((banner) => (
                    <motion.div
                        key={banner.id}
                        variants={item}
                        transition={{
                            duration: 0.6,
                            ease: "easeOut",
                        }}
                        className="group"
                    >
                        <Link
                            href={banner.href}
                            className="relative block w-full overflow-hidden bg-gray/20"
                        >
                            <div className="relative aspect-4/5 w-full overflow-hidden">
                                <Image
                                    src={banner.image}
                                    alt={banner.alt}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                                />

                                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/5" />
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}