import { List, Card, Row, Col } from 'antd'
import Helmet from 'components/helmet'
import { object } from 'prop-types'
import LayoutPage from 'components/layout'
import Content from 'components/layout/content'
import React from 'react'
import { usePrevious, useStateValue } from 'context'
import { getReport } from 'context/presensi-mahasiswa/action'

import './style.css'

function LaporanPresensiPage(props) {
  const [summary, setSummary] = React.useState([])

  const [reports, dispatch] = useStateValue('listPresensiMahasiswa')
  const [user] = useStateValue('user')

  const prevReports = usePrevious(reports)
  React.useEffect(() => {
    if (!reports && reports !== prevReports) {
      getReport(dispatch, { id: user.data._id })
    }
    if (reports && reports !== prevReports) {
      getSummary(reports.data)
    }
  }, [dispatch, prevReports, reports, user.data._id])

  const getSummary = data => {
    let sum = []
    for (let i = 0; i < data.length; i++) {
      let matkul = data[i]
      const pertemuan = matkul.presensi.length
      const pertemuanHadir = matkul.presensi.filter(state => state.statusPresensi === 'hadir').length
      const namaMatKul = matkul.namaMataKuliah
      const totalPertemuan = 16
      const persentase = (pertemuanHadir / totalPertemuan) * 100
      sum.push({
        pertemuan,
        pertemuanHadir,
        namaMataKuliah: namaMatKul,
        persentase
      })
    }
    setSummary(sum)
    console.log('TCL: LaporanPresensiPage -> sum', sum)
  }
  // propsMobileHeader
  const headerConfig = {
    title: 'Laporan Presensi',
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
        <Row gutter={16}>
          <Col className="mobile--menu" span={24}>
            <Card>
              <p>RINGKASAN LAPORAN</p>
              {summary.map((summary, j) => (
                <div key={j}>
                  <div>{`:: ${summary.namaMataKuliah} ${summary.persentase.toFixed(2)}% kehadiran`}</div>
                  <div>
                    <span style={{ marginLeft: 10 }}>{`Total Pertemuan: ${summary.pertemuan} of 16`}</span>
                  </div>
                  <div>
                    <span style={{ marginLeft: 10 }}>{`Total Kehadiran: ${summary.pertemuanHadir} of 16`}</span>
                  </div>
                </div>
              ))}
            </Card>
          </Col>
        </Row>

        {reports && reports.data
          ? reports.data.map((data, i) => (
              <List
                key={i + '--'}
                style={{ marginBottom: 20 }}
                size="small"
                header={<strong>{data.namaMataKuliah.toUpperCase()}</strong>}
                bordered
                dataSource={data.presensi}
                renderItem={item => (
                  <List.Item>{`Pertemuan ${item.jadwal.pertemuan}, status (${item.statusPresensi ||
                    'tidak hadir'})`}</List.Item>
                )}
              />
            ))
          : 'No Data'}
      </Content>
    </LayoutPage>
  )
}

LaporanPresensiPage.propTypes = {
  history: object
}

export default LaporanPresensiPage
