export const listMonths = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'
]

export function getMonthByQuarter (quarter) {
  if (!quarter) return null
  const end = quarter * 3
  const start = end - 3
  const monthByQuarters = listMonths.slice(start, end)
  return monthByQuarters.map(month => ({ value: month, name: month }))
}

export const getNumberOfMonth = (selectedMonth) =>
  listMonths.findIndex(month => month === selectedMonth) + 1

function generateYears(startYear = 2000) {
  let currentYear = new Date().getFullYear()
  let listYears = []
  while (currentYear !== startYear) {
    listYears.push({ name: currentYear, value: currentYear })
    currentYear--
  }
  return listYears
}

export const listYear = generateYears()

export const listQuarter = [
  { name: 1, value: 1 },
  { name: 2, value: 2 },
  { name: 3, value: 3 },
  { name: 4, value: 4 }
]
