import { BUDGET_STATUS } from '@/data/budgets'

export default function StatusBadge({ status }) {
    const s = BUDGET_STATUS[status]
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap ${s.className}`}>
            {s.label}
        </span>
    )
}