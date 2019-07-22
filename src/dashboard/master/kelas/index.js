import React from 'react'
import { Link } from 'react-router-dom'
import { object } from 'prop-types'
import { Row } from 'antd'
import { useTranslation } from 'react-i18next'
import LayoutPage from 'components/layout'
import { list } from 'context/master-kelas/action'
import { list as loadListGedung } from 'context/master-gedung/action'
import Content from 'components/layout/content'
import Helmet from 'components/helmet'
import Button from 'components/button'
import Table from 'components/table'
import Title from 'components/text/title'
// import { encode, decode } from 'utils/queryString'
import { usePrevious, useStateValue, useStateDefault } from 'context'
// import exData from './data.json'
import Modal from './modal'

import './style.css'

function KelasPage(props) {
  const { history } = props
  const pathname = history.location.pathname
  const { t } = useTranslation() // t is translate function to show a message by language chosen
  const tKey = 'dashboard.kelas.'
  const [, loadListKelas] = useStateDefault('LIST_KELAS')
  const [onView, setOnView] = React.useState({})

  const [listKelas, dispatch] = useStateValue('listMasterKelas')
  const [listGedung] = useStateValue('listMasterGedung')
  const [openViewModal, setOpenViewModal] = React.useState(false)
  const [newEntry, setNewEntry] = React.useState(false)
  const [pageNumber, setPageNumber] = React.useState(1)
  const prevListKelas = usePrevious(listKelas)
  const prevPathName = usePrevious(pathname)
  React.useEffect(() => {
    const loadMaster = () => {
      loadListGedung(dispatch, {
        selected: 'namaGedung'
      })
    }
    if (!listKelas && listKelas !== prevListKelas) {
      loadData()
    } else {
      if (pathname && prevPathName !== pathname) {
        loadData()
      }
    }
    if (loadListKelas === false && listKelas && prevListKelas !== listKelas && !listGedung) {
      loadMaster()
    }
  }, [listKelas, prevListKelas, dispatch, loadData, prevPathName, pathname, loadListKelas, listGedung])
  function loadData() { // eslint-disable-line
    list(dispatch, {
      selected: 'namaKelas deskripsi gedung'
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
        {/* <Button style={{ maxWidth: 280, margin: '0 14px' }} type="secondary">
          Export
        </Button> */}
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
      dataIndex: 'gedung',
      title: 'Gedung',
      key: 'Gedung',
      render: data => (data ? data.namaGedung : '')
    }
  ]

  const handleRowClick = data => {
    setOnView(data)
    setOpenViewModal(true)
  }
  const title = 'Kelas'
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
        <div>
          <Link style={{ textDecoration: 'underline' }} to="/">
            Home
          </Link>
          {` / ${title}`}
        </div>
        <Title bold level={2}>
          {title}
        </Title>

        <div className="section-row">
          <Table
            title={() => <ColumnHeader />}
            data={listKelas ? listKelas.data : []}
            scroll={{ x: 1300 }}
            columnProperty={columnProperty}
            excludeColumns={['_id', 'createdBy']}
            onRowClick={handleRowClick}
            pagination={{
              onChange: page => {
                setPageNumber(page)
              },
              total: listKelas ? listKelas.count : 10,
              defaultCurrent: Number(pageNumber)
            }}
            loading={loadListKelas}
          />
        </div>
      </Content>
    </LayoutPage>
  )
}

KelasPage.propTypes = {
  history: object
}

export default KelasPage
