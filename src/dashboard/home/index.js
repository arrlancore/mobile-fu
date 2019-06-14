import React from 'react'
import LayoutPage from 'components/layout'
import Helmet from 'components/helmet'
import { useTranslation } from 'react-i18next'

function HomePage () {
  const { t } = useTranslation() // t is translate function to show a message by language chosen
  const tKey = 'dashboard.home.'
  return (
    <LayoutPage withHeader>
      <Helmet>
        <title>{t(tKey + 'pageTitle')}</title>
      </Helmet>
    </LayoutPage>
  )
}

export default HomePage
