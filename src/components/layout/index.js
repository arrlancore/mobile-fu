import { Layout } from 'antd'
import React from 'react'
import { node, bool, any } from 'prop-types'
import Header from 'components/header'
import MobileHeader from 'components/header/headerMobile'

function layout({ children, withHeader, withMobileHeader, propsHeader, propsMobileHeader }) {
  return (
    <Layout
      style={{
        background: '#fff',
        minHeight: '100vh'
      }}
    >
      {withHeader && <Header {...propsHeader} />}
      {withMobileHeader && <MobileHeader {...propsMobileHeader} />}
      {children}
    </Layout>
  )
}

layout.propTypes = {
  children: node,
  withHeader: bool,
  propsHeader: any,
  withMobileHeader: bool,
  propsMobileHeader: any
}

export default layout
