import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function InitialBudget() {
    return (
        <section className="w-full min-h-180 flex items-center justify-center bg-linear-to-br from-yellow-400 via-amber-500 to-orange-500 px-6 py-16">
            <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">

                <div className="flex justify-center">
                    <Image
                        src="/budgt.png"
                        width={600}
                        height={400}
                        alt="Solicitação de orçamento"
                        className="rounded-2xl shadow-xl object-cover"
                    />
                </div>

                <div className="text-white space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold leading-tight"> Solicite seu orçamento</h2>

                    <p className="text-lg opacity-90">
                        Entre em contato com nossa equipe e receba uma proposta personalizada
                        para o seu projeto. Estamos prontos para te atender com qualidade e agilidade.
                    </p>

                    <div>
                        <Link href="#budget" className="inline-block bg-white text-orange-600 font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition duration-300 hover:scale-105">
                            Solicitar Orçamento
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}