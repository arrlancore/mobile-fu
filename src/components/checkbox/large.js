import { Checkbox } from 'antd'
import React from 'react'
import { string } from 'prop-types'
import './style.css'

const checkboxLarge = props => (
  <span title={props.title}>
    <Checkbox className={`checkbox-root checkbox-${props.type}`} {...props} />
  </span>
)

checkboxLarge.propTypes = { type: string, title: string }

export default checkboxLarge
