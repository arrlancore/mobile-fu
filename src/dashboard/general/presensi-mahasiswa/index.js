import React from 'react'
import { Link } from 'react-router-dom'
import { object } from 'prop-types'
import { Row, Col } from 'antd'
import { useTranslation } from 'react-i18next'
import LayoutPage from 'components/layout'
import { list } from 'context/presensi-mahasiswa/action'
import { list as loadListJadwal } from 'context/jadwal/action'
import { list as loadListMahasiswa } from 'context/user/action'
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

function PresensiMahasiswaPage(props) {
  const { history } = props
  const pathname = history.location.pathname
  const { t } = useTranslation() // t is translate function to show a message by language chosen
  const tKey = 'dashboard.presensiMahasiswa.'
  const [, loadListPresensiMahasiswa] = useStateDefault('LIST_PERKULIAHAN_BERJALAN')
  const [onView, setOnView] = React.useState({})
  const [mahasiswa, setMahasiswa] = React.useState('')

  const [listPresensiMahasiswa, dispatch] = useStateValue('listPresensiMahasiswa')

  const dataQuery = {}

  const [listMahasiswa] = useStateValue('listUser')
  const listDataMahasiswa = listMahasiswa
    ? listMahasiswa.data.map(data => {
        return {
          name: data.fullName,
          value: data._id
        }
      })
    : []

  const [openViewModal, setOpenViewModal] = React.useState(false)
  const [newEntry, setNewEntry] = React.useState(false)
  const [pageNumber, setPageNumber] = React.useState(1)

  const prevListPresensiMahasiswa = usePrevious(listPresensiMahasiswa)
  const prevPathName = usePrevious(pathname)
  const prevMahasiswa = usePrevious(mahasiswa)
  React.useEffect(() => {
    if (pathname !== prevPathName) {
      loadData()
    }
    if (listPresensiMahasiswa && prevListPresensiMahasiswa !== listPresensiMahasiswa) {
      loadListJadwal(dispatch)
      loadListMahasiswa(dispatch, { role: 'mahasiswa' })
    }
    if (mahasiswa && mahasiswa !== prevMahasiswa) {
      loadData()
    }
  }, [
    dispatch,
    loadData,
    prevPathName,
    pathname,
    listPresensiMahasiswa,
    prevListPresensiMahasiswa,
    mahasiswa,
    prevMahasiswa
  ])
  function loadData() { // eslint-disable-line
    const queries = {
      selected: 'statusPresensi waktuPresensi jadwal mahasiswa catatan',
      mahasiswa
    }
    list(dispatch, queries)
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
      dataIndex: 'mahasiswa',
      title: 'Mahasiswa',
      key: 'Mahasiswa',
      render: data => data && <span style={{ textTransform: 'capitalize' }}>{data.fullName}</span>
    },
    {
      dataIndex: 'jadwal',
      title: 'Jadwal',
      key: 'Jadwal',
      render: data => {
        const name =
          data &&
          `${data.mataKuliah && data.mataKuliah.namaMataKuliah + '-' + data.mataKuliah.kodeMataKuliah} (${new Date(
            data.tanggal
          ).toLocaleDateString()}) Pertemuan:${data.pertemuan}`
        return name
      }
    }
  ]

  const handleRowClick = data => {
    setOnView(data)
    setOpenViewModal(true)
  }

  const title = 'Presensi Mahasiswa'
  return (
    <LayoutPage withHeader>
      <Helmet>
        <title>{t(tKey + 'pageTitle')}</title>
      </Helmet>
      <Modal
        newEntry={newEntry}
        query={dataQuery}
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
                allowClear={true}
                type="secondary"
                label="Nama Mahasiswa"
                defaultValue={mahasiswa || 'Semua'}
                optionList={listDataMahasiswa}
                showSearch
                style={{
                  width: '100%'
                }}
                placeholder="select"
                optionFilterProp="children"
                onChange={setMahasiswa}
              />
            </Col>
          </Row>
        </div>

        <div className="section-row">
          {listPresensiMahasiswa ? (
            <Table
              title={() => <ColumnHeader />}
              data={listPresensiMahasiswa ? listPresensiMahasiswa.data : []}
              scroll={{ x: 1300 }}
              columnProperty={columnProperty}
              excludeColumns={['_id', 'createdBy']}
              onRowClick={handleRowClick}
              pagination={{
                onChange: page => {
                  setPageNumber(page)
                },
                total: listPresensiMahasiswa ? listPresensiMahasiswa.count : 10,
                defaultCurrent: Number(pageNumber)
              }}
              loading={loadListPresensiMahasiswa}
            />
          ) : (
            ''
          )}
        </div>
      </Content>
    </LayoutPage>
  )
}

PresensiMahasiswaPage.propTypes = {
  history: object
}

export default PresensiMahasiswaPage
