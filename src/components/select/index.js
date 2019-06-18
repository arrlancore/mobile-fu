import React from 'react'
import {
  array, string
} from 'prop-types'
import './style.css'

import { Select } from 'antd'

const Option = Select.Option

function select ({
  optionList, type, label, ...rest
}) {
  const primary = type === 'primary'
  const color = primary ? '#D5D6DB' : '#2699FB'

  return (
    <>
      <label
        htmlFor={`select ${label}`}
        style={{
          display: 'block', color: color, fontWeight: 'bold'
        }}
      >
        {label}
      </label>
      <div className={`select-root ${primary ? '' : 'select-secondary'}`}>
        <Select
          {...rest}
        >
          {optionList.map(list => (
            <Option key={list.value} value={list.value}>{list.name}</Option>
          ))}
        </Select>
      </div>
    </>
  )
}

select.propTypes = {
  optionList: array, label:string, type: string
}
select.defaultProps = { optionList: [] }

export default select
