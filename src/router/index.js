import React from 'react'
import { Switch, BrowserRouter, Route } from 'react-router-dom'
import ProtectedRoute from './protectedRoute'
// import Route from './routeWithProgress'

import Login from 'dashboard/login'
import Home from 'dashboard/home'
import KpiCalculation from 'dashboard/kpi/calculation'
import KpiAchivement from 'dashboard/kpi/achivement'
import Mapping from 'dashboard/kpi/mapping'
import Administration from 'dashboard/administration'
import NotFoundPage from 'dashboard/notfound'

function ReactRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <ProtectedRoute exact path="/home" component={Home} />
        <ProtectedRoute exact path="/kpi-calculation" component={KpiCalculation} />
        <ProtectedRoute exact path="/kpi-achivement" component={KpiAchivement} />
        <ProtectedRoute exact path="/mapping" component={Mapping} />
        <ProtectedRoute exact path="/administration" component={Administration} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default ReactRouter
