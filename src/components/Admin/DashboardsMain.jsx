'use client'
import { useMemo } from 'react'
import { FileText, Boxes, TrendingUp, Clock, Download, CalendarDays } from 'lucide-react'
import { budgets, BUDGET_STATUS } from '@/data/budgets'
import { formatDate } from './format'
import GlassCard from './GlassCard'
import StatusBadge from './StatusBadge'

const STATUS_COLORS = {
    novo: '#1E4DD9',
    analise: '#D99923',
    respondido: '#BFBFBF',
    fechado: '#038C4C',
    cancelado: '#ef4444',
}

// Dados ilustrativos; trocar pela API quando houver backend.
const MONTHLY = [
    { m: 'Abr', v: 9 }, { m: 'Mai', v: 14 }, { m: 'Jun', v: 11 },
    { m: 'Jul', v: 18 }, { m: 'Ago', v: 22 }, { m: 'Set', v: 16 },
]

const REPORTS = [
    { title: 'Orçamentos do mês', desc: 'Todos os pedidos recebidos no período' },
    { title: 'Desempenho por produto', desc: 'Quantidade orçada por tipo de medalha' },
    { title: 'Conversão de vendas', desc: 'Orçamentos fechados x enviados' },
    { title: 'Eventos próximos', desc: 'Calendário de entregas por data de evento' },
]

function Kpi({ icon: Icon, label, value, hint, index }) {
    return (
        <GlassCard index={index} className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <span className="text-sm text-gray">{label}</span>
                <span className="rounded-full bg-yellow/20 p-2 text-yellow"><Icon size={16} /></span>
            </div>
            <p className="text-3xl font-semibold">{value}</p>
            <p className="text-xs text-gray/70">{hint}</p>
        </GlassCard>
    )
}

