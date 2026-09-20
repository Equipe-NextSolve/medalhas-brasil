"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

import { products } from "@/data/products";

const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, }, },
};

const item = {
    hidden: { opacity: 0, y: 25, },
    visible: { opacity: 1, y: 0, },
};

export default function CardsMedal() {
    const featuredProducts = products.slice(0, 6);

    return (
        <section id="catalogo" className="w-full bg-white py-20 md:py-24 lg:py-28">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

                <div className="mb-12 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-2xl">
                        <div className="mb-3 flex items-center gap-3">
                            <span className="h-px w-8 bg-yellow" />

                            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow">
                                Produtos em destaque
                            </span>
                        </div>

                        <h2 className="text-3xl font-semibold tracking-tight text-black md:text-4xl">
                            Premiações feitas para{" "}
                            <span className="text-yellow">
                                grandes conquistas.
                            </span>
                        </h2>

                        <p className="mt-4 max-w-xl text-sm font-medium leading-7 text-darkGray md:text-base">
                            Conheça alguns dos nossos troféus, medalhas e produtos desenvolvidos para tornar cada conquista ainda mais especial.
                        </p>
                    </div>

                    <Link href="/produtos" className="group flex w-fit items-center gap-2 text-sm font-semibold text-black transition-colors duration-300 hover:text-yellow">
                        Ver todos os produtos

                        <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {featuredProducts.map((product) => (
                        <motion.article
                            key={product.id}
                            variants={item}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="group"
                        >

                            <div className="relative overflow-hidden rounded-2xl bg-gray/20">
                                <Link href={`/products/${product.id}`} className="relative block aspect-4/4.5 w-full overflow-hidden">
                                    <Image
                                        src={product.image}
                                        alt={product.alt || product.name}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                                    />

                                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />

                                    {product.category && (
                                        <span className="absolute left-4 top-4 rounded-full border border-gray/30 bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-black backdrop-blur-md">
                                            {product.category}
                                        </span>
                                    )}

                                    <div className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:block">
                                        <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-semibold text-black shadow-lg">
                                            <Eye size={15} />

                                            Ver produto
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className="px-1 pt-5">
                                {product.category && (
                                    <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-darkGray">
                                        {product.category}
                                    </span>
                                )}

                                <Link href={`/products/${product.id}`}>
                                    <h3 className="line-clamp-2 text-base font-semibold leading-snug text-black transition-colors duration-300 hover:text-yellow md:text-lg">
                                        {product.name}
                                    </h3>
                                </Link>

                                <div className="mt-4 flex items-end justify-between gap-4">
                                    <div>
                                        {product.price ? (
                                            <>
                                                <span className="block text-xs font-medium text-darkGray">
                                                    A partir de
                                                </span>

                                                <span className="mt-0.5 block text-lg font-semibold text-black">
                                                    {Number(product.price).toLocaleString("pt-BR", {
                                                        style: "currency",
                                                        currency: "BRL",
                                                    })}
                                                </span>
                                            </>
                                        ) : (
                                            <span className="text-sm font-semibold text-darkGray">
                                                Consulte o valor
                                            </span>
                                        )}
                                    </div>

                                    <Link
                                        href={`/products/${product.id}`}
                                        aria-label={`Ver ${product.name}`}
                                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-white transition-all duration-300 hover:bg-yellow hover:text-black"
                                    >
                                        <ShoppingBag size={18} strokeWidth={1.8} />
                                    </Link>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}