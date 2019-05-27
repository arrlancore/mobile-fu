import React from 'react'
import { Typography } from 'antd'
import {
  node, bool
} from 'prop-types'
const { Title } = Typography

function Text({
  bold, children, ...rest
}) {
  const style = {
    color: '#7F7F7F',
    fontWeight: bold ? 'bold' : 500
  }
  return <Title style={style} {...rest}>{children}</Title>
}

Text.propTypes = {
  children: node,
  bold: bool
}

export default Text
