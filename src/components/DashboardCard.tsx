type DashboardCardProps = {
    title: string
    icon: React.ReactNode
    amount: string
}
export default function DashboardCard({title, icon, amount} : DashboardCardProps) {
    return(
        <div className="relative w-full h-32 bg-linear-to-r from-slate-900 to-slate-800 shadow rounded-md p-4">
            <p className="text-slate-400 font-bold text-sm">{title}</p>
            <div className="rounded-full bg-slate-700 p-2 absolute top-3 right-4">{icon}</div>
            <p className="text-slate-50 font-bold text-2xl sm:text-3xl">{amount}</p>
        </div>
    )
}