import React from 'react'
import { string, object, func } from 'prop-types'
import { usePrevious, useStateValue } from 'context'
import Input from 'components/input'
import Select from 'components/select'

export default function FormInput({ type, returnData, payload }) {
  const [namaKelas, setNamaKelas] = React.useState(payload ? payload.namaKelas : '')
  const [deskripsi, setDeskripsi] = React.useState(payload ? payload.deskripsi : '')
  const [gedung, setGedung] = React.useState(payload && payload.gedung ? payload.gedung.namaGedung : '')
  const [idGedung, setIdGedung] = React.useState(payload && payload.gedung ? payload.gedung._id : '')

  const [listGedung] = useStateValue('listMasterGedung')

  const nextData = { namaKelas, deskripsi, gedung: idGedung }
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
      state: [namaKelas, setNamaKelas],
      label: 'Nama Kelas *',
      props: { type: 'text', required: true }
    },
    {
      Component: Input,
      typeInput: 'input',
      state: [deskripsi, setDeskripsi],
      label: 'Deskripsi',
      props: { type: 'text' }
    },
    {
      Component: Select,
      typeInput: 'select',
      state: [idGedung, setIdGedung],
      label: 'Gedung *',
      props: {
        defaultValue: gedung || '',
        showSearch: true,
        style: {
          width: '100%'
        },
        optionList:
          listGedung &&
          listGedung.data.map(data => {
            return {
              name: data.namaGedung,
              value: data._id
            }
          })
      }
    }
  ]

  const createForm = [...editForm]

  function clearForm() {
    setDeskripsi('')
    setNamaKelas('')
    setGedung('')
    setIdGedung('')
  }

  const form = type === 'create' ? createForm : editForm

  return (
    <div className={type}>
      <form>
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
