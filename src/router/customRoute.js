import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import './progress.css'

function CustomRoute(props) {
  Nprogress.start()
  console.log('TCL: CustomRoute -> Nprogress', Nprogress.isStarted())
  useEffect(() => {
    Nprogress.done()
    console.log('TCL: CustomRoute -> Nprogress', Nprogress)
  })
  return(
    <Route {...props} />
  )
}

export default CustomRoute
