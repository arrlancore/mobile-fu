import React, { useCallback } from 'react'
import { object } from 'prop-types'
import { Row } from 'antd'
import { useTranslation } from 'react-i18next'
import LayoutPage from 'components/layout'
import { list } from 'context/general/action'
import Content from 'components/layout/content'
import Helmet from 'components/helmet'
import Button from 'components/button'
import Table from 'components/table'
import Title from 'components/text/title'
import { encode, decode } from 'utils/queryString'
import { usePrevious, useStateValue, useStateDefault } from 'context'
import exData from './data.json'
import Modal from './modal'

import './style.css'

function UserPage(props) {
  const { history } = props
  const { t } = useTranslation() // t is translate function to show a message by language chosen
  const tKey = 'dashboard.user.'
  // const initPage = decode(history.location.search)
  const [, loadListUser] = useStateDefault('LIST_USER')
  const [mockData, setMockData] = React.useState([])
  const [onView, setOnView] = React.useState({})
  const [listUser, dispatch] = useStateValue('listUser')
  const [openViewModal, setOpenViewModal] = React.useState(false)
  const [newEntry, setNewEntry] = React.useState(false)
  const [pageNumber, setPageNumber] = React.useState(1)
  const [pageSize] = React.useState(10)
  const [collectionData, setCollectionData] = React.useState({})
  const [, setLoadingData] = React.useState(true)
  // exData = exData.slice(0, 10)
  // const [ page, setPage ] = React.useState(1)
  // const [ pageSize, setPageSize ] = React.useState(10)
  // const [ data, dispatch ] = React.useMemo(() => (useStateValue('users', page, pageSize)))
  const prevPageNumber = usePrevious(pageNumber)
  const prevListUser = usePrevious(listUser)
  const loadPage = useCallback((page, pageSize, data = exData) => {
    console.log('TCL: loadPage -> page', page)
    let start = (page - 1) * pageSize
    let end = page * pageSize
    if (collectionData[page]) {
      return setMockData(collectionData[page])
    }
    setLoadingData(true)
    setPageNumber(page)
    setTimeout(() => {
      const newData = data.slice(start, end)
      setMockData(newData)
      setCollectionData({ ...collectionData, [page]: newData })
      setLoadingData(false)
    }, 300)
    if (page !== 1) {
      updateQueryUrl('page', page)
    }
  })
  React.useEffect(() => {
    const urlQuery = decode(history.location.search)
    const { page } = urlQuery
    if (!listUser && listUser !== prevListUser) {
      loadData()
    }
    if (page && page !== pageNumber) {
      setPageNumber(page)
    }
    if (prevPageNumber !== pageNumber) {
      loadPage(pageNumber, pageSize)
    }
    if (!mockData[0]) {
      loadPage(pageNumber, pageSize)
    }
    // }
  }, [
    history.location.search,
    pageNumber,
    mockData,
    loadPage,
    pageSize,
    prevPageNumber,
    listUser,
    prevListUser,
    dispatch,
    loadData
  ])
  function loadData() {
    list(dispatch, {
      selected: 'status firstName lastName role email'
    })
  }

  const ColumnHeader = () => (
    <>
      <Row
        gutter={24}
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: 28
        }}
      >
        <Button style={{ maxWidth: 280, margin: '0 14px' }} type="secondary">
          Export
        </Button>
        <Button
          onClick={() => setNewEntry(true)}
          style={{ maxWidth: 280, margin: '0 14px', background: '#35b97a' }}
          type="secondary"
        >
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

  const handleRowClick = data => {
    setOnView(data)
    setOpenViewModal(true)
  }

  const updateQueryUrl = (key, value) => {
    const search = history.location.search
    const query = decode(search)
    query[key] = value
    history.replace(`${history.location.pathname}?${encode(query)}`)
  }
  return (
    <LayoutPage withHeader>
      <Helmet>
        <title>{t(tKey + 'pageTitle')}</title>
      </Helmet>
      <Modal
        newEntry={newEntry}
        openModal={openViewModal}
        onViewData={onView}
        onUpdateSuccess={loadData}
        onClose={() => {
          setOpenViewModal(false)
          setNewEntry(false)
          setOnView({})
        }}
      />
      <Content>
        <Title bold level={2}>
          User
        </Title>

        <div className="section-row">
          <Table
            title={() => <ColumnHeader />}
            data={listUser ? listUser.data : []}
            scroll={{ x: 1300 }}
            columnProperty={columnProperty}
            // excludeColumns={['roles', 'updatedAt', 'createdAt', 'password', 'fullName', 'deviceIds', '_id', '__v']}
            onRowClick={handleRowClick}
            pagination={{
              onChange: page => {
                setPageNumber(page)
              },
              total: listUser ? listUser.count : 10,
              defaultCurrent: Number(pageNumber)
            }}
            loading={loadListUser}
          />
        </div>
      </Content>
    </LayoutPage>
  )
}

UserPage.propTypes = {
  history: object
}

export default UserPage
