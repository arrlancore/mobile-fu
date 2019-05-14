import React from 'react'
import { array, any } from 'prop-types'
import { Table } from 'antd'
import './style.css'

const toCapitalize = (text) => {
  return typeof text === 'string' ?
    text.replace('_', ' ').split(' ').reduce((acc, txt, index, arr) => {
      return acc + txt.charAt(0).toUpperCase() + txt.slice(1) + (index !== arr.length - 1 ? ' ' : '')
    }, '') :
    ''
}

function MainTable ({ data, excludeColumns, columnProperty, ...rest}) {
  const getColumn = (arr) => {
    const conditions = columnProperty
    const titles = Object.keys(arr[0]).filter(title => excludeColumns.includes(title) === false)
    return titles.map(title => {
      let column = {
        title: toCapitalize(title),
        key: title,
        dataIndex: title
      }
      for (let i = 0; i < conditions.length; i++) {
        let condition = conditions[i]
        if (condition.dataIndex === title) {
          column = { ...column, ...condition }
        }
      }
      return column
    })
  }
  const columns = getColumn(data)
  return (
    <Table
      rowKey={(data) => data.id || data._id}
      columns={columns}
      dataSource={data}
      {...rest}
    />
  )
}

MainTable.propTypes = {
  data: array,
  excludeColumns: array,
  columnProperty: array,
  title: any
}

MainTable.defaultProps = {
  data: [],
  title: 'Result',
  excludeColumns: []
}

export default MainTable
