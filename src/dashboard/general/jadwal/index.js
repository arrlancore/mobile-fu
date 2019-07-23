import React from 'react'
import { Link } from 'react-router-dom'
import { object } from 'prop-types'
import { Row, Col } from 'antd'
import { useTranslation } from 'react-i18next'
import LayoutPage from 'components/layout'
import { list } from 'context/jadwal/action'
import { list as loadListPerkuliahan } from 'context/master-perkuliahan/action'
import { list as loadListDosen } from 'context/user/action'
import { list as loadListKelas } from 'context/master-kelas/action'
import { list as loadListMataKuliah } from 'context/master-mata-kuliah/action'
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
  const [deskripsiPerkuliahan, setDeskripsiPerkuliahan] = React.useState('')
  const [perkuliahan, setPerkuliahan] = React.useState(undefined)
  const [mataKuliah, setMataKuliah] = React.useState('')

  const [listJadwal, dispatch] = useStateValue('listJadwal')

  const [listMataKuliah] = useStateValue('listMastermataKuliah')
  const listDataMataKuliah = listMataKuliah
    ? listMataKuliah.data.map(data => {
        return {
          name: `${data.namaMataKuliah} (${data.kodeMataKuliah})`,
          value: data._id
        }
      })
    : []

  const dataQuery = { perkuliahan, mataKuliah, deskripsiPerkuliahan }

  const [listDosen] = useStateValue('listUser')
  const [listKelas] = useStateValue('listMasterKelas')

  const [listPerkuliahan] = useStateValue('listMasterPerkuliahan')
  const listDataPerkuliahan = listPerkuliahan ? listPerkuliahan.data : []

  const [openViewModal, setOpenViewModal] = React.useState(false)
  const [newEntry, setNewEntry] = React.useState(false)
  const [pageNumber, setPageNumber] = React.useState(1)

  const prevListJadwal = usePrevious(listJadwal)
  const prevListPerkuliahan = usePrevious(listPerkuliahan)
  const prevPathName = usePrevious(pathname)
  const prevPerkuliahan = usePrevious(perkuliahan)
  const prevMataKuliah = usePrevious(mataKuliah)
  React.useEffect(() => {
    if (!listPerkuliahan && prevListPerkuliahan !== listPerkuliahan) {
      loadListPerkuliahan(dispatch, { selected: 'deskripsiPerkuliahan' })
      loadListMataKuliah(dispatch, { selected: 'namaMataKuliah kodeMataKuliah' })
    }
    if (perkuliahan && perkuliahan !== prevPerkuliahan) {
      loadData()
    }
    if (mataKuliah && perkuliahan && mataKuliah !== prevMataKuliah) {
      loadData()
    }
    if (listJadwal && listJadwal !== prevListJadwal && !listDosen) {
      loadListDosen(dispatch, { role: 'dosen', selected: 'fullName' })
    }
    if (listJadwal && listJadwal !== prevListJadwal && !listKelas) {
      loadListKelas(dispatch, { selected: 'namaKelas' })
    }
  }, [
    dispatch,
    loadData,
    prevPathName,
    pathname,
    listJadwal,
    prevListJadwal,
    listPerkuliahan,
    prevListPerkuliahan,
    perkuliahan,
    prevPerkuliahan,
    mataKuliah,
    prevMataKuliah,
    listDosen,
    listKelas
  ])
  function loadData() { // eslint-disable-line
    const queries = {
      selected: 'pertemuan waktuMulai waktuSelesai tanggal',
      perkuliahan
    }
    if (mataKuliah) {
      queries.mataKuliah = mataKuliah
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
      dataIndex: 'tanggal',
      render: date => new Date(date).toLocaleDateString()
    },
    {
      dataIndex: 'dosen',
      title: 'Dosen',
      key: 'Dosen',
      render: data => data && data.fullName
    },
    {
      dataIndex: 'mataKuliah',
      title: 'Mata Kuliah',
      key: 'mataKuliah',
      render: data => data && data.namaMataKuliah
    },
    {
      dataIndex: 'kelas',
      title: 'Kelas',
      key: 'kelas',
      render: data => data && data.namaKelas
    },
    {
      dataIndex: 'kelas',
      title: 'Kelas',
      key: 'Kelas',
      render: data => data && data.namaKelas
    },
    {
      dataIndex: 'perkuliahan',
      title: 'Jurusan',
      key: 'Jurusan',
      render: data => data && data.jurusan && data.jurusan.namaJurusan
    }
  ]

  const handleRowClick = data => {
    setOnView(data)
    setOpenViewModal(true)
  }

  const handleSetPerkuliahan = id => {
    const desc = listDataPerkuliahan.filter(data => data._id === id)
    setDeskripsiPerkuliahan(desc[0].deskripsiPerkuliahan)
    setPerkuliahan(id)
  }

  const title = 'Jadwal'
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
                type="secondary"
                label="Pilih Perkuliahan"
                optionList={listDataPerkuliahan.map(data => {
                  return {
                    name: data.deskripsiPerkuliahan,
                    value: data._id
                  }
                })}
                showSearch
                style={{
                  width: '100%'
                }}
                placeholder="select"
                optionFilterProp="children"
                onChange={handleSetPerkuliahan}
              />
            </Col>
          </Row>
          <Row gutter={24}>
            {perkuliahan ? (
              <Col style={{ marginTop: 20 }} span={6}>
                <label>Filter:</label>
                <Select
                  allowClear={true}
                  type="secondary"
                  label="Mata Kuliah"
                  defaultValue={mataKuliah || 'Semua'}
                  optionList={listDataMataKuliah}
                  showSearch
                  style={{
                    width: '100%'
                  }}
                  placeholder="select"
                  optionFilterProp="children"
                  onChange={setMataKuliah}
                />
              </Col>
            ) : (
              ''
            )}
          </Row>
        </div>

        <div className="section-row">
          {listJadwal && perkuliahan ? (
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
          ) : (
            ''
          )}
        </div>
      </Content>
    </LayoutPage>
  )
}

JadwalPage.propTypes = {
  history: object
}

export default JadwalPage
