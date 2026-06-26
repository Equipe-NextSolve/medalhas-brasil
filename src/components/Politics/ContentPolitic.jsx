'use client'
import { motion } from "framer-motion"

export default function ContentPolitic() {

    const containerVariant = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 }
        }
    }

    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    }

    return (
        <section className="relative flex items-center justify-center w-full min-h-[85vh] px-4 py-16 md:py-28 overflow-hidden bg-white">

            <div className="absolute w-75 md:w-150 h-75 md:h-150 bg-blue/5 blur-[80px] md:blur-[130px] rounded-full top-[-10%] left-[-10%] pointer-events-none"></div>
            <div className="absolute w-62.5 md:w-125 h-62.5 md:h-125 bg-yellow/5 blur-[80px] md:blur-[120px] rounded-full bottom-[-10%] right-[-5%] pointer-events-none"></div>

            <div className="absolute hidden lg:block right-12 top-1/4 w-32 h-32 border-t-4 border-r-4 border-gray/20 rounded-tr-3xl pointer-events-none" />
            <div className="absolute hidden lg:block left-12 bottom-1/4 w-24 h-24 border-b-4 border-l-4 border-gray/20 rounded-bl-3xl pointer-events-none" />

            <div className="relative max-w-5xl w-full z-10 text-center mx-auto">

                <motion.div
                    variants={containerVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-col items-center justify-center w-full"
                >
                    <motion.span
                        variants={fadeInUp}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue/5 border border-blue/10 text-blue font-bold text-xs md:text-sm tracking-wider uppercase mb-6"
                    >
                        <span className="w-2 h-2 rounded-full bg-[#038C4C] animate-pulse"></span>
                        Ambiente 100% Seguro e Homologado
                    </motion.span>

                    <motion.h1
                        variants={fadeInUp}
                        className="text-4xl sm:text-5xl md:text-6xl font-black text-black tracking-tight leading-[1.1] max-w-4xl"
                    >
                        Sua Privacidade Conduzida com <span className="text-blue">Transparência</span> e Rigor
                    </motion.h1>

                    <motion.div
                        variants={fadeInUp}
                        className="flex items-center gap-2 my-8"
                    >
                        <div className="w-12 h-1 bg-gray rounded"></div>
                        <div className="w-4 h-1 bg-yellow rounded"></div>
                        <div className="w-12 h-1 bg-blue rounded"></div>
                    </motion.div>

                    <motion.p
                        variants={fadeInUp}
                        className="text-gray text-lg md:text-xl md:leading-relaxed max-w-3xl font-normal text-balance"
                    >
                        Bem-vindo ao nosso portal de diretrizes de segurança. Aqui, detalhamos como nossa infraestrutura digital protege sua identidade e seus ativos de informação. Operamos sob os mais rígidos padrões internacionais de governança de dados para assegurar sua total tranquilidade.
                    </motion.p>

                    <motion.div
                        variants={fadeInUp}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 w-full max-w-4xl mt-12 md:mt-16 text-left"
                    >
                        <div className="bg-white border border-gray/30 p-6 rounded-xl shadow-xs transition-all hover:shadow-md hover:border-blue/30 group">
                            <div className="w-1.5 h-8 bg-blue rounded-full mb-4 group-hover:h-10 transition-all"></div>
                            <h3 className="font-bold text-black text-lg mb-1">Criptografia Ativa</h3>
                            <p className="text-darkGray/70 text-sm">Proteção ponta a ponta em todas as transações e interações em nossa plataforma.</p>
                        </div>

                        <div className="bg-white border border-gray/30 p-6 rounded-xl shadow-xs transition-all hover:shadow-md hover:border-gray/30 group">
                            <div className="w-1.5 h-8 bg-green rounded-full mb-4 group-hover:h-10 transition-all"></div>
                            <h3 className="font-bold text-black text-lg mb-1">Conformidade Legal</h3>
                            <p className="text-darkGray/70 text-sm">Estrutura jurídica estritamente alinhada às normativas vigentes e boas práticas.</p>
                        </div>

                        <div className="bg-white border border-gray/30 p-6 rounded-xl shadow-xs transition-all hover:shadow-md hover:border-yellow/30 group">
                            <div className="w-1.5 h-8 bg-yellow rounded-full mb-4 group-hover:h-10 transition-all"></div>
                            <h3 className="font-bold text-black text-lg mb-1">Zero Compartilhamento</h3>
                            <p className="text-darkGray/70 text-sm">Garantia contratual de que seus dados nunca serão cedidos ou comercializados.</p>
                        </div>
                    </motion.div>

                </motion.div>

            </div>
        </section>
    )
}