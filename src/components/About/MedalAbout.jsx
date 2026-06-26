'use client'
import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function MedalAbout() {

    const leftVariant = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 }
    }

    const rightVariant = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 }
    }

    const containerGrid = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    }

    const itemGrid = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
    }

    return (
        <section className="relative w-full min-h-screen flex items-center bg-[#f0f0f0] text-[#0D0D0D] py-20 md:py-28 overflow-hidden">

            {/* Efeitos sutis de luz de fundo usando a paleta oficial */}
            <div className="absolute w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-[#D99923]/5 blur-[120px] md:blur-[160px] rounded-full -top-20 -left-20 pointer-events-none"></div>
            <div className="absolute w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#1E4DD9]/4 blur-[100px] md:blur-[140px] rounded-full bottom-10 -right-20 pointer-events-none"></div>

            <div className="relative max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10 w-full">

                {/* Coluna da Esquerda: Texto Institucional e Chamada de Impacto (Ocupa 7 colunas no desktop) */}
                <motion.div
                    variants={leftVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="lg:col-span-7 space-y-6 text-left"
                >
                    <span className="text-[#D99923] font-bold text-xs md:text-sm tracking-widest uppercase mb-2 block">
                        Tradição e Qualidade
                    </span>

                    <h2 className="text-3xl md:text-5xl font-black text-[#0D0D0D] tracking-tight leading-tight">
                        Medalhas Brasil: Eternizando Conquistas e Grandes Histórias
                    </h2>

                    <div className="w-20 h-1.5 bg-[#D99923] rounded-full mt-4 mb-6"></div>

                    <div className="space-y-4 text-[#222222] text-base md:text-lg leading-relaxed antialiased">
                        <p>
                            A <strong>Medalhas Brasil</strong> consolidou-se no mercado com a missão clara de entregar muito mais do que prêmios: entregamos símbolos tangíveis de superação, mérito e vitória. Cada peça carrega o mais alto padrão de personalização, autenticidade e acabamento técnico do mercado.
                        </p>
                        <p>
                            Nosso objetivo é superar expectativas a cada projeto, desenvolvendo medalhas e troféus exclusivos para torneios, campeonatos, eventos corporativos e premiações especiais de qualquer porte.
                        </p>
                        <p className="font-medium text-[#0D0D0D]">
                            Pronto para elevar o nível da premiação do seu próximo grande evento?
                        </p>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row gap-4">
                        <Link
                            href='/budget'
                            className="inline-flex items-center justify-center px-8 py-4 bg-[#D99923] text-[#0D0D0D] font-bold rounded-xl shadow-md hover:bg-[#D99923]/90 active:scale-[0.98] transition-all text-center"
                        >
                            Solicitar orçamento personalizado
                        </Link>
                    </div>
                </motion.div>

                {/* Coluna da Direita: Substitui a imagem por Grid de Diferenciais e Valor de Marca (Ocupa 5 colunas no desktop) */}
                <motion.div
                    variants={rightVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="lg:col-span-5 w-full"
                >
                    <motion.div
                        variants={containerGrid}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6"
                    >
                        {/* Bloco Diferencial 1 */}
                        <motion.div variants={itemGrid} className="bg-white border border-[#BFBFBF]/30 p-6 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300">
                            <div className="w-10 h-10 rounded-xl bg-[#D99923]/10 flex items-center justify-center text-[#D99923] font-bold text-base mb-4">
                                ★
                            </div>
                            <h3 className="text-lg font-bold text-[#0D0D0D] mb-1">Design Exclusivo</h3>
                            <p className="text-[#222222]/80 text-sm leading-relaxed">
                                Projetos sob medida desenhados para refletir a identidade visual única e o prestígio do seu evento.
                            </p>
                        </motion.div>

                        {/* Bloco Diferencial 2 */}
                        <motion.div variants={itemGrid} className="bg-white border border-[#BFBFBF]/30 p-6 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300">
                            <div className="w-10 h-10 rounded-xl bg-[#038C4C]/10 flex items-center justify-center text-[#038C4C] font-bold text-base mb-4">
                                ✓
                            </div>
                            <h3 className="text-lg font-bold text-[#0D0D0D] mb-1">Materiais Premium</h3>
                            <p className="text-[#222222]/80 text-sm leading-relaxed">
                                Acabamento impecável, durabilidade garantida e corte de alta precisão técnica em cada troféu.
                            </p>
                        </motion.div>

                        {/* Bloco Diferencial 3 */}
                        <motion.div variants={itemGrid} className="bg-white border border-[#BFBFBF]/30 p-6 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300">
                            <div className="w-10 h-10 rounded-xl bg-[#1E4DD9]/10 flex items-center justify-center text-[#1E4DD9] font-bold text-base mb-4">
                                🤝
                            </div>
                            <h3 className="text-lg font-bold text-[#0D0D0D] mb-1">Atendimento B2B</h3>
                            <p className="text-[#222222]/80 text-sm leading-relaxed">
                                Suporte profissional desde o briefing inicial até a entrega final com cumprimento rigoroso de prazos.
                            </p>
                        </motion.div>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    )
}