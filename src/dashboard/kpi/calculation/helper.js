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

export const mergeSummaryToDoc = (listDoc, kpiSummary) => {
  const colors = [ 'red', 'yellow', 'green' ]
  let colorsDescription = []
  let colorsDescriptionIndex = []
  const summaryUpload = () => {
    return kpiSummary.data.reduce((acc, value) => {
      let data = acc
      data[value.doc_id] = data[value.doc_id] ? [ ...data[value.doc_id], value ] : [value]
      return data
    },{}) || []
  }
  const mergedDocs = listDoc.data.map((doc) => {
    const newProperty = summaryUpload()[doc.id]
    let newPropertyColored = newProperty
    if (newProperty) {
      newPropertyColored = newProperty.map((data, i, arr) => {
        const perMonth = arr.length === 3
        const color = perMonth ? colors[i] : 'secondary'
        const monthName = perMonth ? listMonths[data.month - 1 ] : 'All month'
        if (!colorsDescriptionIndex.includes(color)) {
          colorsDescription = [ ...colorsDescription, { color, monthName } ]
          colorsDescriptionIndex = [ ...colorsDescriptionIndex, color ]
        }
        return {
          ...data,
          monthName,
          color
        }
      })
    }
    return {
      ...doc,
      summary: newPropertyColored
    }
  })

  return [ mergedDocs, colorsDescription ] || [listDoc.data]
}
