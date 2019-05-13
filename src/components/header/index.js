import React from 'react'
import { node, object } from 'prop-types'
import { Layout, Avatar, Col, Row, Menu, Dropdown, Icon, Badge } from 'antd'
import PhotoTemp from 'assets/image/temp/Photo.png'
import IconBell from 'assets/icon/Bell.svg'
import IconMessages from 'assets/icon/Messages.svg'
import ImageIcon from 'components/image-icon'
import MainMenu from './menu'
import './style.css'

const { Header } = Layout

function handleMenuClick(e) {
  console.log('click', e)
}

const header = props => {
  const { user } = props
  const menu = (
    <Menu mode="horizontal" onClick={handleMenuClick}>
      <Menu.Item key="1">My Profile</Menu.Item>
      <Menu.Item key="2">Setting</Menu.Item>
      <Menu.Item key="3">Logout</Menu.Item>
    </Menu>
  )
  const showBadge = true
  return (
    <>
      <Header {...props} className="header-base header-font">
        {/* {props.children} */}
        <Row
          gutter={8}
          align="middle"
          type="flex"
          justify="center"
          style={{ height: '100%' }}
        >
          <Col span={5}>
            <Avatar
              src={user.imageProfile}
              size="large"
              style={{ width: 72, height: 72, marginRight: 12 }}
            />
            <div style={{ display: 'inline' }}>Hello, </div>
            <Dropdown overlay={menu}>
              <span className="primary-header-color">
                {user.firstName}
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
            span={7}
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              borderLeft: '1px solid #efefef'
            }}
          >
            <ImageIcon onClick={ () => { }} src={IconBell} alt="Notification" />
            {showBadge && <Badge color="#DC5667" dot={true} />}
            <ImageIcon onClick={ () => { }} src={IconMessages} alt="Messages" />
          </Col>
          <Col span={12}>
            <MainMenu />
          </Col>
        </Row>
      </Header>
      <div className="header-shadow" />
    </>
  )
}

header.propTypes = { children: node, user: object }
header.defaultProps = {
  user: { firstName: 'Jaine', imageProfile: PhotoTemp }
}

export default header
