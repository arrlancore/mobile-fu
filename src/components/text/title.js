import React from 'react'
import { Typography } from 'antd'
import { node, bool } from 'prop-types'
const { Title } = Typography

function Text(props) {
  const style = {
    color: '#7F7F7F',
    fontWeight: props.bold ? 'bold' : 500
  }
  return <Title style={style} {...props}>{props.children}</Title>
}

Text.propTypes = { 
  children: node,
  bold: bool
}

export default Text
