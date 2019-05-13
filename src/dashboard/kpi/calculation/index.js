import React from 'react'
import { Row, Col } from 'antd'
import LayoutPage from 'components/layout'
import Content from 'components/layout/content'
import Helmet from 'components/helmet'
import Select from 'components/select'
import Input from 'components/input'
import Button from 'components/button'
import Title from 'components/text/title'
import UploadForm from './uploadForm'

import './style.css'


function onChange(value) {
  console.log(`selected ${value}`)
}

function onBlur() {
  console.log('blur')
}

function onFocus() {
  console.log('focus')
}

function onSearch(val) {
  console.log('search:', val)
}

function KpiCalculationPage () {
  const listYear = [
    {
      name: 2019,
      value: 2019
    },
    {
      name: 2018,
      value: 2018
    }
  ]
  const listQuarter = [
    {
      name: 1,
      value: 1
    },
    {
      name: 2,
      value: 2
    },
    {
      name: 3,
      value: 3
    },
    {
      name: 4,
      value: 4
    }
  ]
  return (
    <LayoutPage withHeader>
      <Helmet>
        <title>KPI Calculation</title>
      </Helmet>
      <Content>
        <Title bold level={2}>Calculation</Title>
        <div className="section-row">
          <Title bold level={3}>Choose Period</Title>
          <Row gutter={16}>
            <Col span={6}>
              <Select
                type="secondary"
                label="Year"
                optionList={listYear}
                showSearch
                style={{ maxWidth: 300, width: '100%' }}
                placeholder="select"
                optionFilterProp="children"
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
              />
            </Col>
            <Col span={6}>
              <Select
                type="secondary"
                label="Quarter"
                optionList={listQuarter}
                showSearch
                style={{ maxWidth: 300, width: '100%' }}
                placeholder="select"
                optionFilterProp="children"
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
              />
            </Col>
            <Col span={12}>
              <div style={{ marginLeft: '14%' }}>
                <Input
                  value="Uploaded"
                  style={{ maxWidth: 300, width: '100%' }}
                  label="Status Uploaded"
                  type="secondary"
                />
                <Input
                  value="Not calculated yet"
                  style={{ maxWidth: 300, width: '100%' }}
                  label="Status Calculated"
                  type="secondary"
                />
              </div>
            </Col>
          </Row>
        </div>

        <div className="section-row">
          <Title bold level={3}>Upload File</Title>
          <Row gutter={16}>
            <Col span={16}>
              <UploadForm checkDefault={true} />
              <UploadForm checkDefault={false} />
              <UploadForm checkDefault={false} />
            </Col>
            <Col span={8}>
              <div style={{ marginLeft: '14%', maxWidth: 300 }}>
                <Button style={{ marginBottom: 64 }} type="secondary">
                 Process File
                </Button>
                <Button type="secondary">
                 Calculate KPI
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </Content>
    </LayoutPage>
  )
}

export default KpiCalculationPage
