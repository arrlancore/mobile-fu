import { userReducer } from './auth/reducer'
import { listUserReducer, singleUserReducer } from './user/reducer'
import { listJadwalReducer, jadwalReducer } from './jadwal/reducer'
import { listMasterGedungReducer, masterGedungReducer } from './master-gedung/reducer'
import { listMasterKelasReducer, masterKelasReducer } from './master-kelas/reducer'
import { listMasterPerkuliahanReducer, masterPerkuliahanReducer } from './master-perkuliahan/reducer'
import { listMasterJamPerkuliahanReducer, masterJamPerkuliahanReducer } from './master-jam-perkuliahan/reducer'
import { listMastermataKuliahReducer, mastermataKuliahReducer } from './master-mata-kuliah/reducer'
import { listMasterJurusanReducer, masterJurusanReducer } from './master-jurusan/reducer'
import { listPerkuliahanBerjalanReducer, PerkuliahanBerjalanReducer } from './perkuliahan-berjalan/reducer'
import { listPresensiDosenReducer, presensiDosenReducer } from './presensi-dosen/reducer'
import { listPresensiMahasiswaReducer, presensiMahasiswaReducer } from './presensi-mahasiswa/reducer'

import { errorReducer, loadingReducer } from './default/reducer'

export const reducers = {
  loading: loadingReducer,
  error: errorReducer,
  user: userReducer,
  listUser: listUserReducer,
  singleUser: singleUserReducer,
  jadwal: jadwalReducer,
  listJadwal: listJadwalReducer,
  listMasterGedung: listMasterGedungReducer,
  masterGedung: masterGedungReducer,
  listMasterKelas: listMasterKelasReducer,
  masterKelas: masterKelasReducer,
  listMasterPerkuliahan: listMasterPerkuliahanReducer,
  masterPerkuliahan: masterPerkuliahanReducer,
  listMasterJamPerkuliahan: listMasterJamPerkuliahanReducer,
  masterJamPerkuliahan: masterJamPerkuliahanReducer,
  listMastermataKuliah: listMastermataKuliahReducer,
  mastermataKuliah: mastermataKuliahReducer,
  listMasterJurusan: listMasterJurusanReducer,
  masterJurusan: masterJurusanReducer,
  listPerkuliahanBerjalan: listPerkuliahanBerjalanReducer,
  perkuliahanBerjalan: PerkuliahanBerjalanReducer,
  listPresensiDosen: listPresensiDosenReducer,
  presensiDosen: presensiDosenReducer,
  listPresensiMahasiswa: listPresensiMahasiswaReducer,
  presensiMahasiswa: presensiMahasiswaReducer
}

const combineReducers = reducer => {
  return (state = {}, action) => {
    const keys = Object.keys(reducer)
    const nextReducers = {}
    for (let i = 0; i < keys.length; i++) {
      const invoke = reducer[keys[i]](state[keys[i]], action)
      nextReducers[keys[i]] = invoke
    }
    return nextReducers
  }
}

export default combineReducers(reducers)
