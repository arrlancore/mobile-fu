import { Layout } from 'antd'
import React from 'react'
import { node, bool, any } from 'prop-types'
import Header from 'components/header'

function layout({ children, withHeader, propsHeader }) {
  return (
    <Layout style={{ background: '#fff', minHeight: '100vh' }}>
      {withHeader && <Header {...propsHeader} />}
      {children}
    </Layout>
  )
}

layout.propTypes = { children: node, withHeader: bool, propsHeader: any }

export default layout
