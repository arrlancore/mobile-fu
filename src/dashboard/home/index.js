import React from 'react'
import LayoutPage from 'components/layout'
import Helmet from 'components/helmet'
class HomePage extends React.Component {
  render() {
    return (
      <LayoutPage withHeader>
        <Helmet>
          <title>KPI Homepage</title>
        </Helmet>
      </LayoutPage>
    )
  }
}

export default HomePage
