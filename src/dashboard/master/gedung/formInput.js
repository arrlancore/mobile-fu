import React from 'react'
import { string, object, func } from 'prop-types'
import { usePrevious } from 'context'
import Input from 'components/input'
import Select from 'components/select'

export default function FormInput({ type, returnData, payload }) {
  const [firstName, setFirstName] = React.useState(payload ? payload.firstName : '')
  const [lastName, setLastName] = React.useState(payload ? payload.lastName : '')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState(undefined)
  const [role, setRole] = React.useState(payload ? payload.role : '')
  const [statuses, setStatuses] = React.useState(payload ? payload.status : '')

  const nextData = { firstName, lastName, password, email, role, status: statuses }
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
      state: [firstName, setFirstName],
      label: 'Nama Depan *',
      props: { type: 'text', required: true }
    },
    {
      Component: Input,
      typeInput: 'input',
      state: [lastName, setLastName],
      label: 'Nama Belakang',
      props: { type: 'text' }
    },
    {
      Component: Select,
      typeInput: 'select',
      state: [role, setRole],
      label: 'Role *',
      props: {
        defaultValue: role,
        showSearch: true,
        style: {
          width: '100%'
        },
        optionList: [
          {
            value: 'admin',
            name: 'Administrator'
          },
          {
            value: 'staf',
            name: 'Staf Perkuliahan'
          },
          {
            value: 'dosen',
            name: 'Dosen'
          },
          {
            value: 'mahasiswa',
            name: 'Mahasiswa'
          }
        ]
      }
    },
    {
      Component: Select,
      typeInput: 'select',
      state: [statuses, setStatuses],
      label: 'Status *',
      props: {
        defaultValue: statuses,
        showSearch: true,
        style: {
          width: '100%'
        },
        optionList: [
          {
            value: 'confirmed',
            name: 'Confirmed'
          },
          {
            value: 'pending',
            name: 'Pending'
          },
          {
            value: 'blocked',
            name: 'Blocked'
          }
        ]
      }
    }
  ]

  const createForm = [
    ...editForm.slice(0, 2),
    {
      Component: Input,
      typeInput: 'input',
      state: [email, setEmail],
      label: 'Email *',
      props: { type: 'email' }
    },
    {
      Component: Input,
      typeInput: 'input',
      state: [password, setPassword],
      label: 'Password *',
      props: { type: 'password' }
    },
    ...editForm.slice(-2)
  ]

  function clearForm() {
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
    setRole('')
    setStatuses('')
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
