import React from 'react'
import moment from 'moment'
import { string, object, func } from 'prop-types'
import { usePrevious, useStateValue } from 'context'
import { DatePicker } from 'antd'
import Input from 'components/input'
import Select from 'components/select'
import ViewInput from 'components/card/ViewInput'

export default function FormInput({ type, returnData, payload }) {
  console.log('TCL: FormInput -> payload', payload)
  const [pertemuan, setPertemuan] = React.useState(payload ? payload.pertemuan : '')
  const [waktuMulai, setWaktuMulai] = React.useState(payload ? payload.waktuMulai : '')
  const [waktuSelesai, setWaktuSelesai] = React.useState(payload ? payload.waktuSelesai : '')
  const [tanggal, setTanggal] = React.useState(payload ? moment(payload.tanggal) : '')
  const [dosenId, setDosenId] = React.useState(payload && payload.dosen ? payload.dosen._id : '')
  const [kelasId, setKelasId] = React.useState(payload && payload.kelas ? payload.kelas._id : '')
  const [matkulId, setMatkulId] = React.useState(payload && payload.mataKuliah ? payload.mataKuliah._id : '')

  const [listDosen] = useStateValue('listUser')
  const listDataDosen = listDosen
    ? listDosen.data.map(data => ({
        name: data.fullName,
        value: data._id
      }))
    : []

  const [listKelas] = useStateValue('listMasterKelas')
  const listDataKelas = listKelas
    ? listKelas.data.map(data => ({
        name: data.namaKelas,
        value: data._id
      }))
    : []

  const [listMataKuliah] = useStateValue('listMastermataKuliah')
  const listDataMatkul = listMataKuliah
    ? listMataKuliah.data.map(data => ({
        name: `${data.namaMataKuliah} (${data.kodeMataKuliah})`,
        value: data._id
      }))
    : []

  const nextData = {
    pertemuan,
    waktuMulai,
    waktuSelesai,
    tanggal: tanggal ? tanggal.toISOString() : null,
    dosen: dosenId,
    kelas: kelasId,
    mataKuliah: matkulId,
    perkuliahan: (payload.perkuliahan && payload.perkuliahan['_id']) || payload.perkuliahan
  }
  console.log('TCL: FormInput -> nextData', nextData)
  const prevData = usePrevious(nextData)
  const prevType = usePrevious(type)
  React.useEffect(() => {
    if (JSON.stringify(prevData) !== JSON.stringify(nextData)) {
      returnData(nextData)
    }
    if (type === 'create' && prevType !== type) {
      clearForm()
    }
  }, [nextData, prevData, prevType, returnData, type])

  const formatTime = 'HH:mm'

  const setMulai = (str, mulai) => {
    const setter = mulai ? setWaktuMulai : setWaktuSelesai
    if (str.length <= 5) {
      setter(str)
    }
  }

  const editForm = [
    {
      Component: DatePicker,
      typeInput: 'date',
      state: [tanggal, setTanggal],
      label: 'Tanggal Pertemuan *',
      props: { defaultValue: waktuMulai }
    },
    {
      Component: Input,
      typeInput: 'input',
      state: [waktuMulai, v => setMulai(v, true)],
      label: 'Waktu Mulai *',
      props: { placeholder: formatTime }
    },
    {
      Component: Input,
      typeInput: 'input',
      state: [waktuSelesai, v => setMulai(v, false)],
      label: 'Waktu Selesai *',
      props: { placeholder: formatTime }
    },
    {
      Component: Input,
      typeInput: 'input',
      state: [pertemuan, setPertemuan],
      label: 'Pertemuan *',
      props: { type: 'number', max: 16 }
    },
    {
      Component: Select,
      typeInput: 'select',
      state: [matkulId, setMatkulId],
      label: 'Mata Kuliah *',
      props: {
        defaultValue: matkulId,
        showSearch: true,
        style: {
          width: '100%'
        },
        optionList: listDataMatkul
      }
    },
    {
      Component: Select,
      typeInput: 'select',
      state: [kelasId, setKelasId],
      label: 'Kelas *',
      props: {
        defaultValue: kelasId,
        showSearch: true,
        style: {
          width: '100%'
        },
        optionList: listDataKelas
      }
    },
    {
      Component: Select,
      typeInput: 'select',
      state: [dosenId, setDosenId],
      label: 'Dosen *',
      props: {
        defaultValue: dosenId,
        showSearch: true,
        style: {
          width: '100%'
        },
        optionList: listDataDosen
      }
    }
  ]

  const createForm = [...editForm]

  function clearForm() {
    setPertemuan(null)
    setWaktuMulai(null)
    setWaktuSelesai(null)
    setTanggal(null)
    setDosenId(null)
    setKelasId(null)
    setMatkulId(null)
  }

  const form = type === 'create' ? createForm : editForm

  return (
    <div className={type}>
      <form onChange={() => console.log(123)}>
        <ViewInput fieldName="Perkuliahan" value={payload.deskripsiPerkuliahan} />
        {form.map((data, i) => (
          <div key={i}>
            <label>
              <small>{data.label}</small>
            </label>
            <div>
              <data.Component
                {...data.props}
                onChange={(e, str) => {
                  if (data.typeInput === 'input') {
                    data.state[1](e.target.value)
                  }
                  if (data.typeInput === 'select' || data.typeInput === 'date') {
                    data.state[1](e)
                  }
                  if (data.typeInput === 'time') {
                    console.log(e, str)
                    data.state[1](str)
                  }
                }}
                value={data.state[0]}
              />
            </div>
          </div>
        ))}
      </form>
    </div>
  )
}
FormInput.propTypes = {
  type: string,
  payload: object,
  returnData: func
}
