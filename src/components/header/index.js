import React from 'react'
import {
  node, object, func, bool
} from 'prop-types'
import {
  Layout, Avatar, Col, Row, Menu, Dropdown, Icon, Badge
} from 'antd'
import PhotoTemp from 'assets/image/temp/Photo.png'
import IconBell from 'assets/icon/Bell.svg'
import IconMessages from 'assets/icon/Messages.svg'
import ImageIcon from 'components/image-icon'
import MainMenu from './menu'
import userData from 'utils/userData'
import logout from 'utils/logout'
import NotoficationPopOver from './notification'
import { withTranslation } from 'react-i18next'
import './style.css'

const { Header } = Layout

function handleMenuClick(e) {
  console.log('click', e)
  if (e.key === '3' && window) {
    logout()
  }
}

const header = props => {
  const { user, t, tReady, ...rest } = props
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">My Profile</Menu.Item>
      <Menu.Item key="2">Setting</Menu.Item>
      <Menu.Item key="3">Logout</Menu.Item>
    </Menu>
  )
  const showBadge = true
  const userProfile = userData() || {}
  return (
    <>
      <Header {...rest} className="header-base header-font">
        {/* {props.children} */}
        <Row
          gutter={8}
          align="middle"
          type="flex"
          justify="center"
          style={{ height: '100%' }}
        >
          <Col xs={7} xl={5}>
            <Avatar
              src={user.imageProfile}
              size="large"
              className="header-avatar"
            />
            <div style={{ display: 'inline' }}>{tReady && t('components.header.wellcome')}, </div>
            <Dropdown overlay={menu}>
              <span className="primary-header-color">
                {userProfile.fullname}
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
      {/* <div className="header-shadow" /> */}
    </>
  )
}

header.propTypes = {
  children: node,
  user: object,
  t: func,
  tReady: bool
}
header.defaultProps = { user: {
  firstName: 'Jaine', imageProfile: PhotoTemp
} }

export default withTranslation()(header)
