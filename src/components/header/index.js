import React from 'react'
import { node, func, bool } from 'prop-types'
import {
  Layout, Avatar, Col, Row, Menu, Dropdown, Icon, Badge
} from 'antd'
import PhotoTemp from 'assets/image/temp/Photo.png'
import IconBell from 'assets/icon/Bell.svg'
import IconMessages from 'assets/icon/Messages.svg'
import ImageIcon from 'components/image-icon'
import { useStateValue } from 'context'
import MainMenu from './menu'
import logout from 'utils/logout'
import NotoficationPopOver from './notification'
import { withTranslation } from 'react-i18next'
import './style.css'

const { Header } = Layout

function handleMenuClick(e) {
  console.log('click', e)
  if (e.key === 'logout') {
    logout()
  }
}

function Headers(props) {
  const { t, tReady, ...rest } = props
  const [user] = useStateValue('user')
  const firstName = user.data && user.data.fullname.split(' ')[0]
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="myprofile">My Profile</Menu.Item>
      <Menu.Item key="setting">Setting</Menu.Item>
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  )
  const showBadge = true
  return (
    <>
      <Header {...rest} className="header-base header-font">
        <Row
          gutter={8}
          align="middle"
          type="flex"
          justify="center"
          style={{ height: '100%' }}
        >
          <Col xs={7} xl={5}>
            <Avatar
              src={user.data.photoProfile || PhotoTemp}
              size="large"
              className="header-avatar"
            />
            <div style={{ display: 'inline' }}>{tReady && t('components.header.wellcome')}, </div>
            <Dropdown overlay={menu}>
              <span className="primary-header-color">
                {firstName}
                <Icon
                  style={{
                    marginLeft: 14,
                    color: '#B9BBC5',
                    position: 'relative',
                    top: 2
                  }}
                  type="caret-down"
                />
              </span>
            </Dropdown>
          </Col>
          <Col
            xs={5}
            xl={7}
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              borderLeft: '1px solid #efefef'
            }}
          >
            <NotoficationPopOver>
              <ImageIcon onClick={ () => { }} src={IconBell} alt="Notification" />
              {showBadge && <Badge style={{ height: 24 }} color="#DC5667" dot={true} />}
            </NotoficationPopOver>
            <ImageIcon onClick={ () => { }} src={IconMessages} alt="Messages" />
          </Col>
          <Col xs={12} xl={12}>
            <MainMenu />
          </Col>
        </Row>
      </Header>
    </>
  )
}

Headers.propTypes = {
  children: node,
  t: func,
  tReady: bool
}

export default withTranslation()(Headers)
