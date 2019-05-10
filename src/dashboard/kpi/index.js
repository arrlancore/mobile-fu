import React from 'react'
import LayoutPage from 'components/layout'
import Content from 'components/layout/content'
import Helmet from 'components/helmet'
import Select from 'components/select'
import Title from 'components/text/title'



function KpiPage () {
  const listYear = [
    {
      name: 2019,
      value: 2019
    },
    {
      name: 2018,
      value: 2018
    }
  ]
  return (
    <LayoutPage withHeader>
      <Helmet>
        <title>KPI Calculation</title>
      </Helmet>
      <Content>
        <Title bold level={2}>Calculation</Title>
        <Title bold level={3}>Choose Period</Title>
        <Select label="Year" optionList={listYear} />
      </Content>
    </LayoutPage>
  )
}

export default KpiPage
