import DashboardCard from "@/components/DashboardCard";
import SEO from "@/components/SEO";
import { useAuth } from "@/context/AuthContext";
import money from '@/assets/images/money.png';
import wallet from '@/assets/images/wallet.png';
import moneyBag from '@/assets/images/money-bag.png';

export default function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <>
      <SEO title="Dashboard" />
      <button onClick={logout} className="text-slate-50">Logout</button>
      <div className="p-6 w-full flex flex-col">
        <div className="col-span-full">
          <h2 className="text-electric-lime text-3xl uppercase font-bold font-sour-gummy">Welcome Back, {user?.displayName}!</h2>
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
      </div>
    </>
  );
}
