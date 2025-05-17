
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

export const hexToRgba = (hex: string, alpha = 1) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};