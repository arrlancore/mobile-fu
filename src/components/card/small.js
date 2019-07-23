import React from 'react'
import { withRouter } from 'react-router-dom'
import { Card, Row, Col } from 'antd'
import './style.css'
import { string, object } from 'prop-types'

const small = props => {
  const { icon, history, name, link } = props
  return (
    <Card className="card_small" onClick={() => history.push(link)} hoverable>
      <Row className="card--wrapper">
        <Col span={18}>
          <h3 className="card_small--left">{name}</h3>
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
  name: string,
  history: object
}

export default withRouter(small)
