import React from 'react'
import { object } from 'prop-types'
import { Redirect } from 'react-router-dom'
import doLogouts from 'utils/logout'
import { PageHeader, Icon } from 'antd'
import './mobile.css'
function MobileHeader({ header, ...rest }) {
  const [logout, setLogout] = React.useState(false)

  const onLogout = () => {
    setLogout(true)
    doLogouts(setLogout)
  }
  if (logout) {
    return <Redirect push to="/" />
  }
  return (
    <PageHeader
      className="header--mobile"
      onBack={header.onBack}
      title={header.title}
      subTitle={header.subTitle}
      extra={[<Icon onClick={onLogout} key="logout" type="poweroff" />]}
      {...rest}
    />
  )
}

MobileHeader.propTypes = {
  header: object
}

MobileHeader.defaultProps = {
  header: {
    onBack: false,
    title: 'Perkuliahan FT UMJ',
    subTitle: ''
  }
}

export default MobileHeader
