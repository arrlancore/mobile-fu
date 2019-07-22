import React from 'react'
import { string, object, func } from 'prop-types'
import { usePrevious } from 'context'
import Input from 'components/input'
import Select from 'components/select'

export default function FormInput({ type, returnData }) {
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState(undefined)
  const [role, setRole] = React.useState('')
  const [statuses, setStatuses] = React.useState('')

  const nextData = { firstName, lastName, password, email, role, status: statuses }
  const prevData = usePrevious(nextData)
  React.useEffect(() => {
    if (JSON.stringify(prevData) !== JSON.stringify(nextData)) {
      returnData(nextData)
    }
  }, [nextData, prevData, returnData])
  const editForm = [
    {
      Component: Input,
      type: 'input',
      state: [firstName, setFirstName],
      label: 'Nama Depan',
      props: { type: 'text' }
    },
    {
      Component: Input,
      type: 'input',
      state: [lastName, setLastName],
      label: 'Nama Belakang',
      props: { type: 'text' }
    },
    {
      Component: Select,
      type: 'select',
      state: [role, setRole],
      label: 'Role',
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
      type: 'select',
      state: [statuses, setStatuses],
      label: 'Status',
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
      type: 'input',
      state: [email, setEmail],
      label: 'Email',
      props: { type: 'email' }
    },
    {
      Component: Input,
      type: 'input',
      state: [password, setPassword],
      label: 'Password',
      props: { type: 'password' }
    },
    ...editForm.slice(-2)
  ]

  const form = type === 'create' ? createForm : editForm

  return (
    <div className={type}>
      {form.map((data, i) => (
        <div key={i}>
          <label>
            <small>{data.label}</small>
          </label>
          <data.Component
            {...data.props}
            onChange={e => {
              if (data.type === 'input') {
                data.state[1](e.target.value)
              }
              if (data.type === 'select') {
                data.state[1](e)
              }
            }}
            value={data.state[0]}
          />
        </div>
      ))}
    </div>
  )
}
FormInput.propTypes = {
  type: string,
  payload: object,
  returnData: func
}
