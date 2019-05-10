import { Layout } from 'antd'
import React from 'react'
import { node } from 'prop-types'

const { Content } = Layout

function content({ children }) {
  return (
    <Content style={{ padding: '50px 4%' }}>
      {children}
    </Content>
  )
}

content.propTypes = { children: node }

export default content
