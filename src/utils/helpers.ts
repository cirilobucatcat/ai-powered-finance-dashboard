
export const formatToCurrency = (value: number) => {
    const formatter = Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
    })

    return formatter.format(value)
} 