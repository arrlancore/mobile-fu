import React from 'react'
import { string, object, func } from 'prop-types'
import { usePrevious } from 'context'
import Input from 'components/input'

export default function FormInput({ type, returnData, payload }) {
  const [fakultas, setFakultas] = React.useState(payload ? payload.fakultas : '')
  const [namaJurusan, setNamaJurusan] = React.useState(payload ? payload.namaJurusan : '')

  const nextData = { fakultas, namaJurusan }
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
      state: [namaJurusan, setNamaJurusan],
      label: 'Nama Jurusan *',
      props: { type: 'text', required: true }
    },
    {
      Component: Input,
      typeInput: 'input',
      state: [fakultas, setFakultas],
      label: 'Fakultas *',
      props: { type: 'text' }
    }
  ]

  const createForm = [...editForm]

  function clearForm() {
    setFakultas('')
    setNamaJurusan('')
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
