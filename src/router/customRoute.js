import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import './progress.css'

function CustomRoute(props) {
  Nprogress.start()
  useEffect(() => {
    Nprogress.done()
  })
  return(
    <Route {...props} />
  )
}

export default CustomRoute
