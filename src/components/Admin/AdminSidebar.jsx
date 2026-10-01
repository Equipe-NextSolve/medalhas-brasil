'use client'
import Link from 'next/link'
import Image from 'next/image'
import { FileText, Wallet, CalendarRange, Users, Factory, BarChart3, Settings, ArrowLeft, X } from 'lucide-react'

const ITEMS = [
    { label: 'Orçamentos', icon: FileText, active: true },
    { label: 'Financeiro', icon: Wallet },
    { label: 'Planejamento', icon: CalendarRange },
    { label: 'Clientes', icon: Users },
    { label: 'Produção', icon: Factory },
    { label: 'Relatórios', icon: BarChart3 },
    { label: 'Configurações', icon: Settings },
]

export default function AdminSidebar({ open, onClose }) {
    return (
        <>
            {open && (
                <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onClose} />
            )}

            <aside
                className={`fixed left-0 top-0 z-50 flex h-full w-64 flex-col bg-black p-5 text-white transition-transform duration-300 lg:translate-x-0 ${
                    open ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Image src="/logo2.png" alt="Medalhas Brasil" width={32} height={32} />
                        <div className="leading-tight">
                            <p className="text-sm font-semibold">Medalhas Brasil</p>
                            <p className="text-xs text-gray">Painel administrativo</p>
                        </div>
                    </div>
                    <button onClick={onClose} aria-label="Fechar menu" className="cursor-pointer rounded-full p-1 hover:bg-white/10 lg:hidden">
                        <X size={18} />
                    </button>
                </div>

                <nav className="flex flex-1 flex-col gap-1">
                    {ITEMS.map(({ label, icon: Icon, active }) =>
                        active ? (
                            <span
                                key={label}
                                className="flex items-center gap-3 rounded-lg bg-yellow px-3 py-2.5 text-sm font-semibold text-black"
                            >
                                <Icon size={18} />
                                {label}
                            </span>
                        ) : (
                            <span
                                key={label}
                                title="Em breve"
                                className="flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray/60"
                            >
                                <Icon size={18} />
                                {label}
                                <span className="ml-auto rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-gray">Em breve</span>
                            </span>
                        )
                    )}
                </nav>

                <Link
                    href="/"
                    className="flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2.5 text-sm text-gray transition-colors hover:border-yellow hover:text-yellow"
                >
                    <ArrowLeft size={16} />
                    Voltar ao site
                </Link>
            </aside>
        </>
    )
}