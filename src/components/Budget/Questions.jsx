'use client'
import { useState } from 'react'

const faqs = [
    {
        question: "Tempo de Produção?",
        answer: "Mínimo de 20 a 30 dias úteis, dependendo do produto. Sem contar o tempo de entrega."
    },
    {
        question: "Transportadora?",
        answer: "A transportadora é escolhida pelo cliente, normalmente usamos o Melhor Envio, onde conseguimos os melhores valores, mas vai do cliente também."
    },
    {
        question: "Quantidade Mínima de produção?",
        answer: "Na Medalhas Brasil a quantidade mínima é de 100 à 300 unidades, dependendo do produto, os valores mudam."
    },
    {
        question: "Como faço um orçamento?",
        answer: "Basta preencher o formulário de orçamento em nosso site ou entrar em contato diretamente pelo WhatsApp ou e-mail."
    },
    {
        question: "Posso personalizar o produto?",
        answer: "Sim! Todos os nossos produtos são personalizáveis com sua logo, cores e arte. Nossa equipe auxilia no processo."
    }
]

export default function Questions() {
    const [openIndex, setOpenIndex] = useState(null)

    function toggle(index) {
        setOpenIndex(prev => prev === index ? null : index)
    }

    return (
        <section className="w-full max-w-3xl mx-auto px-4 pb-10 flex flex-col gap-2">
            {faqs.map((faq, index) => (
                <div
                    key={index}
                    className="border-b border-white/10 pb-4"
                >
                    <button
                        onClick={() => toggle(index)}
                        className="w-full flex justify-between items-center text-left gap-4 py-2 cursor-pointer group"
                    >
                        <span className="text-yellow font-semibold text-base group-hover:brightness-125 transition-all duration-200">
                            {faq.question}
                        </span>
                        <span className={`text-yellow text-xl transition-transform duration-300 ${openIndex === index ? 'rotate-45' : 'rotate-0'}`}>
                            +
                        </span>
                    </button>

                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                        <p className="text-Darkgray text-lx leading-relaxed">
                            {faq.answer}
                        </p>
                    </div>
                </div>
            ))}
        </section>
    )
}