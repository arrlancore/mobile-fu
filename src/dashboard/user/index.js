import React from 'react'
import {
  Row, Col, Checkbox, Icon, Tooltip
} from 'antd'
import LayoutPage from 'components/layout'
import Content from 'components/layout/content'
import Helmet from 'components/helmet'

import Table from 'components/table'
import Title from 'components/text/title'
import exData from './data.json'

import './style.css'

function onChange(value) {
  console.log(`selected ${value}`)
}

function UserPage () {

  const CheckboxGroup = Checkbox.Group
  const filterOption = [ 'CRM', 'CPC', 'CTR' ]
  const ColumnHeader = () => (
    <>
      <Row gutter={24} style={{
        display: 'flex', justifyContent: 'flex-end', marginBottom: 28
      }}>
        {/* <Button style={{ maxWidth: 280, margin: '0 14px' }} type="secondary">
          Export
        </Button>
        <Button style={{ maxWidth: 280, margin: '0 14px', background: '#35b97a' }} type="secondary">
          Create
        </Button> */}
        <span className="action-title">
          <Tooltip title="Export to file">
            <Icon type="export" />
          </Tooltip>
        </span>
        <span className="action-title">
          <Tooltip title="Create new record">
            <Icon type="plus-circle" />
          </Tooltip>
        </span>
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
    }
  ]

  return (
    <LayoutPage withHeader>
      <Helmet>
        <title>Users</title>
      </Helmet>
      <Content>
        <Title bold level={2}>User</Title>

        <div className="section-row">
          <Table
            title={() => <ColumnHeader />}
            data={exData}
            scroll={{ x: 1300 }}
            columnProperty={columnProperty}
            excludeColumns={[ 'emp_id', 'group_id', 'doc_id', 'data_source' ]}
          />
        </div>
      </Content>
    </LayoutPage>
  )
}

export default UserPage
