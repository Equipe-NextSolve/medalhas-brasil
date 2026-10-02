'use client'
import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { budgets as initialBudgets, BUDGET_STATUS } from '@/data/budgets'
import { formatDate, formatDateTime } from './format'
import StatusBadge from './StatusBadge'
import BudgetDetail from './BudgetDetail'


const FILTERS = [['todos', 'Todos'], ...Object.entries(BUDGET_STATUS).map(([k, v]) => [k, v.label])]

export default function AdminMain() {
    const [budgets, setBudgets] = useState(initialBudgets)
    const [filter, setFilter] = useState('todos')
    const [query, setQuery] = useState('')
    const [selectedId, setSelectedId] = useState(null)

    const counts = useMemo(() => {
        const c = { todos: budgets.length }
        budgets.forEach((b) => { c[b.status] = (c[b.status] || 0) + 1 })
        return c
    }, [budgets])

    const visible = useMemo(() => {
        const q = query.trim().toLowerCase()
        return budgets.filter((b) =>
            (filter === 'todos' || b.status === filter) &&
            (!q || [b.nome, b.nomeEmpresa, b.email, b.produto].some((v) => v.toLowerCase().includes(q)))
        )
    }, [budgets, filter, query])

    const selected = budgets.find((b) => b.id === selectedId) ?? null

    function changeStatus(id, status) {
        setBudgets((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)))
    }

    return (
        <>
            <main className="mx-auto flex max-w-6xl flex-col gap-6 p-4 sm:p-8">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-semibold text-black">Orçamentos</h1>
                        <p className="text-sm text-darkGray/60">{budgets.length} pedidos recebidos</p>
                    </div>
                    <div className="relative w-full sm:w-72">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-darkGray/40" />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Buscar por nome, e-mail, produto..."
                            className="w-full rounded-full border border-gray/60 bg-white py-2 pl-9 pr-4 text-sm outline-none focus:border-yellow"
                        />
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    {FILTERS.map(([key, label]) => (
                        <button
                            key={key}
                            onClick={() => setFilter(key)}
                            className={`cursor-pointer rounded-full border px-3.5 py-1 text-sm transition-colors ${
                                filter === key ? 'border-black bg-black text-white' : 'border-gray/60 bg-white hover:border-yellow'
                            }`}
                        >
                            {label} <span className="opacity-60">{counts[key] ?? 0}</span>
                        </button>
                    ))}
                </div>

                <div className="overflow-x-auto rounded-2xl border border-gray/40 bg-white shadow-sm">
                    <table className="w-full min-w-200 text-left text-sm">
                        <thead>
                            <tr className="border-b border-gray/40 text-xs uppercase tracking-wide text-darkGray/50">
                                {['Cliente', 'E-mail', 'Produto', 'Qtd.', 'Evento', 'Solicitado', 'Status'].map((h) => (
                                    <th key={h} className="px-4 py-3 font-medium">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {visible.map((b) => (
                                <tr
                                    key={b.id}
                                    onClick={() => setSelectedId(b.id)}
                                    className={`cursor-pointer border-b border-gray/20 transition-colors last:border-0 ${
                                        b.id === selectedId ? 'bg-yellow/30' : 'hover:bg-yellow/10'
                                    }`}
                                >
                                    <td className="px-4 py-3">
                                        <p className="font-medium text-black">{b.nome}</p>
                                        {b.nomeEmpresa && <p className="text-xs text-darkGray/50">{b.nomeEmpresa}</p>}
                                    </td>
                                    <td className="px-4 py-3 text-darkGray/70">{b.email}</td>
                                    <td className="px-4 py-3">{b.produto}</td>
                                    <td className="px-4 py-3">{b.quantidade}</td>
                                    <td className="px-4 py-3">{formatDate(b.dataEvento)}</td>
                                    <td className="px-4 py-3 text-darkGray/60">{formatDateTime(b.criadoEm)}</td>
                                    <td className="px-4 py-3"><StatusBadge status={b.status} /></td>
                                </tr>
                            ))}
                            {visible.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-4 py-12 text-center text-darkGray/50">
                                        Nenhum orçamento encontrado.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>

             <BudgetDetail budget={selected} onClose={() => setSelectedId(null)} onStatusChange={changeStatus} />
        </>       
    )      
}