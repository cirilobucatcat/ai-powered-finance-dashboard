import { month } from '@/utils/constants';
import { useState, useCallback } from 'react';

export function useDate() {

    const date = new Date();
    const [currentMonth, setCurrentMonth] = useState<string>('January');
    const [currentYear, setCurrentYear] = useState<number>(date.getFullYear());

    const getCurrentMonth = useCallback(() => {
        
        setCurrentMonth(month[date.getMonth()])
    }, []);

    const getCurrentYear = useCallback(() => {
        setCurrentYear(date.getFullYear())
    }, []);

    return { currentYear, currentMonth, getCurrentMonth, getCurrentYear };
}
