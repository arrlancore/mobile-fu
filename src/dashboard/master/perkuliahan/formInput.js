import React from 'react'
import { string, object, func } from 'prop-types'
import { usePrevious, useStateValue } from 'context'
import Select from 'components/select'

export default function FormInput({ type, returnData, payload }) {
  const [tahunAjar, setTahunAjar] = React.useState(payload ? payload.tahunAjar : '')
  const [kelas, setKelas] = React.useState(payload ? payload.kelas : '')
  const [semester, setSemester] = React.useState(payload ? payload.semester : '')
  // const [semesterKe, setSemesterKe] = React.useState(payload ? payload.semesterKe : '')
  const [jurusanId, setJurusanId] = React.useState(payload && payload.jurusan ? payload.jurusan._id : '')

  const [listJurusan] = useStateValue('listMasterJurusan')
  const listDataJurusan = listJurusan ? listJurusan.data : []

  const nextData = { tahunAjar, kelas, semester, jurusan: jurusanId }
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
      state: [tahunAjar, setTahunAjar],
      label: 'Tahun Ajar *',
      props: {
        defaultValue: tahunAjar,
        showSearch: true,
        style: {
          width: '100%'
        },
        optionList: [
          {
            name: '2018/2019',
            value: '2018/2019'
          },
          {
            name: '2019/2020',
            value: '2019/2020'
          }
        ]
      }
    },
    {
      Component: Select,
      typeInput: 'select',
      state: [kelas, setKelas],
      label: 'Kelas *',
      props: {
        defaultValue: kelas,
        showSearch: true,
        style: {
          width: '100%'
        },
        optionList: [
          {
            name: 'A',
            value: 'A'
          },
          {
            name: 'B',
            value: 'B'
          },
          {
            name: 'C',
            value: 'C'
          }
        ]
      }
    },
    {
      Component: Select,
      typeInput: 'select',
      state: [semester, setSemester],
      label: 'Semester *',
      props: {
        defaultValue: semester,
        showSearch: true,
        style: {
          width: '100%'
        },
        optionList: [
          {
            name: 'Genap',
            value: 'genap'
          },
          {
            name: 'Ganjil',
            value: 'ganjil'
          }
        ]
      }
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
    setTahunAjar('')
    setSemester('')
    setKelas('')
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
