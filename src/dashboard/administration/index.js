import React from 'react'
import {
  Row, Col
} from 'antd'

// import {
//   RadialBarChart, RadialBar, Legend
// } from 'recharts'

import LayoutPage from 'components/layout'
import Content from 'components/layout/content'
import Helmet from 'components/helmet'
import Title from 'components/text/title'
import CardSmall from 'components/card/small'
// import Card from 'components/card/'


class AdministrationPage extends React.Component {

  render() {

    // const data = [
    //   {
    //     name: 'Qatar', uv: 36.600, fill: '#C4C3FF'
    //   },
    //   {
    //     name: 'Brazil', uv: 15.6000, fill: '#FFE2A0'
    //   },

    //   {
    //     name: 'Canada', uv: 25.5000, fill: '#FFA195'
    //   },
    //   {
    //     name: 'France', uv: 42.9000, fill: '#95E7FF'
    //   }
    // ]

    // const style = {
    //   top: 0,
    //   left: 350,
    //   lineHeight: '24px'
    // }

    // const wrapper = {
    //   display: 'flex',
    //   justifyContent: 'space-between'
    // }


    return (
      <LayoutPage withHeader>
        <Helmet>
          <title>Administration</title>
        </Helmet>
        <Content>
          <Row gutter={24}>
            <Col span={24}>
              <Title level={4}>Master Data </Title>
              <Row gutter={128} style={{ marginBottom: 24 }}>
                <Col span={6}>
                  <CardSmall icon={require('assets/icon/Intersection.png')} name="User"/>
                </Col>
                <Col span={6}>
                  <CardSmall icon={require('assets/icon/injection.png')} name="Role"/>
                </Col>
                <Col span={6}>
                  <CardSmall icon={require('assets/icon/heart.png')} name="Module" />
                </Col>
                <Col span={6}>
                  <CardSmall icon={require('assets/icon/pill.png')} name="User has Role" />
                </Col>
              </Row>
              <Row gutter={128} style={{ marginBottom: 24 }}>
                <Col span={6}>
                  <CardSmall icon={require('assets/icon/balloon.png')} name="Role Has Module" />
                </Col>
                <Col span={6}>
                  <CardSmall icon={require('assets/icon/dollar.png')} name="Other"/>
                </Col>
                <Col span={6}>
                  <CardSmall icon={require('assets/icon/scissor.png')} name="Other"/>
                </Col>
                <Col span={6}>
                  <CardSmall icon={require('assets/icon/feet.png')} name="Other"/>
                </Col>
              </Row>
              <Row gutter={128} style={{ marginBottom: 24 }}>
                <Col span={6}>
                  <CardSmall icon={require('assets/icon/rip.png')} name="Other"/>
                </Col>
              </Row>
            </Col>
            {/* <Col span={8}>
              <Title level={4}>Other </Title>
              <Card>
                <Title level={4}>Other </Title>
                <hr />
                <Row>
                  <Col span={12}>
                    <RadialBarChart
                      width={500}
                      height={300}
                      cx={150}
                      cy={150}
                      innerRadius={20}
                      outerRadius={140}
                      barSize={5}
                      data={data}
                    >
                      <RadialBar
                        minAngle={15}
                        label={{
                          position: 'insideStart', fill: '#fff'
                        }}
                        background clockWise dataKey="uv"
                      />
                      <Legend
                        iconSize={10}
                        width={120}
                        height={140}
                        layout="vertical"
                        verticalAlign="middle"
                        wrapperStyle={style}
                      />
                    </RadialBarChart>
                  </Col>
                </Row>
                <hr />
                <div style={wrapper}>
                  <h2>Quarter Budget</h2>
                  <h2 style={{
                    color: '#4AD991', fontWeight: 'bold'
                  }}>$35,604.00</h2>
                </div>
              </Card>
            </Col> */}
          </Row>
          {/* <Row>
            <Col span={16}>
              <Title level={4}>Other </Title>
              <Card>
                <Row> */}
          {/* <Col span={12}>
                    <RadialBarChart
                      width={500}
                      height={300}
                      cx={150}
                      cy={150}
                      innerRadius={20}
                      outerRadius={140}
                      barSize={5}
                      data={data}
                    >
                      <RadialBar
                        minAngle={15}
                        label={{
                          position: 'insideStart', fill: '#fff'
                        }} background clockWise dataKey="uv"
                      />
                      <Legend
                        iconSize={10}
                        width={120}
                        height={140}
                        layout="vertical"
                        verticalAlign="middle"
                        wrapperStyle={style}
                      />
                    </RadialBarChart>
                  </Col>
                  <Col span={12}>
                    <RadialBarChart
                      width={500}
                      height={300}
                      cx={150}
                      cy={150}
                      innerRadius={20}
                      outerRadius={140}
                      barSize={5}
                      data={data}
                    >
                      <RadialBar
                        minAngle={15}
                        label={{
                          position: 'insideStart', fill: '#fff'
                        }} background clockWise dataKey="uv"
                      />
                      <Legend
                        iconSize={10}
                        width={120}
                        height={140}
                        layout="vertical"
                        verticalAlign="middle"
                        wrapperStyle={style}
                      />
                    </RadialBarChart>
                  </Col> */}
          {/* </Row>
              </Card>
            </Col>
          </Row> */}
        </Content>
      </LayoutPage>
    )
  }
}

export default AdministrationPage
