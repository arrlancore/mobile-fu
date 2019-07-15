import React from 'react'
import { Typography, Icon } from 'antd'
import Helmet from 'components/helmet'

import './style.css'

const { Title } = Typography

function ErrorNotFound() {
  console.error('Page not found')
  return (
    <div className="error-page">
      <Helmet>
        <title>Oops! Error page not found</title>
      </Helmet>
      <Icon type="robot" />
      <Title level={1}>Oops! That page can’t be found.</Title>
      <p className="notFoundDesc">
        It looks like nothing was found at this location. Please check the link
        or press back to go to the previous page.
      </p>
    </div>
  )
}

export default ErrorNotFound
