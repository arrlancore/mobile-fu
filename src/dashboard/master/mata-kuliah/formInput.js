import React from 'react'
import { string, object, func } from 'prop-types'
import { usePrevious, useStateValue } from 'context'
import Input from 'components/input'
import Select from 'components/select'

export default function FormInput({ type, returnData, payload }) {
  const [namaMataKuliah, setNamaMataKuliah] = React.useState(payload ? payload.namaMataKuliah : '')
  const [kodeMataKuliah, setKodeMataKuliah] = React.useState(payload ? payload.kodeMataKuliah : '')
  const [jumlahSks, setJumlahSks] = React.useState(payload ? payload.jumlahSks : '')
  const [jurusanId, setJurusanId] = React.useState(payload && payload.jurusan ? payload.jurusan._id : '')

  const [listJurusan] = useStateValue('listMasterJurusan')
  const listDataJurusan = listJurusan ? listJurusan.data : []

  const nextData = { namaMataKuliah, kodeMataKuliah, jumlahSks, jurusan: jurusanId }
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
      Component: Input,
      typeInput: 'input',
      state: [namaMataKuliah, setNamaMataKuliah],
      label: 'Nama Mata Kuliah *',
      props: { type: 'text', required: true }
    },
    {
      Component: Input,
      typeInput: 'input',
      state: [kodeMataKuliah, setKodeMataKuliah],
      label: 'Kode Mata Kuliah *',
      props: { type: 'text' }
    },
    {
      Component: Input,
      typeInput: 'input',
      state: [jumlahSks, setJumlahSks],
      label: 'Jumlah SKS *',
      props: { type: 'number' }
    },
    {
      Component: Select,
      typeInput: 'select',
      state: [jurusanId, setJurusanId],
      label: 'Jurusan *',
      props: {
        defaultValue: jurusanId,
        showSearch: true,
        style: {
          width: '100%'
        },
        optionList: listDataJurusan.map(data => {
          return {
            name: data.namaJurusan,
            value: data._id
          }
        })
      }
    }
  ]

  const createForm = [...editForm]

  function clearForm() {
    setNamaMataKuliah('')
    setKodeMataKuliah('')
    setJumlahSks('')
    setJurusanId('')
  }

  const form = type === 'create' ? createForm : editForm

  return (
    <div className={type}>
      <form onChange={() => console.log(123)}>
        {form.map((data, i) => (
          <div key={i}>
            <label>
              <small>{data.label}</small>
            </label>
            <data.Component
              {...data.props}
              onChange={e => {
                if (data.typeInput === 'input') {
                  data.state[1](e.target.value)
                }
                if (data.typeInput === 'select') {
                  data.state[1](e)
                }
              }}
              value={data.state[0]}
            />
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
