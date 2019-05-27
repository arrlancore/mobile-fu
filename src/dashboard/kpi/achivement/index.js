import React from 'react'
import {
  Row, Col, Checkbox, Icon, Tooltip
} from 'antd'
import LayoutPage from 'components/layout'
import Content from 'components/layout/content'
import Helmet from 'components/helmet'
import Select from 'components/select'
import Button from 'components/button'
import Table from 'components/table'
import Title from 'components/text/title'
import exData from './data-achivement.json'

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

  const CheckboxGroup = Checkbox.Group
  const filterOption = [ 'CRM', 'CPC', 'CTR' ]
  const ColumnHeader = () => (
    <>
      <Row gutter={24} style={{
        display: 'flex', justifyContent: 'flex-end', marginBottom: 28
      }}>
        <Button style={{ maxWidth: 300 }} type="secondary">
          Export
        </Button>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          Result
        </Col>
        <Col span={12} style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}>
          <CheckboxGroup options={filterOption} defaultValue={[]} onChange={onChange} />
          <Tooltip title="You can do some filter">
            <Icon type="question-circle" />
          </Tooltip>
        </Col>
      </Row>
    </>
  )


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
        <title>KPI Achivement</title>
      </Helmet>
      <Content>
        <Title bold level={2}>Achivement</Title>
        <div className="section-row">
          <Row gutter={24}>
            <Col span={6}>
              <Select
                type="secondary"
                label="Year"
                optionList={listYear}
                showSearch
                style={{
                  maxWidth: 300, width: '100%'
                }}
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
                style={{
                  maxWidth: 300, width: '100%'
                }}
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
                label="Team"
                optionList={listYear}
                showSearch
                style={{
                  maxWidth: 300, width: '100%'
                }}
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
                label="Group"
                optionList={listQuarter}
                showSearch
                style={{
                  maxWidth: 300, width: '100%'
                }}
                placeholder="select"
                optionFilterProp="children"
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
              />
            </Col>
          </Row>
        </div>

        <div className="section-row">
          <Row gutter={24}>
            <Col span={6}>
            </Col>
            <Col span={6}>
              <Button style={{ maxWidth: 300 }} type="secondary">
                 Reset
              </Button>
            </Col>
            <Col span={6}>
              <Button style={{ maxWidth: 300 }} type="secondary">
                 Apply
              </Button>
            </Col>
            <Col span={6}>
            </Col>
          </Row>
        </div>

        <div className="section-row">
          <Table
            title={() => <ColumnHeader />}
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

export default KpiCalculationPage
