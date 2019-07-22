import React from 'react'
import { string, object, func } from 'prop-types'
import { usePrevious } from 'context'
import Input from 'components/input'

export default function FormInput({ type, returnData, payload }) {
  const [namaGedung, setNamaGedung] = React.useState(payload ? payload.namaGedung : '')
  const [deskripsi, setDeskripsi] = React.useState(payload ? payload.deskripsi : '')

  const nextData = { namaGedung, deskripsi }
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
      state: [namaGedung, setNamaGedung],
      label: 'Nama Gedung *',
      props: { type: 'text', required: true }
    },
    {
      Component: Input,
      typeInput: 'input',
      state: [deskripsi, setDeskripsi],
      label: 'Deskripsi',
      props: { type: 'text' }
    }
  ]

  const createForm = [...editForm]

  function clearForm() {
    setNamaGedung('')
    setDeskripsi('')
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
