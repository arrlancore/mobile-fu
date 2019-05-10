import React from 'react'
import { Menu } from 'antd'
import { NavLink } from 'react-router-dom'

function MainMenu() {
  const path = document.location.pathname
  const listMenus = [
    {
      name: 'Home',
      path: '/home',
    },
    {
      name: 'KPI',
      path: '/kpi',
    },
    {
      name: 'Administration',
      path: '/administration',
    }
  ]
  return (
    <div className="root-menu">
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
        {listMenus.map(menu => (
          <Menu.Item key={menu.path}>
            <NavLink to={menu.path}>{menu.name}</NavLink>
          </Menu.Item>
        ))}
      </Menu>
    </div>
  )
}

export default MainMenu
