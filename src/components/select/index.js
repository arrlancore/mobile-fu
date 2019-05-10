import React from 'react'
import { array, string } from 'prop-types'
import './style.css'

import { Select } from 'antd'

const Option = Select.Option

function select ({ optionList, label, ...rest }) {
  function onChange(value) {
    console.log(`selected ${value}`)
  }
  
  function onBlur() {
    console.log('blur')
  }
  
  function onFocus() {
    console.log('focus')
  }
  
  function onSearch(val) {
    console.log('search:', val)
  }
  return (
    <>
      <label
        htmlFor={`select ${label}`}
        style={{ display: 'block' }}
      >
        {label}
      </label>
      <div className="select-root">
        <Select
          showSearch
          style={{ width: 360 }}
          placeholder="Select year"
          optionFilterProp="children"
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onSearch={onSearch}
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

select.propTypes = { optionList: array, label:string, id: string }
select.defaultProps = { optionList: [{ value: 1, name: 'Choose me please' }] }

export default select
