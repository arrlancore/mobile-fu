import { Col, Row, Icon } from 'antd'
import CardSmall from 'components/card/small'
import Helmet from 'components/helmet'
import LayoutPage from 'components/layout'
import Content from 'components/layout/content'
import Link from 'components/link'
import Title from 'components/text/title'
import React from 'react'
import { useTranslation } from 'react-i18next'

function HomePage() {
  const { t } = useTranslation() // t is translate function to show a message by language chosen
  const tKey = 'dashboard.home.'

  return (
    <LayoutPage withHeader>
      <Helmet>
        <title>{t(`${tKey}pageTitle`)}</title>
      </Helmet>
      <Content>
        <Row gutter={24}>
          <Col span={24} style={{ marginTop: 50 }}>
            <Title bold level={3}>
              {'Home'}
            </Title>
            <Row gutter={128} style={{ marginBottom: 24 }}>
              <Col span={6}>
                <Link to="/user">
                  <CardSmall icon={<Icon type="user" />} name="User" />
                </Link>
              </Col>
              <Col span={6}>
                <Link to="/jadwal">
                  <CardSmall icon={<Icon type="schedule" />} name="Jadwal" />
                </Link>
              </Col>
              <Col span={6}>
                <Link to="/perkuliahan-berjalan">
                  <CardSmall icon={<Icon type="user" />} name="Perkuliahan Berjalan" />
                </Link>
              </Col>
              <Col span={6}>
                <Link to="/presensi-dosen">
                  <CardSmall icon={<Icon type="user" />} name="Presensi Dosen" />
                </Link>
              </Col>
            </Row>
            <Row gutter={128} style={{ marginBottom: 24 }}>
              <Col span={6}>
                <Link to="/presensi-mahasiswa">
                  <CardSmall icon={<Icon type="user" />} name="Presensi Mahasiswa" />
                </Link>
              </Col>
            </Row>
          </Col>
          <Col style={{ marginTop: 50 }} span={24}>
            <Title bold level={3}>
              {'Master Data'}
            </Title>
            <Row gutter={128} style={{ marginBottom: 24 }}>
              <Col span={6}>
                <Link to="/master/gedung">
                  <CardSmall icon={<Icon type="user" />} name="Gedung" />
                </Link>
              </Col>
              <Col span={6}>
                <Link to="/master/kelas">
                  <CardSmall icon={<Icon type="user" />} name="Kelas" />
                </Link>
              </Col>
              <Col span={6}>
                <Link to="/master/perkuliahan">
                  <CardSmall icon={<Icon type="user" />} name="Perkuliahan" />
                </Link>
              </Col>
              <Col span={6}>
                <Link to="/master/jam-perkuliahan">
                  <CardSmall icon={<Icon type="user" />} name="Jam Perkuliahan" />
                </Link>
              </Col>
            </Row>
            <Row gutter={128} style={{ marginBottom: 24 }}>
              <Col span={6}>
                <Link to="/master/mata-kuliah">
                  <CardSmall icon={<Icon type="user" />} name="Mata Kuliah" />
                </Link>
              </Col>
              <Col span={6}>
                <Link to="/master/jurusan">
                  <CardSmall icon={<Icon type="user" />} name="Jurusan" />
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
    </LayoutPage>
  )
}

export default HomePage
