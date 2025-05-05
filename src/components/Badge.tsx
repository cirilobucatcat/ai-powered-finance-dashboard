import { useMemo } from "react"

const Badge = ({ type }: { type: 'income' | 'expense' }) => {

    const badgeVariant: Record<typeof type, string> = {
        expense: 'text-red-900 bg-red-50/75',
        income: 'text-green-900 bg-green-50/75'
    }

    const badge = useMemo(() => badgeVariant[type], [type])

    return (
        <p className={`w-fit rounded text-[10px] px-2 py-0.5 uppercase font-bold tracking-tighter ${badge}`}>{type}</p>
    )
}

export default Badge