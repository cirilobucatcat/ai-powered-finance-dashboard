import DashboardCard from "@/components/DashboardCard";
import SEO from "@/components/SEO";
import { useAuth } from "@/context/AuthContext";
import money from '@/assets/images/money.png';
import wallet from '@/assets/images/wallet.png';
import moneyBag from '@/assets/images/money-bag.png';
import CChart from "@/components/CChart";
import { ChartData } from "chart.js";

export default function Dashboard() {
  const { user } = useAuth();

  const barChartData: ChartData<'line'> = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: 'Votes',
        data: [12, 19, 3],
        backgroundColor: ['red', 'blue', 'yellow'],
        tension: 0.4,
        fill: true
      },
    ],
  };
  return (
    <>
      <SEO title="Dashboard" />
      <div className="p-6 w-full flex flex-col">
        <div className="col-span-full">
          <h2 className="text-electric-lime text-xl uppercase font-bold font-sour-gummy">Welcome Back, {user?.displayName}!</h2>
          <p className="text-slate-300 text-sm font-medium">Good to see you again</p>
        </div>
        <p className="text-slate-50 text-base font-bold tracking-wide mt-4 mb-3">Overview</p>
        <div className="flex flex-row items-center justify-center gap-4">
          <DashboardCard
            title="Total Income"
            icon={<img src={money} width={40} />}
            amount="₱ 10,000"
          />
          <DashboardCard
            title="Total Expenses"
            icon={<img src={wallet} width={40} />}
            amount="₱ 10,000"
          />
          <DashboardCard
            title="Total Saving"
            icon={<img src={moneyBag} width={40} />}
            amount="₱ 10,000"
          />
        </div>
        <p className="text-slate-50 text-base font-bold tracking-wide mt-4 mb-2">Overview</p>
        <div className="bg-slate-900 p-6 rounded-lg">
          <CChart type="line" data={barChartData} />
        </div>
        <div className="my-4 bg-slate-900 py-4 rounded-lg px-6">
          <p className="text-slate-50 font-bold tracking-wide mt-4 mb-2 text-xl">AI Advise</p>
          <p className="text-slate-100 text-justify text-sm">✨Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium ipsum illum corrupti distinctio ratione et, vitae repudiandae, consequatur doloribus ipsa quis qui temporibus eveniet ducimus consectetur laboriosam. Nihil cupiditate aperiam quidem asperiores nostrum fuga repellat sunt officiis, necessitatibus veniam reiciendis vitae nulla earum consequuntur ratione saepe optio corporis culpa quae.</p>
        </div>
      </div>
    </>
  );
}
