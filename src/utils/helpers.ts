
export const formatToCurrency = (value: number) => {
    let formatter = Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
    })

    return formatter.format(value)
} 