import React from 'react'
import { Row } from 'antd'
// import { useStateValue } from 'context'
import LayoutPage from 'components/layout'
import Content from 'components/layout/content'
import Helmet from 'components/helmet'
import Button from 'components/button'
import Table from 'components/table'
import Title from 'components/text/title'
import exData from './data.json'

import './style.css'

function UserPage () {
  // const [ page, setPage ] = React.useState(1)
  // const [ pageSize, setPageSize ] = React.useState(10)
  // const [ data, dispatch ] = React.useMemo(() => (useStateValue('users', page, pageSize)))

  const ColumnHeader = () => (
    <>
      <Row gutter={24} style={{
        display: 'flex', justifyContent: 'flex-end', marginBottom: 28
      }}>
        <Button style={{ maxWidth: 280, margin: '0 14px' }} type="secondary">
          Export
        </Button>
        <Button style={{ maxWidth: 280, margin: '0 14px', background: '#35b97a' }} type="secondary">
          Create
        </Button>
        {/* <span className="action-title">
          <Tooltip title="Export to file">
            <Icon type="export" />
          </Tooltip>
        </span>
        <span className="action-title">
          <Tooltip title="Create new record">
            <Icon type="plus-circle" />
          </Tooltip>
        </span> */}
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
            pagination={{
              // onChange: (page, size) => {
              //   setPage(page)
              //   setPageSize(size)
              // },
              total: 20
            }}
          />
        </div>
      </Content>
    </LayoutPage>
  )
}

export default UserPage
