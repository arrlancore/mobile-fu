import React from 'react'
import { Menu } from 'antd'
import { Redirect } from 'react-router-dom'
import doLogouts from 'utils/logout'

const SubMenu = Menu.SubMenu

function MainMenu() {
  const [logout, setLogout] = React.useState(false)

  const path = document.location.pathname
  const listMenus = [
    {
      name: 'logout',
      path: '/logout',
      onClick: () => {
        doLogouts()
        setLogout(true)
      }
    }
  ]
  if (logout) {
    return <Redirect push to="/" />
  }
  return (
    <nav className="root-menu">
      <Menu
        selectedKeys={[path]}
        mode="horizontal"
        style={{
          lineHeight: '82px',
          width: '100%',
          fontSize: 18,
          borderBottom: 0
        }}
      >
        {listMenus.map(menu => {
          return menu.submenus && menu.submenus[0] ? (
            <SubMenu key={menu.path} title={menu.name}>
              {menu.submenus.map(submenu => (
                <Menu.Item key={submenu.path}>
                  {/* <NavLink to={submenu.path}> */}
                  {submenu.name}
                  {/* </NavLink> */}
                </Menu.Item>
              ))}
            </SubMenu>
          ) : (
            <Menu.Item onClick={menu.onClick} key={menu.path}>
              {/* <NavLink to={menu.path}> */}
              {menu.name}
              {/* </NavLink> */}
            </Menu.Item>
          )
        })}
      </Menu>
    </nav>
  )
}

export default MainMenu
