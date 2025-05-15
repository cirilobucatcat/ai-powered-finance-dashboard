import { month } from '@/utils/constants';
import { useState, useCallback } from 'react';

export function useDate() {

    const [currentMonth, setCurrentMonth] = useState<string>('January');

    const getCurrentMonth = useCallback(() => {
        const date = new Date();
        setCurrentMonth(month[date.getMonth()])
    }, []);

    return { currentMonth, getCurrentMonth };
}
