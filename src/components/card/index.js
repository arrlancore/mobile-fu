import React from 'react'
import { Card } from 'antd'
import {
  node, string
} from 'prop-types'


const index = ({
  children, title
}) => {
  return (
    <Card title={title}>
      {children}
    </Card>
  )
}

index.propTypes = {
  children: node,
  title: string
}


export default index
