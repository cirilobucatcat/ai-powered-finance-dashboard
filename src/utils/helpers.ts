
export const formatToCurrency = (value: number) => {
    const formatter = Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
    })

    return formatter.format(value)
}

export const formatToDate = (value: string) => {
    let date = new Date(value)

    const formatted = new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(date);

    return formatted;
}

export const getFiveYears = (year: number = (new Date()).getFullYear()) => {
    let years = []
    for (let i = 4; i >= 0; i--) {
        years.push(year - i)
    }
    return years
}