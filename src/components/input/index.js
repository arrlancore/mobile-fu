import React from 'react'
import { node } from 'prop-types'
import { Input } from 'antd'
import './index.css'

const input = props => {
  return <Input {...props} className="input-base" />
}

input.propTypes = { children: node }

export default input
