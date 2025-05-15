import DashboardCard from '@/components/DashboardCard';
import SEO from '@/components/SEO';
import { useAuth } from '@/context/AuthContext';
import money from '@/assets/images/money.png';
import wallet from '@/assets/images/wallet.png';
import moneyBag from '@/assets/images/money-bag.png';
import CChart from '@/components/CChart';
import { ChartData } from 'chart.js';
import { useEffect, useState } from 'react';
import { listen } from '@/services/dashboard';
import { DashboardCountData } from '@/types';
import { formatToCurrency } from '@/utils/helpers';
import { useDate } from '@/hooks/date';
import { month } from '@/utils/constants';

export default function Dashboard() {
  const { user } = useAuth();
  const { currentMonth, getCurrentMonth } = useDate()
  const [dashboardCount, setDashboardCount] = useState<DashboardCountData>({
    monthExpense: 0,
    monthIncome: 0,
    monthSaving: 0,
  });

  const barChartData: ChartData<'bar'> = {
    labels: month,
    datasets: [
      {
        label: 'Income',
        data: [12, 20, 10, 50, 10, 10, 19, 3],
        borderWidth: 1,
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, 'rgba(35, 35, 255, 1)');

          gradient.addColorStop(1, 'rgba(29,41,61, 0)');
          return gradient;
        },
        borderColor: 'rgba(35, 35, 255, 1)',
      },
      {
        label: 'Expenses',
        data: [20, 10, 50, 10, 10, 12, 15, 10],
        borderWidth: 1,
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, 'rgba(255, 24, 24, 1)');
          gradient.addColorStop(1, 'rgba(29,41,61, 0)');
          return gradient;
        },
        borderColor: 'rgba(255, 24, 24, 1)',
      },
      {
        label: 'Savings',
        data: [10, 9, 1, 20, 10, 50, 10, 10],
        borderWidth: 1,
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, 'rgba(57, 255, 20, 1)');
          gradient.addColorStop(1, 'rgba(29,41,61, 0)');
          return gradient;
        },
        borderColor: 'rgba(57, 255, 20, 1)',
      },
    ],
  };

  const lineChartData: ChartData<'line'> = {
    labels: month,
    datasets: [
      {
        label: 'Income',
        data: [12, 20, 10, 50, 10, 10, 19, 3],
        borderWidth: 1,
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, 'rgba(35, 35, 255, 1)');

          gradient.addColorStop(1, 'rgba(29,41,61, 0)');
          return gradient;
        },
        borderColor: 'rgba(35, 35, 255, 1)',
      },
      {
        label: 'Expenses',
        data: [20, 10, 50, 10, 10, 12, 15, 10],
        borderWidth: 1,
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, 'rgba(255, 24, 24, 1)');
          gradient.addColorStop(1, 'rgba(29,41,61, 0)');
          return gradient;
        },
        borderColor: 'rgba(255, 24, 24, 1)',
      },
    ],
  };

  useEffect(() => {

    getCurrentMonth();

    const unsubscribe = listen((data) => {
      setDashboardCount(data);
      return data;
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <SEO title='Dashboard' />
      <div className='p-6 w-full flex flex-col'>
        <div className='col-span-full'>
          <h2 className='text-electric-lime text-3xl sm:text-xl uppercase font-bold font-tomorrow'>
            Welcome Back, {user?.displayName}!
          </h2>
          <p className='text-slate-300 text-base sm:text-sm font-medium'>
            Good to see you again
          </p>
        </div>
        <p className='text-slate-50 text-base font-bold tracking-wide mt-4 mb-3'>
          Overview
        </p>
        <div className='flex flex-col md:flex-row items-center justify-center gap-4'>
          <DashboardCard
            title={`Total Income this month (${currentMonth})`}
            icon={<img src={money} width={40} />}
            amount={formatToCurrency(dashboardCount.monthIncome)}
          />
          <DashboardCard
            title={`Total Expenses this month (${currentMonth})`}
            icon={<img src={wallet} width={40} />}
            amount={formatToCurrency(dashboardCount.monthExpense)}
          />
          <DashboardCard
            title={`Total Saving this month (${currentMonth})`}
            icon={<img src={moneyBag} width={40} />}
            amount={formatToCurrency(dashboardCount.monthSaving)}
            percentageDetail={{
              value: ((dashboardCount.monthSaving / dashboardCount.monthIncome) * 100),
              description: 'Saving rate'
            }}
          />
        </div>
        <div className=' my-4 grid grid-cols-1 md:grid-cols-6 gap-4'>
          <div className='bg-slate-900 p-6 rounded-lg col-span-full'>
            <CChart
              type='line'
              data={lineChartData}
              options={{
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: 'Income vs Expense'
                  },
                },
                scales: {
                  y: {
                    min: 0,
                    max: 10_000,
                  }
                }
              }}
            />
          </div>
          <div className='bg-slate-900 p-6 rounded-lg col-span-3'>
            <CChart
              type='bar'
              data={barChartData}
              options={{
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: ''
                  }
                }
              }}
            />
          </div>
          <div className='bg-slate-900 p-6 rounded-lg col-span-3'>
            <CChart
              type='bar'
              data={barChartData}
              options={{ responsive: true }}
            />
          </div>
        </div>
        <div className='mb-4 bg-slate-900 py-4 rounded-lg px-6'>
          <p className='text-slate-50 font-bold tracking-wide mb-2 text-xl'>
            AI Insight
          </p>
          <p className='text-slate-100 text-justify text-sm'>
            ✨Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Accusantium ipsum illum corrupti distinctio ratione et, vitae
            repudiandae, consequatur doloribus ipsa quis qui temporibus eveniet
            ducimus consectetur laboriosam. Nihil cupiditate aperiam quidem
            asperiores nostrum fuga repellat sunt officiis, necessitatibus
            veniam reiciendis vitae nulla earum consequuntur ratione saepe optio
            corporis culpa quae.
          </p>
        </div>
      </div>
    </>
  );
}
