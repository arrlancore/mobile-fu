import React from 'react'
import { Row, Col } from 'antd'

import LayoutPage from 'components/layout'
import Content from 'components/layout/content'
import Helmet from 'components/helmet'
import Title from 'components/text/title'

class AdministrationPage extends React.Component {
  render() {
    return (
      <LayoutPage withHeader>
        <Helmet>
          <title>Administration</title>
        </Helmet>
        <Content>
          <Row gutter={24}>
            <Col span={18}>
              <Title level={4}>Master Data </Title>
            </Col>
            <Col span={6}>
              <Title level={4}>Other </Title>
            </Col>
          </Row>
        </Content>
      </LayoutPage>
    )
  }
}

export default AdministrationPage
