import React from 'react'
import { string, object, func } from 'prop-types'
import { usePrevious, useStateValue } from 'context'
import Select from 'components/select'
import { message } from 'antd'

export default function FormInput({ type, returnData, payload }) {
  const [location, setLocation] = React.useState({})
  const [dosenId, setDosenId] = React.useState(payload && payload.dosen ? payload.dosen._id : '')
  const [jadwalId, setJadwalId] = React.useState(payload && payload.jadwal ? payload.jadwal._id : '')

  const [listJadwal] = useStateValue('listJadwal')
  const listDataJadwal = listJadwal ? listJadwal.data : []

  const [listUser] = useStateValue('listUser')
  const listDataDosen = listUser ? listUser.data : []

  const nextData = { dosen: dosenId, jadwal: jadwalId }
  const prevData = usePrevious(nextData)
  const prevType = usePrevious(type)
  const prevLocation = usePrevious(location)
  function getLocation() {
    const showPosition = position => {
      setLocation({
        longitude: position.coords.latitude,
        latitude: position.coords.latitude
      })
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition)
    } else {
      message.error('Your browser is not supported to detect the location')
    }
  }

  React.useEffect(() => {
    if (!location && location !== prevLocation) {
      getLocation()
    }
    if (JSON.stringify(prevData) !== JSON.stringify(nextData)) {
      returnData(nextData)
    }
    if (type === 'create' && prevType !== type) {
      clearForm()
    }
  }, [location, nextData, prevData, prevLocation, prevType, returnData, type])
  const editForm = [
    {
      Component: Select,
      typeInput: 'select',
      state: [jadwalId, setJadwalId],
      label: 'Jadwal *',
      props: {
        defaultValue: jadwalId,
        showSearch: true,
        style: {
          width: '100%'
        },
        optionList: listDataJadwal.map(data => {
          const name =
            data &&
            `${data.mataKuliah && data.mataKuliah.namaMataKuliah + '-' + data.mataKuliah.kodeMataKuliah} (${new Date(
              data.tanggal
            ).toLocaleDateString()}) Pertemuan:${data.pertemuan}`
          return {
            name,
            value: data._id
          }
        })
      }
    },
    {
      Component: Select,
      typeInput: 'select',
      state: [dosenId, setDosenId],
      label: 'Nama Dosen *',
      props: {
        defaultValue: dosenId,
        showSearch: true,
        style: {
          width: '100%'
        },
        optionList: listDataDosen.map(data => {
          return {
            name: data.fullName,
            value: data._id
          }
        })
      }
    }
  ]

  const createForm = [...editForm]

  function clearForm() {
    setDosenId('')
    setJadwalId('')
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
