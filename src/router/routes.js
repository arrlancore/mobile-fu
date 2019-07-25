import Login from 'dashboard/login'
import NotFoundPage from 'dashboard/notfound'

// only lazyload the pages protected and with header
import HomePage from 'dashboard/home'
import JadwalPage from 'dashboard/mobile/jadwal'
import JadwalDosenPage from 'dashboard/mobile/jadwal-dosen'
import LaporanPresensiPage from 'dashboard/mobile/laporan-presensi'
import PertemuanPage from 'dashboard/mobile/pertemuan'

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
    path: '/mobile/jadwal',
    exact: true,
    component: JadwalPage,
    isProtected: true
  },
  {
    path: '/mobile/jadwal-dosen',
    exact: true,
    component: JadwalDosenPage,
    isProtected: true
  },
  {
    path: '/mobile/laporan-presensi',
    exact: true,
    component: LaporanPresensiPage,
    isProtected: true
  },
  {
    path: '/mobile/pertemuan',
    exact: true,
    component: PertemuanPage,
    isProtected: true
  },
  {
    path: '*',
    component: NotFoundPage
  }
]

export default routes
