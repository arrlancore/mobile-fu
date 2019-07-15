import React from 'react'
import { node } from 'prop-types'
import { Avatar, Popover, List } from 'antd'
const data = [
  {
    title: 'Notification Title 1'
  },
  {
    title: 'Notification Title 2'
  },
  {
    title: 'Notification Title 3'
  },
  {
    title: 'Notification Title 4'
  }
]

const ContentList = () => (
  <div style={{ maxWidth: 300 }}>
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title={<a href="#">{item.title}</a>}
            description="Ant Design, a design language for background applications..."
          />
        </List.Item>
      )}
    />
  </div>
)

const NotoficationPopOver = ({ children }) => (
  <Popover placement="bottom" title="Notification (4)" content={<ContentList />} trigger="click">
    {children}
  </Popover>
)

NotoficationPopOver.propTypes = {
  children: node
}

export default NotoficationPopOver