export default function DashboardsMain() {
    const data = useMemo(() => {
        const total = budgets.length
        const counts = Object.fromEntries(Object.keys(BUDGET_STATUS).map((k) => [k, 0]))
        budgets.forEach((b) => { counts[b.status]++ })

        const medals = budgets.reduce((sum, b) => sum + b.quantidade, 0)
        const conversion = Math.round((counts.fechado / total) * 100)
        const open = counts.novo + counts.analise

        const byProduct = Object.entries(
            budgets.reduce((acc, b) => ({ ...acc, [b.produto]: (acc[b.produto] || 0) + b.quantidade }), {})
        ).sort((a, b) => b[1] - a[1])

        const upcoming = budgets
            .filter((b) => b.status !== 'cancelado')
            .sort((a, b) => a.dataEvento.localeCompare(b.dataEvento))
            .slice(0, 5)

        let acc = 0
        const donut = Object.keys(BUDGET_STATUS)
            .map((k) => {
                const start = acc
                acc += (counts[k] / total) * 100
                return `${STATUS_COLORS[k]} ${start}% ${acc}%`
            })
            .join(', ')

        return { total, counts, medals, conversion, open, byProduct, upcoming, donut }
    }, [])

    // Gráfico de área (SVG)
    const W = 300, H = 110
    const max = Math.max(...MONTHLY.map((d) => d.v)) * 1.15
    const pts = MONTHLY.map((d, i) => [(i / (MONTHLY.length - 1)) * W, H - (d.v / max) * H])
    const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0]},${p[1]}`).join(' ')
    const area = `${line} L${W},${H} L0,${H} Z`
    const maxProduct = data.byProduct[0][1]

    return (
        <div className="relative min-h-screen overflow-hidden bg-black p-4 sm:p-8">


            <main className="relative mx-auto flex max-w-6xl flex-col gap-5 z-30">
                <div className="flex flex-wrap items-end justify-between gap-3 text-white">
                    <div>
                        <h1 className="text-3xl font-semibold">Dashboards</h1>
                        <p className="text-sm text-gray">Visão geral dos orçamentos e desempenho</p>
                    </div>
                    <span className="rounded-full border border-white/15 bg-white/6 px-4 py-1.5 text-sm text-gray backdrop-blur-xl">
                        Últimos 6 meses
                    </span>
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <Kpi index={0} icon={FileText} label="Orçamentos" value={data.total} hint="Total recebido" />
                    <Kpi index={1} icon={Boxes} label="Medalhas orçadas" value={data.medals.toLocaleString('pt-BR')} hint="Soma das quantidades" />
                    <Kpi index={2} icon={TrendingUp} label="Conversão" value={`${data.conversion}%`} hint={`${data.counts.fechado} pedidos fechados`} />
                    <Kpi index={3} icon={Clock} label="Em aberto" value={data.open} hint="Novos + em análise" />
                </div>

                {/* Evolução + status */}
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
                    <GlassCard index={4} className="lg:col-span-8">
                        <h2 className="mb-1 font-semibold">Orçamentos por mês</h2>
                        <p className="mb-4 text-xs text-gray/70">Evolução dos pedidos recebidos</p>
                        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="h-44 w-full">
                            <defs>
                                <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#D99923" stopOpacity="0.55" />
                                    <stop offset="100%" stopColor="#D99923" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <path d={area} fill="url(#areaFill)" />
                            <path d={line} fill="none" stroke="#D99923" strokeWidth="2.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
                        </svg>
                        <div className="mt-2 flex justify-between text-xs text-gray/70">
                            {MONTHLY.map((d) => <span key={d.m}>{d.m}</span>)}
                        </div>
                    </GlassCard>

                    <GlassCard index={5} className="lg:col-span-4">
                        <h2 className="mb-4 font-semibold">Status dos pedidos</h2>
                        <div className="flex items-center gap-5">
                            <div className="relative h-32 w-32 shrink-0 rounded-full" style={{ background: `conic-gradient(${data.donut})` }}>
                                <div className="absolute inset-4 flex flex-col items-center justify-center rounded-full bg-black/80 backdrop-blur-xl">
                                    <span className="text-2xl font-semibold">{data.total}</span>
                                    <span className="text-[10px] text-gray">pedidos</span>
                                </div>
                            </div>
                            <ul className="flex flex-col gap-1.5 text-xs">
                                {Object.entries(BUDGET_STATUS).map(([k, s]) => (
                                    <li key={k} className="flex items-center gap-2">
                                        <span className="h-2.5 w-2.5 rounded-full" style={{ background: STATUS_COLORS[k] }} />
                                        <span className="text-gray">{s.label}</span>
                                        <span className="ml-auto font-medium">{data.counts[k]}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </GlassCard>
                </div>

                {/* Produtos + eventos */}
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
                    <GlassCard index={6} className="lg:col-span-7">
                        <h2 className="mb-1 font-semibold">Quantidade por produto</h2>
                        <p className="mb-4 text-xs text-gray/70">Total de unidades orçadas</p>
                        <div className="flex flex-col gap-3">
                            {data.byProduct.map(([name, qty]) => (
                                <div key={name}>
                                    <div className="mb-1 flex justify-between text-xs">
                                        <span className="text-gray">{name}</span>
                                        <span className="font-medium">{qty.toLocaleString('pt-BR')}</span>
                                    </div>
                                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                                        <div
                                            className="h-full rounded-full bg-linear-to-r from-yellow-600 via-yellow-500 to-amber-400"
                                            style={{ width: `${(qty / maxProduct) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </GlassCard>

                    <GlassCard index={7} className="lg:col-span-5">
                        <h2 className="mb-4 flex items-center gap-2 font-semibold">
                            <CalendarDays size={16} className="text-yellow" /> Próximos eventos
                        </h2>
                        <ul className="flex flex-col divide-y divide-white/10">
                            {data.upcoming.map((b) => (
                                <li key={b.id} className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-medium">{b.nomeEmpresa || b.nome}</p>
                                        <p className="text-xs text-gray/70">{formatDate(b.dataEvento)} · {b.quantidade} un.</p>
                                    </div>
                                    <StatusBadge status={b.status} />
                                </li>
                            ))}
                        </ul>
                    </GlassCard>
                </div>

                {/* Relatórios disponíveis */}
                <GlassCard index={8}>
                    <h2 className="mb-4 font-semibold">Relatórios disponíveis</h2>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {REPORTS.map((r) => (
                            <div key={r.title} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                                <div>
                                    <p className="text-sm font-medium">{r.title}</p>
                                    <p className="text-xs text-gray/70">{r.desc}</p>
                                </div>
                                <button
                                    disabled
                                    title="Em breve"
                                    className="flex cursor-not-allowed items-center gap-1.5 rounded-full bg-yellow/20 px-3 py-1.5 text-xs font-medium text-yellow opacity-60"
                                >
                                    <Download size={14} /> Exportar
                                </button>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            </main>
        </div>
    )
}