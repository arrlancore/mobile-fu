import { List } from 'antd'
import Helmet from 'components/helmet'
import { object } from 'prop-types'
import LayoutPage from 'components/layout'
import Content from 'components/layout/content'
import React from 'react'
import './style.css'

function JadwalPage(props) {
  const [jadwals, setJadwals] = React.useState([])
  React.useEffect(() => {
    const listJadwal = localStorage.getItem('jadwal')
    if (!jadwals[0]) {
      const indexJadwal = {}
      const data = JSON.parse(listJadwal || '[]')
      for (let i = 0; i < data.length; i++) {
        let jadwalKuliah = data[i]
        indexJadwal[jadwalKuliah.mataKuliah.namaMataKuliah] = jadwalKuliah.mataKuliah._id
      }
      let jadwalCategorized = []
      Object.keys(indexJadwal).forEach(key => {
        let temp = []
        data.forEach(jadwal => {
          if (key === jadwal.mataKuliah.namaMataKuliah) {
            temp.push(jadwal)
          }
        })
        jadwalCategorized.push(temp)
      })
      setJadwals(jadwalCategorized)
    }
  }, [jadwals])
  // propsMobileHeader
  const headerConfig = {
    title: 'Jadwal',
    onBack: () => {
      props.history.goBack()
    }
  }
  return (
    <LayoutPage withMobileHeader propsMobileHeader={headerConfig}>
      <Helmet>
        <title>{headerConfig.title}</title>
      </Helmet>
      <Content>
        {jadwals[0]
          ? jadwals.map((data, i) => (
              <List
                key={i + '--'}
                style={{ marginBottom: 20 }}
                size="small"
                header={<strong>{data[0].mataKuliah.namaMataKuliah.toUpperCase()}</strong>}
                bordered
                dataSource={data}
                renderItem={item => (
                  <List.Item onClick={() => props.history.push('/mobile/pertemuan', item)}>
                    {`Pertemuan ${item.pertemuan} (${new Date(item.tanggal).toLocaleDateString()}
                  ${item.waktuMulai}-${item.waktuSelesai} ${item.kelas.namaKelas})`}
                  </List.Item>
                )}
              />
            ))
          : ''}
      </Content>
    </LayoutPage>
  )
}

JadwalPage.propTypes = {
  history: object
}

export default JadwalPage
