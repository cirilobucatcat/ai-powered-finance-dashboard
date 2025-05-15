import { useRef, useEffect, CanvasHTMLAttributes } from 'react';
import {
    Chart,
    ChartType,
    ChartConfiguration,
    ChartData,
    ChartOptions,
} from 'chart.js/auto';

type ReusableChartProps<T extends ChartType> = CanvasHTMLAttributes<HTMLCanvasElement> & {
    type: T;
    data: ChartData<T>;
    options?: ChartOptions<T>;
}

const ReusableChart = <T extends ChartType>({
    type,
    data,
    options,
    ...props
}: ReusableChartProps <T>) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const chartRef = useRef<Chart<T> | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        const config: ChartConfiguration<T> = {
            type,
            data,
            options,
        };

        chartRef.current = new Chart(ctx, config);

        return () => {
            chartRef.current?.destroy();
        };
    }, [type, data, options]);

    return <canvas {...props} ref={canvasRef} />;
};

export default ReusableChart;
