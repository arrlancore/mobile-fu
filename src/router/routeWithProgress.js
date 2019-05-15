import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import Nprogress from 'nprogress'

function CustomRoute(props) {
  useEffect(() => {
    Nprogress.start()
    return function cleanProgress() {
      console.log('clear')
      setTimeout(() => {
        Nprogress.done()
      }, 1000)
    }
  })
  return(
    <Route {...props} />
  )
}

export default CustomRoute
