'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Mail, Phone, CalendarDays, Package, FileText } from 'lucide-react'
import { BUDGET_STATUS } from '@/data/budgets'
import { formatDate, formatDateTime } from './format'
import StatusBadge from './StatusBadge'

function Row({ icon: Icon, label, children }) {
    return (
        <div className="flex gap-3">
            <Icon size={16} className="mt-1 shrink-0 text-darkGray/50" />
            <div className="min-w-0">
                <p className="text-xs text-darkGray/50">{label}</p>
                <p className="text-sm font-medium text-black wrap-break-word">{children || '—'}</p>
            </div>
        </div>
    )
}

export default function BudgetDetail({ budget, onClose, onStatusChange }) {
    return (
        <AnimatePresence>
            {budget && (
                <>
                    <motion.div
                        className="fixed inset-0 z-40 bg-black/30 lg:hidden"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <motion.aside
                        key={budget.id}
                        className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col gap-6 overflow-y-auto bg-white p-6 shadow-2xl"
                        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                        transition={{ type: 'tween', duration: 0.25 }}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-xs text-darkGray/50">Orçamento #{budget.id}</p>
                                <h2 className="text-xl font-semibold text-black">{budget.nome}</h2>
                                {budget.nomeEmpresa && <p className="text-sm text-darkGray/70">{budget.nomeEmpresa}</p>}
                            </div>
                            <button onClick={onClose} aria-label="Fechar" className="cursor-pointer rounded-full p-1.5 hover:bg-gray/30">
                                <X size={18} />
                            </button>
                        </div>

                        <div className="flex items-center gap-3">
                            <StatusBadge status={budget.status} />
                            <select
                                value={budget.status}
                                onChange={(e) => onStatusChange(budget.id, e.target.value)}
                                className="cursor-pointer rounded-md border border-gray bg-white px-2 py-1 text-sm outline-none focus:border-yellow"
                            >
                                {Object.entries(BUDGET_STATUS).map(([key, s]) => (
                                    <option key={key} value={key}>{s.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-4 border-t border-gray/40 pt-5">
                            <Row icon={Mail} label="E-mail">{budget.email}</Row>
                            <Row icon={Phone} label="Contato">{budget.contato}</Row>
                            <Row icon={FileText} label="CPF / CNPJ">{budget.cpfCnpj}</Row>
                            <Row icon={Package} label="Produto">{budget.produto} · {budget.quantidade} un.</Row>
                            <Row icon={CalendarDays} label="Data do evento">{formatDate(budget.dataEvento)}</Row>
                            <Row icon={CalendarDays} label="Solicitado em">{formatDateTime(budget.criadoEm)}</Row>
                        </div>

                        <div className="border-t border-gray/40 pt-5">
                            <p className="mb-2 text-xs text-darkGray/50">Mensagem</p>
                            <p className="rounded-lg bg-gray/20 p-3 text-sm text-black">{budget.mensagem || '—'}</p>
                        </div>

                        <a
                            href={`mailto:${budget.email}?subject=Orçamento %23${budget.id}`}
                            className="mt-auto rounded-md bg-linear-to-r from-yellow-600 via-yellow-500 to-amber-400 py-3 text-center text-sm font-bold text-black transition hover:brightness-110"
                        >
                            Responder por e-mail
                        </a>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    )
}