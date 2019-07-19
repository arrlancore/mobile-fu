import React from 'react'
import { Card, Row, Col } from 'antd'
import './style.css'
import { string } from 'prop-types'

const small = ({ icon, link, name }) => {
  return (
    <Card className="card_small" hoverable>
      <Row className="card--wrapper">
        <Col span={18}>
          <div className="card_small--left">
            <a className="title_bottom" href={link}>
              {name}
            </a>
          </div>
        </Col>
        <Col span={6}>
          <div className="card_small--right">{icon}</div>
        </Col>
      </Row>
    </Card>
  )
}

small.propTypes = {
  icon: string,
  link: string,
  name: string
}

export default small
