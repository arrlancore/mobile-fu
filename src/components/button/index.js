import React from 'react'
import { node, string } from 'prop-types'
import { Button } from 'antd'
import './style.css'

const button = ({ children, type, ...rest }) => {
  return (
    <Button {...rest} type={type} className={`button-base ${type === 'secondary' ? 'button-secondary' : ''}`}>
      {children}
    </Button>
  )
}

button.propTypes = {
  children: node,
  type: string
}

export default button
