import React from 'react'
import { bool, number, object } from 'prop-types'
import { Spin } from 'antd'
import './style.css'

const Spinner = ({ center, top, style, ...rest }) => (
  <div
    style={{ marginTop: top, ...style }}
    className={center ? 'spin-loader' : 'default'}
  >
    <Spin {...rest} />
  </div>
)
Spinner.propTypes = {
  center: bool,
  top: number,
  style: object
}

Spinner.defaultProps = {
  center: false,
  top: 0,
  style: {}
}

export default Spinner
