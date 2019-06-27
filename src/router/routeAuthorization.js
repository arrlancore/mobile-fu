import React from 'react'
const Auth = (WrappedComponent, allowedRoles) => {
  return (function AccessRolesCheck(props) {
    const [user] = React.useState({ name: 'dwiki', role: 'admin' })
    const { role } = user
    if (allowedRoles.includes(role)) {
      return <WrappedComponent {...props} />
    }
    return <div />
  })(
  )
}

export default Auth
