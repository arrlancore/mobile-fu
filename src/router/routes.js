import { lazy } from 'react'
import Login from 'dashboard/login'
import NotFoundPage from 'dashboard/notfound'

// only lazyload the pages protected and with header
const HomePage = lazy(() => import('dashboard/home')) // eslint-disable-line
const KpiCalculationPage = lazy(() => import('dashboard/kpi/calculation'))
const KpiAchivementPage = lazy(() => import('dashboard/kpi/achivement'))
const KpiReportPage = lazy(() => import('dashboard/kpi/report'))
const MappingPage = lazy(() => import('dashboard/management/mapping'))
const UserPage = lazy(() => import('dashboard/general/user'))

const routes = [
  {
    path: '/',
    exact: true,
    component: Login
  },
  {
    path: '/home',
    exact: true,
    component: HomePage,
    isProtected: true
  },
  {
    path: '/kpi/calculation',
    exact: true,
    component: KpiCalculationPage,
    isProtected: true
  },
  {
    path: '/kpi/achivement',
    exact: true,
    component: KpiAchivementPage,
    isProtected: true
  },
  {
    path: '/kpi/report',
    exact: true,
    component: KpiReportPage,
    isProtected: true
  },
  {
    path: '/management/mapping',
    exact: true,
    component: MappingPage,
    isProtected: true
  },
  {
    path: '/user',
    exact: true,
    component: UserPage,
    isProtected: true
  },
  {
    path: '*',
    component: NotFoundPage
  }
]

export default routes
