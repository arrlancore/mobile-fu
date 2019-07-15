import React from 'react'
// import { Row } from 'antd'
// import { useTranslation } from 'react-i18next'
// import { useStateValue } from 'context'
// import LayoutPage from 'components/layout'
// import Content from 'components/layout/content'
import Helmet from 'components/helmet'
import PageLoad from 'components/loader/pageLoad'
// import Button from 'components/button'
// import Table from 'components/table'
// import Title from 'components/text/title'
// import exData from './data.json'

import './style.css'

function UserViewPage(props) {
  console.log('TCL: UserViewPage -> props', props)
  // const { t } = useTranslation() // t is translate function to show a message by language chosen

  return (
    <div>
      <Helmet>
        <title>{props.match.params.id}</title>
      </Helmet>
      <b>{props.match.params.id}</b>
      <PageLoad />
    </div>
  )
}

export default UserViewPage
