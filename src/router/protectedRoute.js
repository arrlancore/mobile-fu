import React from 'react'
import { Redirect } from 'react-router-dom'
import { isLogin } from 'utils/userData'
import Route from './customRoute'
// import Route from './routeWithProgress'

function ProtectedRoute(props) {
  return isLogin() ? <Route {...props} /> : <Redirect to="/" />
}

export default ProtectedRoute
