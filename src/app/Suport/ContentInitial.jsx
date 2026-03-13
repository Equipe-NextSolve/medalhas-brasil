import React from 'react'
import Image from 'next/image'

export default function ContentInitial() {
    return (
        <section className="relative flex items-center justify-center w-full min-h-[600px] px-6 py-20 overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">

            <div className="absolute w-[500px] h-[500px] bg-green-500/20 blur-[120px] rounded-full top-[-150px] left-[-150px]"></div>

            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-16 max-w-6xl w-full">

                <div className="flex flex-col justify-center max-w-xl text-center lg:text-left">
                    <h1 className="text-3xl md:text-4xl font-semibold text-white [text-shadow:2px_2px_10px_rgba(0,0,0,0.6)]">
                        Política de Privacidade e Segurança de Dados
                    </h1>

                    <div className="w-40 h-1 bg-green-400 rounded mt-4 mb-6 mx-auto lg:mx-0"></div>

                    <p className="text-zinc-300 leading-relaxed">
                        Prezamos pela segurança das suas informações. Nossa política de
                        privacidade garante transparência, proteção e responsabilidade
                        no tratamento dos dados dos nossos clientes.
                    </p>
                </div>

                <div className="flex justify-center w-full max-w-lg">
                    <Image
                        src="/politic.png"
                        width={800}
                        height={500}
                        alt="Política de Privacidade"
                        className="rounded-xl shadow-2xl object-cover"
                    />
                </div>

            </div>
        </section>
    )
}