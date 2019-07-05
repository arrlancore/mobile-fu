import React from 'react'
import Content from 'components/layout/content'
import Layout from 'components/layout'
import Spinner from './spinner'

const PageLoad = () => (
  <Layout withHeader>
    <Content>
      <div
        style={{
          height: 'calc(100vh - 200px)',
          alignContent: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Spinner size="large" center />
      </div>
    </Content>
  </Layout>
)

export default PageLoad
