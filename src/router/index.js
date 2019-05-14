import React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'

import Login from 'dashboard/login'
import Home from 'dashboard/home'
import KpiCalculation from 'dashboard/kpi/calculation'
import KpiAchivement from 'dashboard/kpi/achivement'
import Administration from 'dashboard/administration'
import NotFoundPage from 'dashboard/notfound'

function ReactRouter() {
  return (
    <Router>
      <Route exact path="/" component={Login} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/kpi-calculation" component={KpiCalculation} />
      <Route exact path="/kpi-achivement" component={KpiAchivement} />
      <Route exact path="/administration" component={Administration} />
      <Route component={NotFoundPage} />
    </Router>
  )
}

export default ReactRouter
