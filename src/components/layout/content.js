import { Layout } from 'antd'
import React from 'react'
import { node } from 'prop-types'
import './style.css'
const { Content } = Layout

function content({ children }) {
  return (
    <section className="content-fade-in">
      <Content style={{ padding: '50px 4%' }}>{children}</Content>
    </section>
  )
}

content.propTypes = { children: node }

export default content
