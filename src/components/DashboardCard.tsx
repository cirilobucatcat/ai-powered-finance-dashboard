import React from "react"

type DashboardCardProps = {
    title: string
    icon: React.ReactNode
    amount: string
    percentageDetail?: {
        value: number,
        description: string
    }
}

export default function DashboardCard({ title, icon, amount, percentageDetail }: DashboardCardProps) {
    return (
        <div className="relative w-full h-32 bg-linear-to-r from-slate-900 to-slate-800 shadow rounded-md p-4">
            <p className="text-slate-400 font-bold text-sm">{title}</p>
            <div className="rounded-full bg-slate-700 p-2 absolute top-3 right-4">{icon}</div>
            <p className="text-slate-50 font-bold text-2xl sm:text-3xl">
                {amount}
                {percentageDetail && (<>
                    <span 
                        className={`text-sm ml-2 cursor-pointer transition-colors ${percentageDetail.value >= 50 ? 'text-green-600 hover:text-green-500' : 'text-red-600 hover:text-red-500'}`} 
                        title={percentageDetail.description}
                    >
                        ({percentageDetail.value.toFixed(2)}%)
                    </span>
                </>)}
            </p>
        </div>
    )
}