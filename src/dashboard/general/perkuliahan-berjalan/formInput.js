import React from 'react'
import { string, object, func } from 'prop-types'
import { usePrevious, useStateValue } from 'context'
import Select from 'components/select'
import ViewInput from 'components/card/ViewInput'

export default function FormInput({ type, returnData, payload }) {
  const [mahasiswaId, setMahasiswaId] = React.useState(payload && payload.peserta ? payload.peserta._id : '')
  const [matkulId, setMatkulId] = React.useState(payload && payload.mataKuliah ? payload.mataKuliah._id : '')

  const [listMahasiswa] = useStateValue('listUser')
  const listDataMahasiswa = listMahasiswa
    ? listMahasiswa.data.map(data => ({
        name: data.fullName,
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
    peserta: mahasiswaId,
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

  const editForm = [
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
      state: [mahasiswaId, setMahasiswaId],
      label: 'Mahasiswa *',
      props: {
        defaultValue: mahasiswaId,
        showSearch: true,
        style: {
          width: '100%'
        },
        optionList: listDataMahasiswa
      }
    }
  ]

  const createForm = [...editForm]

  function clearForm() {
    setMahasiswaId(null)
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
