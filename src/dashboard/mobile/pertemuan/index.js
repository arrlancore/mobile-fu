import { Card, Spin, message } from 'antd'
import Helmet from 'components/helmet'
import { object } from 'prop-types'
import LayoutPage from 'components/layout'
import Content from 'components/layout/content'
import React from 'react'
import { usePrevious, useStateValue, useStateDefault } from 'context'
import { list } from 'context/presensi-dosen/action'
import { ambilPresensi, viewByParam } from 'context/presensi-mahasiswa/action'
import Button from 'components/button'
import Input from 'components/input'
import './style.css'

function PertemuanPage(props) {
  const [item] = React.useState(props.history.location.state)
  const [lokasi, setLokasi] = React.useState(null)
  const [kunciKelas, setKunciKelas] = React.useState('')
  const [statusPresensiMahasiswa, setStatusPresensiMahasiswa] = React.useState('Belum Ada')
  const [presensiDosen, dispatch] = useStateValue('listPresensiDosen')
  const [presensiMahasiswa] = useStateValue('presensiMahasiswa')
  const [user] = useStateValue('user')
  const dosen = presensiDosen && presensiDosen.data[0] ? presensiDosen.data[0] : {}
  const [, loadingPresensiDosen] = useStateDefault('LIST_PRESENSI_DOSEN')
  const [, loadingListPresensiMahasiswa] = useStateDefault('LIST_PRESENSI_MAHASISWA')
  const [, loadingPresensiMahasiswa] = useStateDefault('PRESENSI_MAHASISWA')

  const prevItem = usePrevious(item)
  const prevPresensiDosen = usePrevious(presensiDosen)
  const prevPresensiMahasiswa = usePrevious(presensiMahasiswa)
  React.useEffect(() => {
    const loadStatusPresensiDosen = jadwal => {
      list(dispatch, { jadwal, select: 'isActive' })
    }

    const loadStatusPresensiMahasiswa = jadwal => {
      viewByParam(dispatch, { jadwal, mahasiswa: user.data._id })
    }
    if (!lokasi && item) {
      getGeoLocation()
    }
    if (item && prevItem !== item) {
      loadStatusPresensiDosen(item._id)
      loadStatusPresensiMahasiswa(item._id)
    }
    if (presensiDosen && prevPresensiDosen !== presensiDosen && !presensiMahasiswa) {
      loadStatusPresensiMahasiswa(item._id)
    }
    if (presensiMahasiswa && prevPresensiMahasiswa !== presensiMahasiswa) {
      let statuses = 'Belum Ada'
      if (presensiMahasiswa.data !== null) {
        if (presensiMahasiswa.data.statusPresensi) {
          statuses = presensiMahasiswa.data.statusPresensi
          if (presensiMahasiswa.message) {
            message.info(presensiMahasiswa.message)
          }
        }
      }
      setStatusPresensiMahasiswa(statuses)
    }
  }, [
    lokasi,
    item,
    prevItem,
    presensiDosen,
    prevPresensiDosen,
    presensiMahasiswa,
    dispatch,
    user.data._id,
    prevPresensiMahasiswa
  ])

  // propsMobileHeader
  const headerConfig = {
    title: 'Pertemuan',
    onBack: () => {
      props.history.goBack()
    }
  }

  const handleAmbilPresensi = () => {
    if (kunciKelas) {
      if (kunciKelas.length !== 4) {
        message.warning('Kunci kelas tidak valid')
        return false
      }
      const payload = {
        jadwal: item._id,
        lokasi,
        kunciKelas
      }
      ambilPresensi(dispatch, payload)
    } else {
      message.warning('Kunci kelas belum di input')
    }
  }

  async function getGeoLocation() {
    if (navigator) {
      const showError = error => {
        let message = ''
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = 'User denied the request for Geolocation.'
            break
          case error.POSITION_UNAVAILABLE:
            message = 'Location information is unavailable.'
            break
          case error.TIMEOUT:
            message = 'The request to get user location timed out.'
            break
          default:
            message = 'An unknown error occurred.'
            break
        }
        message.error(message)
        console.error(message)
      }
      let coords = {}
      await navigator.geolocation.getCurrentPosition(
        function(position) {
          coords = {
            latitude: -6.172584 || position.coords.latitude,
            longitude: 106.871743 || position.coords.longitude
          }
          setLokasi(coords)
        },
        showError,
        { timeout: 5000 }
      )
    }
  }

  const Loader = () => (
    <div className="--loader">
      <Spin />
    </div>
  )

  const statusPertemuan = () => {
    if (dosen.isActive === true) {
      return 'Sedang Berlangsung'
    }
    if (dosen.isActive === false) {
      return 'Sudah Selesai'
    }
    return 'Belum Dimulai'
  }
  const status = statusPertemuan()
  return (
    <LayoutPage withMobileHeader propsMobileHeader={headerConfig}>
      <Helmet>
        <title>{headerConfig.title}</title>
      </Helmet>
      <Content>
        {item ? (
          <Card title={`${item.mataKuliah.namaMataKuliah} Pertemuan: ${item.pertemuan}`}>
            <div>
              <small>
                <strong>Tanggal Pertemuan</strong>
              </small>
              <p>{new Date(item.tanggal).toLocaleDateString()}</p>
            </div>
            <div>
              <small>
                <strong>Waktu Mulai</strong>
              </small>
              <p>{item.waktuMulai}</p>
            </div>
            <div>
              <small>
                <strong>Waktu Selesai</strong>
              </small>
              <p>{item.waktuSelesai}</p>
            </div>
            <div>
              <small>
                <strong>Dosen</strong>
              </small>
              <p>{item.dosen.fullName}</p>
            </div>
            <div>
              <small>
                <strong>Kelas</strong>
              </small>
              <p>{item.kelas.namaKelas}</p>
            </div>
            <div>
              <small>
                <strong>Gedung</strong>
              </small>
              <p>{item.kelas.gedung.namaGedung}</p>
            </div>
            <div>
              <small>
                <strong>Koordinat Lokasi</strong>
              </small>
              <p>{lokasi ? `${lokasi.latitude},${lokasi.longitude}` : ''}</p>
            </div>
            <div>
              <small>
                <strong>Status Presensi</strong>
              </small>
              <p>{statusPresensiMahasiswa}</p>
            </div>
            <div>
              <small>
                <strong>Status Pertemuan</strong>
              </small>
              {loadingPresensiDosen ? <Loader /> : <p>{status}</p>}
            </div>
            {status === 'Sedang Berlangsung' && statusPresensiMahasiswa === 'Belum Ada' ? (
              <>
                <Input placeholder="Kunci Kelas" onChange={({ target }) => setKunciKelas(target.value)} />
                <Button
                  onClick={handleAmbilPresensi}
                  loading={loadingPresensiMahasiswa || loadingListPresensiMahasiswa}
                  type="secondary"
                >
                  Ambil Presensi
                </Button>
              </>
            ) : (
              ''
            )}
          </Card>
        ) : (
          'Loading..'
        )}
      </Content>
    </LayoutPage>
  )
}

PertemuanPage.propTypes = {
  history: object
}

export default PertemuanPage
