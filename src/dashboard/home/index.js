import React from 'react'
import LayoutPage from 'components/layout'
import Helmet from 'components/helmet'

function HomePage () {
  return (
    <LayoutPage withHeader>
      <Helmet>
        <title>KPI Homepage</title>
      </Helmet>
    </LayoutPage>
  )
}

export default HomePage
