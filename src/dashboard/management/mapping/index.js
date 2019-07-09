import React from 'react'
import { Link } from 'react-router-dom'

import {
  Row, Col
} from 'antd'

import LayoutPage from 'components/layout'
import Helmet from 'components/helmet'
import Content from 'components/layout/content'
import Table from 'components/table'
import Button from 'components/button'
import Title from 'components/text/title'
import Select from 'components/select'
import exData from './data.json'
import { useTranslation } from 'react-i18next'

import './mapping.css'


const MappingPage = () => {
  const { t } = useTranslation() // t is translate function to show a message by language chosen
  const tKey = 'dashboard.mapping.'

  let columnProperty = [
    // add special condition for one or each column here
    {
      dataIndex: 'id',
      width: 50,
      fixed: 'left',
      sorter: (a, b) => a.id - b.id
    },
    {
      dataIndex: 'first_name',
      width: 100,
      sorter: (a,b) => (a.first_name > b.first_name) ? 1 : ((b.first_name > a.first_name) ? -1 : 0)
    },
    {
      dataIndex: 'performance',
      width: 120,
      align: 'center',
      render: function scoreBar(score) {
        return (
          <div style={{
            width: '100%', display: 'block', background: '#E2E2E4', position: 'relative'
          }}>
            <span style={{
              height: '100%',
              width: `${score * 10}%`,
              background: '#F39C12',
              position: 'absolute',
              left: 0
            }} />
            <span style={{ position: 'relative' }}>{score} / 10</span>
          </div>
        )
      }
    }
  ]

  return (
    <LayoutPage withHeader>
      <Helmet>
        <title>{t(tKey + 'pageTitle')}</title>
      </Helmet>
      <Content>
        <Title bold level={2}>Mapping Name</Title>
        <Row gutter={24}>
          <Col span={6}>
            <Select
              type="secondary"
              label="Team"
              showSearch
              style={{
                maxWidth: 300, width: '100%'
              }}
              placeholder="select"
              optionFilterProp="children"
            />
          </Col>
          <Col span={6}>
            <Select
              type="secondary"
              label="Group"
              showSearch
              style={{
                maxWidth: 300, width: '100%'
              }}
              placeholder="select"
              optionFilterProp="children"
            />
          </Col>
          <Col span={6}>
            <Select
              type="secondary"
              label="Position"
              showSearch
              style={{
                maxWidth: 300, width: '100%'
              }}
              placeholder="select"
              optionFilterProp="children"
            />
          </Col>
          <Col span={6}>
            <Select
              type="secondary"
              label="Name"
              showSearch
              style={{
                maxWidth: 300, width: '100%'
              }}
              placeholder="select"
              optionFilterProp="children"
            />
          </Col>
        </Row>
        <div className="section-row">
          <Row gutter={24}>
            <Col span={6} offset={6}>
              <Button style={{ maxWidth: 300 }} type="secondary">
                  Reset
              </Button>
            </Col>
            <Col span={6}>
              <Button style={{ maxWidth: 300 }} type="secondary">
                  Apply
              </Button>
            </Col>
          </Row>
        </div>
        {/* <div className="section-row mapping-button"> */}
        <div className="section-row mapping-button" style={{
          display: 'flex', justifyContent: 'flex-end'
        }}>
          {/* <Row type="flex" justify="end">
            <Col> */}
          <Link to="/create-mapping">
            <Button style={{ width: 300 }} type="secondary">
                Create New
            </Button>
          </Link>
          {/* </Col>
          </Row> */}
        </div>
        <div className="section-row mapping-table">
          <Table
            title=""
            data={exData}
            scroll={{ x: 1300 }}
            columnProperty={columnProperty}
            excludeColumns={['color']}
          />
        </div>
      </Content>
    </LayoutPage>
  )
}

export default MappingPage
