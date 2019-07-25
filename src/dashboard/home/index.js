import { Col, Row, Card } from 'antd'
import Helmet from 'components/helmet'
import LayoutPage from 'components/layout'
import Content from 'components/layout/content'
import Link from 'components/link'
import Title from 'components/text/title'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useStateValue } from 'context'

import './style.css'

const MenuMahasiswa = () => (
  <Row gutter={16}>
    <Col className="mobile--menu" span={24}>
      <Link to="/mobile/jadwal">
        <Card className="card--menu">
          <Title level={4}>Jadwal</Title>
        </Card>
      </Link>
    </Col>
    <Col className="mobile--menu" span={24}>
      <Link to="/mobile/laporan-presensi">
        <Card className="card--menu">
          <Title level={4}>Laporan Presensi</Title>
        </Card>
      </Link>
    </Col>
  </Row>
)
const MenuDosen = () => (
  <Row gutter={16}>
    <Col className="mobile--menu" span={24}>
      <Link to="/mobile/jadwal-dosen">
        <Card className="card--menu">
          <Title level={4}>Jadwal</Title>
        </Card>
      </Link>
    </Col>
  </Row>
)

function HomePage() {
  const { t } = useTranslation() // t is translate function to show a message by language chosen
  const tKey = 'dashboard.home.'
  const [user] = useStateValue('user')
  // propsMobileHeader

  const Menus = user.data.role === 'mahasiswa' ? MenuMahasiswa : MenuDosen

  return (
    <LayoutPage withMobileHeader>
      <Helmet>
        <title>{t(`${tKey}pageTitle`)}</title>
      </Helmet>
      <Content>
        <Menus />
      </Content>
    </LayoutPage>
  )
}

export default HomePage
