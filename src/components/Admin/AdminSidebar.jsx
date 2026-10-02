'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { FileText, Wallet, CalendarRange, Users, Factory, BarChart3, Settings, ArrowLeft, X } from 'lucide-react'

const ITEMS = [
    { label: 'Orçamentos', icon: FileText, href: '/admin' },
    { label: 'Dashboards', icon: BarChart3, href: '/admin/dashboards' },
    { label: 'Financeiro', icon: Wallet },
    { label: 'Planejamento', icon: CalendarRange },
    { label: 'Clientes', icon: Users },
    { label: 'Produção', icon: Factory },
    { label: 'Configurações', icon: Settings },
]

export default function AdminSidebar({ open, onClose }) {
    const pathname = usePathname()

    return (
        <>
            {open && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onClose} />}

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
                    {ITEMS.map(({ label, icon: Icon, href }) => {
                        if (!href) {
                            return (
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
                        }

                        const active = pathname === href
                        return (
                            <Link
                                key={label}
                                href={href}
                                onClick={onClose}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                                    active ? 'bg-yellow font-semibold text-black' : 'text-gray hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                <Icon size={18} />
                                {label}
                            </Link>
                        )
                    })}
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