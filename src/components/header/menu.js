import React from 'react'
import { Menu } from 'antd'
import { NavLink } from 'react-router-dom'

const SubMenu = Menu.SubMenu

function MainMenu() {
  const path = document.location.pathname
  const listMenus = [
    {
      name: 'Home',
      path: '/home'
    },
    {
      name: 'KPI',
      path: '/kpi',
      submenus: [
        {
          name: 'KPI Calculation',
          path: '/kpi/calculation'
        },
        {
          name: 'KPI Achivement',
          path: '/kpi/achivement'
        }
      ]
    },
    {
      name: 'Management',
      path: '/management',
      submenus: [
        {
          name: 'Mapping',
          path: '/management/mapping'
        }
      ]
    },
    {
      name: 'Administration',
      path: '/administration'
    }
  ]

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
          return menu.submenus && menu.submenus[0] ?
            (<SubMenu key={menu.path} title={menu.name}>
              {menu.submenus.map(submenu => (
                <Menu.Item key={submenu.path}>
                  <NavLink to={submenu.path}>{submenu.name}</NavLink>
                </Menu.Item>
              ))}
            </SubMenu>) :
            (<Menu.Item key={menu.path}>
              <NavLink to={menu.path}>{menu.name}</NavLink>
            </Menu.Item>)
        }
        )}
      </Menu>
    </nav>
  )
}

export default MainMenu
