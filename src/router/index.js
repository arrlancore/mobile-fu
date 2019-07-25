import React from 'react'
import { Switch, BrowserRouter } from 'react-router-dom'
import ProtectedRoute from './protectedRoute'
import CustomRoute from './customRoute'
import routes from './routes'

function ReactRouter() {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map(({ isProtected, ...rest }, i) =>
          isProtected ? <ProtectedRoute key={i} {...rest} /> : <CustomRoute key={i} {...rest} />
        )}
      </Switch>
    </BrowserRouter>
  )
}

export default ReactRouter
