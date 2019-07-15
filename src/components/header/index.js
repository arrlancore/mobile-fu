import React from 'react'
import { Redirect } from 'react-router-dom'
import { node, func, bool } from 'prop-types'
import { Layout, Avatar, Col, Row, Menu, Dropdown, Icon, Badge } from 'antd'
import PhotoTemp from 'assets/image/temp/Photo.png'
import IconBell from 'assets/icon/Bell.svg'
import IconMessages from 'assets/icon/Messages.svg'
import ImageIcon from 'components/image-icon'
import { useStateValue } from 'context'
import MainMenu from './menu'
import logouts from 'utils/logout'
import NotoficationPopOver from './notification'
import { withTranslation } from 'react-i18next'
import './style.css'

const { Header } = Layout

function Headers(props) {
  const { t, tReady, ...rest } = props
  const [user] = useStateValue('user')
  const [logout, setLogout] = React.useState(false)
  const firstName = user.data ? user.data.fullname.split(' ')[0] : 'Guest'
  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          console.log('click my profile')
        }}
        key="myprofile"
      >
        My Profile
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          console.log('click my setting')
        }}
        key="setting"
      >
        Setting
      </Menu.Item>
      <Menu.Item onClick={() => logouts(setLogout)} key="logout">
        Logout
      </Menu.Item>
    </Menu>
  )
  const showBadge = true
  if (logout) {
    return <Redirect push to="/" />
  }
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
              src={user.data ? user.data.photoProfile : PhotoTemp}
              size="large"
              className="header-avatar"
            />
            <div style={{ display: 'inline' }}>
              {tReady && t('components.header.wellcome')},{' '}
            </div>
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
              <ImageIcon onClick={() => {}} src={IconBell} alt="Notification" />
              {showBadge && (
                <Badge style={{ height: 24 }} color="#DC5667" dot={true} />
              )}
            </NotoficationPopOver>
            <ImageIcon onClick={() => {}} src={IconMessages} alt="Messages" />
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
