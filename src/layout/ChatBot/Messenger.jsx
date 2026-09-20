"use client"
import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import {
    MessageSquare,
    X,
    Send,
    Sparkles,
    Trophy,
    MessageCircle,
    User,
    CheckCircle2
} from 'lucide-react'

export default function Messenger() {
    const [open, setOpen] = useState(false)
    const [activeTab, setActiveTab] = useState('chat') // 'chat' ou 'sellers'
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'bot',
            text: 'Olá! Seja bem-vindo(a) à nossa loja de Troféus e Medalhas! 🏆✨ Como posso ajudar no seu evento hoje?',
            options: [
                '🏆 Troféus Personalizados',
                '🥇 Medalhas para Campeonatos',
                '⏱️ Prazos de Entrega',
                '💬 Falar direto com Vendedor'
            ]
        }
    ])
    const [inputMessage, setInputMessage] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const boxRef = useRef(null)
    const chatEndRef = useRef(null)

    const contacts = [
        { name: "Diana", phone: "5585999863324", label: "85 99986-3324", role: "Especialista em Medalhas", avatar: "D", status: "Online" },
        { name: "Eduarda", phone: "5585997636536", label: "85 99763-6536", role: "Especialista em Troféus acrílico/metal", avatar: "E", status: "Online" },
        { name: "Marlon", phone: "5585986990288", label: "85 98699-0288", role: "Orçamentos para Grandes Eventos", avatar: "M", status: "Em atendimento" }
    ]

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    useEffect(() => {
        function handleClickOutside(event) {
            if (boxRef.current && !boxRef.current.contains(event.target)) {
                setOpen(false)
            }
        }
        if (open) document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [open])

    const getRandomSeller = () => {
        const randomIndex = Math.floor(Math.random() * contacts.length)
        return contacts[randomIndex]
    }

    const handleUserResponse = (optionText) => {
        const userMsg = { id: Date.now(), sender: 'user', text: optionText }
        setMessages((prev) => [...prev, userMsg])

        setTimeout(() => {
            let botReply = {}

            if (optionText.includes('Troféus Personalizados')) {
                setSelectedCategory('Troféus Personalizados')
                botReply = {
                    id: Date.now() + 1,
                    sender: 'bot',
                    text: 'Trabalhamos com troféus em Acrílico, Metal, Madeira e Resina, 100% customizáveis para a sua premiação! Deseja solicitar um orçamento?',
                    options: [
                        '📲 Solicitar orçamento no WhatsApp',
                        '🔄 Escolher outro assunto'
                    ]
                }
            } else if (optionText.includes('Medalhas')) {
                setSelectedCategory('Medalhas Customizadas')
                botReply = {
                    id: Date.now() + 1,
                    sender: 'bot',
                    text: 'Fabricamos medalhas fundidas em metal, acrílico e MDF para corridas, campeonatos escolares, jiu-jitsu, futebol e muito mais!',
                    options: [
                        '📲 Falar com Vendedora sobre Medalhas',
                        '🔄 Escolher outro assunto'
                    ]
                }
            } else if (optionText.includes('Prazos')) {
                botReply = {
                    id: Date.now() + 1,
                    sender: 'bot',
                    text: 'Nosso prazo padrão de produção varia de 3 a 7 dias úteis após aprovação da arte. Temos também opções de entrega expressa!',
                    options: [
                        '🚀 Preciso de entrega urgente',
                        '🔄 Escolher outro assunto'
                    ]
                }
            } else if (optionText.includes('Vendedor') || optionText.includes('WhatsApp') || optionText.includes('urgente')) {
                const seller = getRandomSeller()
                const defaultMsg = encodeURIComponent(`Olá ${seller.name}! Vim pelo site e gostaria de um orçamento para ${selectedCategory || 'Troféus e Medalhas'}.`)

                botReply = {
                    id: Date.now() + 1,
                    sender: 'bot',
                    text: `Excelente! Vou te conectar com nossa especialista **${seller.name}** para te dar um atendimento personalizado.`,
                    actionBtn: {
                        label: `Chamar ${seller.name} no WhatsApp`,
                        url: `https://wa.me/${seller.phone}?text=${defaultMsg}`
                    },
                    options: ['👥 Ver todas as vendedoras disponíveis']
                }
            } else if (optionText.includes('Ver todas as vendedoras')) {
                setActiveTab('sellers')
                return
            } else if (optionText.includes('outro assunto')) {
                botReply = {
                    id: Date.now() + 1,
                    sender: 'bot',
                    text: 'Sem problemas! Em que mais posso te ajudar?',
                    options: [
                        '🏆 Troféus Personalizados',
                        '🥇 Medalhas para Campeonatos',
                        '⏱️ Prazos de Entrega',
                        '💬 Falar direto com Vendedor'
                    ]
                }
            } else {
                const seller = getRandomSeller()
                const defaultMsg = encodeURIComponent(`Olá ${seller.name}! Vim pelo site. Minha dúvida: "${optionText}"`)

                botReply = {
                    id: Date.now() + 1,
                    sender: 'bot',
                    text: 'Entendi! Para te responder com fotos e tabela de preços completa, te convido a continuar no WhatsApp:',
                    actionBtn: {
                        label: `Falar com ${seller.name}`,
                        url: `https://wa.me/${seller.phone}?text=${defaultMsg}`
                    },
                    options: ['🔄 Menu Principal']
                }
            }

            setMessages((prev) => [...prev, botReply])
        }, 600)
    }

    const handleSendMessage = (e) => {
        e.preventDefault()
        if (!inputMessage.trim()) return
        handleUserResponse(inputMessage)
        setInputMessage('')
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans" ref={boxRef}>

            <div className={`
                transition-all duration-300 ease-in-out transform origin-bottom-right
                ${open ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'}
                mb-4 w-85 sm:w-95 h-130 rounded-2xl bg-white text-slate-800 shadow-2xl border border-slate-200 flex flex-col overflow-hidden`}>

                <div className="p-4 bg-linear-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-900 border-b border-amber-300/40 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white text-amber-600 font-bold shadow-md">
                            <Trophy className="w-5 h-5 stroke-[2.5]" />
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                        </div>
                        <div>
                            <h3 className="font-bold text-sm tracking-tight flex items-center gap-1.5 text-slate-900">
                                Assistente Virtual <Sparkles className="w-3.5 h-3.5 text-slate-900 fill-slate-900" />
                            </h3>
                            <span className="text-[11px] text-slate-800 font-medium flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 animate-pulse"></span> Responde na hora
                            </span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="p-1.5 text-slate-800 hover:text-black hover:bg-white/20 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex border-b border-slate-200 bg-slate-50 text-xs text-slate-500 font-semibold">
                    <button
                        onClick={() => setActiveTab('chat')}
                        className={`flex-1 py-2.5 text-center transition-all ${activeTab === 'chat' ? 'text-amber-600 border-b-2 border-amber-500 bg-white' : 'hover:text-slate-800'}`}>
                        Atendimento IA
                    </button>
                    <button
                        onClick={() => setActiveTab('sellers')}
                        className={`flex-1 py-2.5 text-center transition-all ${activeTab === 'sellers' ? 'text-emerald-600 border-b-2 border-emerald-500 bg-white' : 'hover:text-slate-800'}`}>
                        Nossas Vendedoras
                    </button>
                </div>

                {activeTab === 'chat' && (
                    <>
                        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                                    <div className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed shadow-sm ${msg.sender === 'user'
                                        ? 'bg-amber-500 text-slate-950 font-medium rounded-br-none'
                                        : 'bg-white text-slate-700 border border-slate-200/80 rounded-bl-none'
                                        }`}>
                                        {msg.text}
                                    </div>

                                    {msg.actionBtn && (
                                        <a
                                            href={msg.actionBtn.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-2 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-md hover:shadow-emerald-600/20">
                                            <MessageCircle className="w-4 h-4" />
                                            {msg.actionBtn.label}
                                        </a>
                                    )}

                                    {msg.options && (
                                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                                            {msg.options.map((opt, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => handleUserResponse(opt)}
                                                    className="text-[11px] bg-white hover:bg-amber-50 hover:border-amber-300 text-slate-600 hover:text-amber-800 border border-slate-200 px-3 py-1.5 rounded-full transition-all text-left shadow-2xs">
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div ref={chatEndRef} />
                        </div>

                        <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-200 flex gap-2 items-center">
                            <input
                                type="text"
                                placeholder="Digite sua dúvida aqui..."
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                className="flex-1 bg-slate-100 text-xs text-slate-800 placeholder-slate-400 rounded-xl px-3.5 py-2.5 border border-slate-200 focus:outline-none focus:border-amber-400 transition"
                            />
                            <button
                                type="submit"
                                className="p-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl transition font-medium flex items-center justify-center shadow-sm">
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </>
                )}

                {activeTab === 'sellers' && (
                    <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
                        <p className="text-xs text-slate-500 mb-2">Escolha uma de nossas especialistas para atendimento direto no WhatsApp:</p>

                        {contacts.map((contact, index) => (
                            <Link
                                key={index}
                                href={`https://wa.me/${contact.phone}?text=${encodeURIComponent(`Olá ${contact.name}! Vim pelo site de Troféus e Medalhas e gostaria de atendimento.`)}`}
                                target="_blank"
                                className="group flex items-center justify-between p-3.5 rounded-xl bg-white hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-300 transition-all shadow-2xs">
                                <div className="flex items-center gap-3">
                                    <div className="relative w-10 h-10 rounded-full bg-slate-100 group-hover:bg-emerald-100 text-slate-700 group-hover:text-emerald-700 font-bold flex items-center justify-center border border-slate-200 transition-colors">
                                        {contact.avatar}
                                        <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${contact.status === 'Online' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-sm text-slate-800 group-hover:text-emerald-700 transition-colors">
                                            {contact.name}
                                        </span>
                                        <span className="text-[11px] text-slate-500">
                                            {contact.role}
                                        </span>
                                        <span className="text-[10px] text-slate-400 mt-0.5">
                                            {contact.label}
                                        </span>
                                    </div>
                                </div>
                                <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center transition-all border border-emerald-100 group-hover:border-transparent">
                                    <MessageCircle className="w-4 h-4" />
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

            </div>

            <button
                type='button'
                onClick={() => setOpen(!open)}
                aria-label="Abrir atendimento"
                className={`relative flex items-center justify-center w-14 h-14 rounded-full shadow-xl transition-all duration-300 ${open ? 'bg-slate-800 text-white rotate-90' : 'bg-emerald-500 hover:bg-emerald-600 text-white hover:scale-110 shadow-emerald-500/30'
                    }`}>
                {open ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}

                {/* Notificação Badge */}
                {!open && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 text-[9px] font-bold text-slate-950 items-center justify-center">1</span>
                    </span>
                )}
            </button>
        </div>
    )
}