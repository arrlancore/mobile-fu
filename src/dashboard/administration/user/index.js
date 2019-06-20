import React from 'react'
import { Row } from 'antd'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation() // t is translate function to show a message by language chosen
  const tKey = 'dashboard.user.'
  const [ mockData, setMockData ] = React.useState([])
  const [ collectionData, setCollectionData ] = React.useState({})
  const [ loadingData, setLoadingData ] = React.useState(true)
  // exData = exData.slice(0, 10)
  // const [ page, setPage ] = React.useState(1)
  // const [ pageSize, setPageSize ] = React.useState(10)
  // const [ data, dispatch ] = React.useMemo(() => (useStateValue('users', page, pageSize)))
  React.useEffect(() => {
    if (!mockData[0]) {
      loadPage(1, 10, exData)
    }
  })
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

  const loadPage = (page, pageSize, data = exData) => {
    let start = (page - 1) * pageSize
    let end = page * pageSize
    if (collectionData[page]) {
      return setMockData(collectionData[page])
    }
    setLoadingData(true)
    setTimeout(() => {
      const newData = data.slice(start, end)
      setMockData(newData)
      setCollectionData({ ...collectionData, [page]: newData })
      setLoadingData(false)
    }, 300)

  }

  return (
    <LayoutPage withHeader>
      <Helmet>
        <title>{t(tKey + 'pageTitle')}</title>
      </Helmet>
      <Content>
        <Title bold level={2}>User</Title>

        <div className="section-row">
          <Table
            title={() => <ColumnHeader />}
            data={mockData}
            scroll={{ x: 1300 }}
            columnProperty={columnProperty}
            excludeColumns={[ 'emp_id', 'group_id', 'doc_id', 'data_source' ]}
            pagination={{
              onChange: loadPage,
              total: 20
            }}
            loading={loadingData}
          />
        </div>
      </Content>
    </LayoutPage>
  )
}

export default UserPage
