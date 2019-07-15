import React from 'react'
import {
  string, object
} from 'prop-types'
import { Input } from 'antd'
import './style.css'

class InputText extends React.Component {
  render() {
    const {
      type, label, style
    } = this.props
    const primary = type === 'primary'
    const color = primary ? '#D5D6DB' : '#2699FB'
    return (
      <div
        style={{
          ...style,
          display: 'inline'
        }}
      >
        {label && (
          <label
          htmlFor={`select ${label}`}
          style={{
            display: 'block', color: color, fontWeight: 'bold', ...style
            }}
        >
          {label}
        </label>}
        <Input
          {...this.props}
          className={`input-base ${
            this.props.type === 'secondary' ? 'input-secondary' : ''
          }`}
        />
      </div>
    )
  }
}

InputText.propTypes = {
  type: string,
  label: string,
  style: object
}

export default InputText
