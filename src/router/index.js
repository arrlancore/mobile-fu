import React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'

import Login from 'dashboard/login'
import Home from 'dashboard/home'
import KpiCalculation from 'dashboard/kpi/calculation'
import User from 'dashboard/managementUser'

function ReactRouter() {
  return (
    <Router>
      <Route exact path="/" component={Login} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/kpi-calculation" component={KpiCalculation} />
      <Route exact path="/user" component={User} />
    </Router>
  )
}

export default ReactRouter
