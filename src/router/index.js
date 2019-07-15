import React, { Suspense } from 'react'
import { Switch, BrowserRouter } from 'react-router-dom'
import ProtectedRoute from './protectedRoute'
import CustomRoute from './customRoute'
import LoadingPage from 'components/loader/pageLoad'
import routes from './routes'

function ReactRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingPage />}>
        <Switch>
          {routes.map(({ isProtected, ...rest }, i) =>
            isProtected ? (
              <ProtectedRoute key={i} {...rest} />
            ) : (
              <CustomRoute key={i} {...rest} />
            )
          )}
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

export default ReactRouter
