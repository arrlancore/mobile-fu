import React from 'react'
import { Switch, BrowserRouter } from 'react-router-dom'
import ProtectedRoute from './protectedRoute'
import CustomRoute from './customRoute'

import Login from 'dashboard/login'
import Home from 'dashboard/home'
import KpiCalculation from 'dashboard/kpi/calculation'
import KpiAchivement from 'dashboard/kpi/achivement'
import Mapping from 'dashboard/kpi/mapping'
import Administration from 'dashboard/administration'
import NotFoundPage from 'dashboard/notfound'
import User from 'dashboard/administration/user'

const routes = [
  {
    path: '/',
    exact: true,
    component: Login
  },
  {
    path: '/home',
    exact: true,
    component: Home,
    isProtected: true
  },
  {
    path: '/kpi/calculation',
    exact: true,
    component: KpiCalculation,
    isProtected: true
  },
  {
    path: '/kpi/achivement',
    exact: true,
    component: KpiAchivement,
    isProtected: true
  },
  {
    path: '/management/mapping',
    exact: true,
    component: Mapping,
    isProtected: true
  },
  {
    path: '/administration',
    exact: true,
    component: Administration,
    isProtected: true
  },
  {
    path: '/administration/user',
    exact: true,
    component: User,
    isProtected: true
  },
  {
    path: '*',
    component: NotFoundPage
  }
]

function ReactRouter() {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map(({ isProtected, ...rest }, i) => (
          isProtected
            ? <ProtectedRoute key={i} {...rest} />
            : <CustomRoute key={i} {...rest} />
        ))}
      </Switch>
    </BrowserRouter>
  )
}

export default ReactRouter
