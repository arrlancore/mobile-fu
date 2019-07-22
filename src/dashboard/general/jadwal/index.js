import React from 'react'
import { Link } from 'react-router-dom'
import { object } from 'prop-types'
import { Row, Col } from 'antd'
import { useTranslation } from 'react-i18next'
import LayoutPage from 'components/layout'
import { list } from 'context/jadwal/action'
import Content from 'components/layout/content'
import Helmet from 'components/helmet'
import Button from 'components/button'
import Table from 'components/table'
import Select from 'components/select'
import Title from 'components/text/title'
// import { encode, decode } from 'utils/queryString'
import { usePrevious, useStateValue, useStateDefault } from 'context'
// import exData from './data.json'
import Modal from './modal'

import './style.css'

function JadwalPage(props) {
  const { history } = props
  const pathname = history.location.pathname
  const { t } = useTranslation() // t is translate function to show a message by language chosen
  const tKey = 'dashboard.jadwal.'
  const [, loadListJadwal] = useStateDefault('LIST_JADWAL')
  const [onView, setOnView] = React.useState({})

  const [listJadwal, dispatch] = useStateValue('listJadwal')
  const [openViewModal, setOpenViewModal] = React.useState(false)
  const [newEntry, setNewEntry] = React.useState(false)
  const [pageNumber, setPageNumber] = React.useState(1)
  const prevListJadwal = usePrevious(listJadwal)
  const prevPathName = usePrevious(pathname)
  React.useEffect(() => {
    if (!listJadwal && listJadwal !== prevListJadwal) {
      loadData()
    } else {
      if (pathname && prevPathName !== pathname) {
        loadData()
      }
    }
  }, [dispatch, loadData, prevPathName, pathname, listJadwal, prevListJadwal])
  function loadData() { // eslint-disable-line
    list(dispatch, {
      selected: 'pertemuan waktuMulai waktuSelesai tanggal'
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
      dataIndex: 'tanggal',
      render: date => new Date(date).toLocaleDateString()
    },
    {
      dataIndex: 'dosen',
      title: 'Dosen',
      key: 'Dosen',
      render: data => data.fullName
    },
    {
      dataIndex: 'mataKuliah',
      title: 'Mata Kuliah',
      key: 'mataKuliah',
      render: data => data.namaMataKuliah
    },
    {
      dataIndex: 'kelas',
      title: 'Kelas',
      key: 'kelas',
      render: data => data.namaKelas
    },
    {
      dataIndex: 'kelas',
      title: 'Gedung',
      key: 'gedung',
      render: data => data.gedung.namaGedung
    },
    {
      dataIndex: 'perkuliahan',
      title: 'Jurusan',
      key: 'Jurusan',
      render: data => data.jurusan.namaJurusan
    }
  ]

  const handleRowClick = data => {
    setOnView(data)
    setOpenViewModal(true)
  }
  const title = 'Jadwal'
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
          <Row gutter={24}>
            <Col span={6}>
              <Select
                type="secondary"
                label="Year"
                optionList={[]}
                showSearch
                style={{
                  maxWidth: 300,
                  width: '100%'
                }}
                placeholder="select"
                optionFilterProp="children"
                onChange={() => {}}
              />
            </Col>
            <Col span={6}>
              <Select
                type="secondary"
                label="Quarter"
                optionList={[]}
                showSearch
                style={{
                  maxWidth: 300,
                  width: '100%'
                }}
                placeholder="select"
                optionFilterProp="children"
                onChange={() => {}}
              />
            </Col>
            <Col span={6}>
              <Select
                type="secondary"
                label="Team"
                optionList={[]}
                showSearch
                style={{
                  maxWidth: 300,
                  width: '100%'
                }}
                placeholder="select"
                optionFilterProp="children"
                onChange={() => {}}
              />
            </Col>
          </Row>
        </div>

        <div className="section-row">
          <Table
            title={() => <ColumnHeader />}
            data={listJadwal ? listJadwal.data : []}
            scroll={{ x: 1300 }}
            columnProperty={columnProperty}
            excludeColumns={['_id', 'createdBy']}
            onRowClick={handleRowClick}
            pagination={{
              onChange: page => {
                setPageNumber(page)
              },
              total: listJadwal ? listJadwal.count : 10,
              defaultCurrent: Number(pageNumber)
            }}
            loading={loadListJadwal}
          />
        </div>
      </Content>
    </LayoutPage>
  )
}

JadwalPage.propTypes = {
  history: object
}

export default JadwalPage
