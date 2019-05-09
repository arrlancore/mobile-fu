import React from 'react'
import { Menu } from 'antd'

function MainMenu() {
  const initMenu = 'home'
  const [activeMenu, setActiveMenu] = React.useState(initMenu)
  const onMenuCLicked = e => {
    setActiveMenu(e.key)
  }
  const listMenus = [
    {
      name: 'Home',
      key: 'home'
    },
    {
      name: 'KPI',
      key: 'kpi'
    },
    {
      name: 'Administration',
      key: 'administration'
    }
  ]
  return (
    <div className="root-menu">
      <Menu
        onClick={onMenuCLicked}
        selectedKeys={[activeMenu]}
        mode="horizontal"
        style={{
          lineHeight: '82px',
          width: '100%',
          fontSize: 18,
          borderBottom: 0
        }}
      >
        {listMenus.map(menu => (
          <Menu.Item key={menu.key}>{menu.name}</Menu.Item>
        ))}
      </Menu>
    </div>
  )
}

export default MainMenu
