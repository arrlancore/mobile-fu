import React from 'react'
import { Link } from 'react-router-dom'
import { object } from 'prop-types'
import { Row, Col } from 'antd'
import { useTranslation } from 'react-i18next'
import LayoutPage from 'components/layout'
import { list } from 'context/perkuliahan-berjalan/action'
import { list as loadListPerkuliahan } from 'context/master-perkuliahan/action'
import { list as loadListMahasiswa } from 'context/user/action'
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

function PerkuliahanBerjalanPage(props) {
  const { history } = props
  const pathname = history.location.pathname
  const { t } = useTranslation() // t is translate function to show a message by language chosen
  const tKey = 'dashboard.perkuliahanBerjalan.'
  const [, loadListPerkuliahanBerjalan] = useStateDefault('LIST_PERKULIAHAN_BERJALAN')
  const [onView, setOnView] = React.useState({})
  const [deskripsiPerkuliahan, setDeskripsiPerkuliahan] = React.useState('')
  const [perkuliahan, setPerkuliahan] = React.useState(undefined)
  const [mataKuliah, setMataKuliah] = React.useState('')
  const [peserta, setPeserta] = React.useState('')
  const [jurusan, setJurusan] = React.useState('')

  const [listPerkuliahanBerjalan, dispatch] = useStateValue('listPerkuliahanBerjalan')

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

  const [listMahasiswa] = useStateValue('listUser')
  const listDataMahasiswa = listMahasiswa
    ? listMahasiswa.data.map(data => {
        return {
          name: data.fullName,
          value: data._id
        }
      })
    : []

  const [listPerkuliahan] = useStateValue('listMasterPerkuliahan')
  const listDataPerkuliahan = listPerkuliahan ? listPerkuliahan.data : []

  const [openViewModal, setOpenViewModal] = React.useState(false)
  const [newEntry, setNewEntry] = React.useState(false)
  const [pageNumber, setPageNumber] = React.useState(1)

  const prevListPerkuliahanBerjalan = usePrevious(listPerkuliahanBerjalan)
  const prevListPerkuliahan = usePrevious(listPerkuliahan)
  const prevPathName = usePrevious(pathname)
  const prevPerkuliahan = usePrevious(perkuliahan)
  const prevMataKuliah = usePrevious(mataKuliah)
  const prevPeserta = usePrevious(peserta)
  const prevJurusan = usePrevious(jurusan)
  React.useEffect(() => {
    if (!listPerkuliahan && prevListPerkuliahan !== listPerkuliahan) {
      loadListPerkuliahan(dispatch, { selected: 'deskripsiPerkuliahan', isActive: 1 })
    }
    if (perkuliahan && jurusan !== prevJurusan && jurusan) {
      loadListMataKuliah(dispatch, { selected: 'namaMataKuliah kodeMataKuliah', jurusan })
    }
    if (perkuliahan && perkuliahan !== prevPerkuliahan) {
      loadData()
    }
    if (mataKuliah && perkuliahan && mataKuliah !== prevMataKuliah) {
      loadData()
    }
    if (peserta && perkuliahan && peserta !== prevPeserta) {
      loadData()
    }
    if (listPerkuliahanBerjalan && listPerkuliahanBerjalan !== prevListPerkuliahanBerjalan) {
      loadListMahasiswa(dispatch, { role: 'mahasiswa', selected: 'fullName' })
    }
  }, [
    dispatch,
    loadData,
    prevPathName,
    pathname,
    listPerkuliahanBerjalan,
    prevListPerkuliahanBerjalan,
    listPerkuliahan,
    prevListPerkuliahan,
    perkuliahan,
    prevPerkuliahan,
    mataKuliah,
    prevMataKuliah,
    peserta,
    prevPeserta,
    jurusan,
    prevJurusan
  ])
  function loadData() { // eslint-disable-line
    const queries = {
      selected: 'peserta mataKuliah jurusan',
      perkuliahan
    }
    if (mataKuliah) {
      queries.mataKuliah = mataKuliah
    }
    if (peserta) {
      queries.peserta = peserta
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
      dataIndex: 'peserta',
      title: 'Peserta',
      key: 'Peserta',
      render: data => data && <span style={{ textTransform: 'capitalize' }}>{data.fullName}</span>
    },
    {
      dataIndex: 'mataKuliah',
      title: 'Mata Kuliah',
      key: 'mataKuliah',
      render: data => data && data.namaMataKuliah
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
    setJurusan(desc[0].jurusan._id)
    setPerkuliahan(id)
  }

  const title = 'Perkuliahan Berjalan'
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
                label="Pilih Perkuliahan Aktif"
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
            <label style={{ display: 'block', margin: '20px 0 0 14px' }}>{perkuliahan ? 'Filter:' : ''}</label>
            {perkuliahan ? (
              <>
                <Col span={6}>
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
                <Col span={6}>
                  <Select
                    allowClear={true}
                    type="secondary"
                    label="Nama Mahasiswa"
                    defaultValue={peserta || 'Semua'}
                    optionList={listDataMahasiswa}
                    showSearch
                    style={{
                      width: '100%'
                    }}
                    placeholder="select"
                    optionFilterProp="children"
                    onChange={setPeserta}
                  />
                </Col>
              </>
            ) : (
              ''
            )}
          </Row>
        </div>

        <div className="section-row">
          {listPerkuliahanBerjalan && perkuliahan ? (
            <Table
              title={() => <ColumnHeader />}
              data={listPerkuliahanBerjalan ? listPerkuliahanBerjalan.data : []}
              scroll={{ x: 1300 }}
              columnProperty={columnProperty}
              excludeColumns={['_id', 'createdBy']}
              onRowClick={handleRowClick}
              pagination={{
                onChange: page => {
                  setPageNumber(page)
                },
                total: listPerkuliahanBerjalan ? listPerkuliahanBerjalan.count : 10,
                defaultCurrent: Number(pageNumber)
              }}
              loading={loadListPerkuliahanBerjalan}
            />
          ) : (
            ''
          )}
        </div>
      </Content>
    </LayoutPage>
  )
}

PerkuliahanBerjalanPage.propTypes = {
  history: object
}

export default PerkuliahanBerjalanPage
