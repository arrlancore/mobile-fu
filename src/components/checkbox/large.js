import { Checkbox } from 'antd'
import React from 'react'
import { string } from 'prop-types'
import './style.css'

const checkboxLarge = (props) => (
  <Checkbox
    className={`checkbox-root ${props.type === 'secondary' ? 'checkbox-secondary' : ''}`}
    {...props}
  />
)

checkboxLarge.propTypes = { type: string }

export default checkboxLarge
