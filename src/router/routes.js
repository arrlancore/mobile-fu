import { lazy } from 'react'
import Login from 'dashboard/login'
import NotFoundPage from 'dashboard/notfound'

// only lazyload the pages protected and with header
const HomePage = lazy(() => import('dashboard/home')) // eslint-disable-line
const UserPage = lazy(() => import('dashboard/general/user'))
const JadwalPage = lazy(() => import('dashboard/general/jadwal'))
const PerkuliahanBerjalanPage = lazy(() => import('dashboard/general/perkuliahan-berjalan'))
const PresensiDosenPage = lazy(() => import('dashboard/general/presensi-dosen'))
const PresensiMahasiswaPage = lazy(() => import('dashboard/general/presensi-mahasiswa'))
const GedungPage = lazy(() => import('dashboard/master/gedung'))
const KelasPage = lazy(() => import('dashboard/master/kelas'))
const JurusanPage = lazy(() => import('dashboard/master/jurusan'))
const MataKuliahPage = lazy(() => import('dashboard/master/mata-kuliah'))
const PerkuliahanPage = lazy(() => import('dashboard/master/perkuliahan'))
const JamPerkuliahanPage = lazy(() => import('dashboard/master/jam-perkuliahan'))

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
    path: '/user',
    exact: true,
    component: UserPage,
    isProtected: true
  },
  {
    path: '/jadwal',
    exact: true,
    component: JadwalPage,
    isProtected: true
  },
  {
    path: '/perkuliahan-berjalan',
    exact: true,
    component: PerkuliahanBerjalanPage,
    isProtected: true
  },
  {
    path: '/presensi-dosen',
    exact: true,
    component: PresensiDosenPage,
    isProtected: true
  },
  {
    path: '/presensi-mahasiswa',
    exact: true,
    component: PresensiMahasiswaPage,
    isProtected: true
  },
  {
    path: '/master/gedung',
    exact: true,
    component: GedungPage,
    isProtected: true
  },
  {
    path: '/master/mata-kuliah',
    exact: true,
    component: MataKuliahPage,
    isProtected: true
  },
  {
    path: '/master/kelas',
    exact: true,
    component: KelasPage,
    isProtected: true
  },
  {
    path: '/master/perkuliahan',
    exact: true,
    component: PerkuliahanPage,
    isProtected: true
  },
  {
    path: '/master/jam-perkuliahan',
    exact: true,
    component: JamPerkuliahanPage,
    isProtected: true
  },
  {
    path: '/master/jurusan',
    exact: true,
    component: JurusanPage,
    isProtected: true
  },
  {
    path: '*',
    component: NotFoundPage
  }
]

export default routes
