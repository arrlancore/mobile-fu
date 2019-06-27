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

export const listYear = [
  { name: 2019, value: 2019 },
  { name: 2018, value: 2018 } ]
export const listQuarter = [
  { name: 1, value: 1 },
  { name: 2, value: 2 },
  { name: 3, value: 3 },
  { name: 4, value: 4 }
]

export const kpiEndpointUpload = (key) => {
  let list = [
    {
      name: 'GPN Error',
      url: '/googledocs/error'
    },
    {
      name: 'GPN Daily',
      url: '/googledocs/daily'
    },
    {
      name: 'GPN Monthly',
      url: '/googledocs/monthly'
    }
  ]
  const result = list.filter(file => file.name === key)
  return result[0]
}
