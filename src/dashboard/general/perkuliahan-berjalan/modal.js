import React from 'react'
import { bool, func, object } from 'prop-types'
import { Modal, Button, message, Popconfirm } from 'antd'
import { view, update, create, remove } from 'context/perkuliahan-berjalan/action'
import { usePrevious, useStateValue, useStateDefault } from 'context'

import ViewInput from 'components/card/ViewInput'

import FormInput from './formInput'

const objectToArray = obj => {
  const keys = Object.keys(obj)
  return keys.map(key => ({ fieldName: key, value: obj[key] }))
}

const handleObjectProp = (key, prop) => {
  try {
    let data = prop
    const isObject = typeof prop === 'object' && Object.keys(prop || []).length
    if (isObject) {
      if (prop[0] && (key === 'createdBy' || key === 'updatedBy')) {
        data = prop.map(data => data.fullName).toString()
      }
      if (key === 'peserta' && prop.fullName) {
        data = prop.fullName
      }
      if (prop.jurusan && prop.jurusan.namaJurusan) {
        data = prop.jurusan.namaJurusan
      }
      if (prop.namaMataKuliah) {
        data = prop.namaMataKuliah
      }
      if (prop.deskripsiPerkuliahan) {
        data = prop.deskripsiPerkuliahan
      }
    }
    // data = typeof data === 'string' || typeof data === 'number' ? data : ''
    const value = { fieldName: key, value: data }
    return value
  } catch (error) {
    console.log(error)
  }
}

const capitalize = (text = '') => {
  const result = text.replace(/([A-Z])/g, ' $1')
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1)
  return finalResult
}

const filterField = (fieldNames = [], currentField) => {
  return !fieldNames.includes(currentField)
}

export default function ViewModal({ query, openModal, onClose, newEntry, onViewData, onUpdateSuccess }) {
  const [edit, setEdit] = React.useState(false)
  const [typeform, setTypeform] = React.useState('edit')
  const [inputData, setInputData] = React.useState({})
  const [isUpdated, setIsupdated] = React.useState(false)
  const [perkuliahanBerjalan, dispatch] = useStateValue('perkuliahanBerjalan')
  const [errLoadingPerkuliahanBerjalan, loadingPerkuliahanBerjalan] = useStateDefault('PERKULIAHAN_BERJALAN')
  const [openModalVisible, setOpenModalVisible] = React.useState(openModal)
  // set new data

  const prevEntry = usePrevious(newEntry)
  const prevOpenModal = usePrevious(openModal)
  const prevLoadingPerkuliahanBerjalan = usePrevious(loadingPerkuliahanBerjalan)

  React.useEffect(() => {
    if (newEntry && prevEntry !== newEntry) {
      setOpenModalVisible(true)
      setEdit(true)
      setTypeform('create')
    }
    if (openModal && prevOpenModal !== openModal) {
      setOpenModalVisible(true)
      view(dispatch, { id: onViewData._id || perkuliahanBerjalan._id })
    }
    if (
      loadingPerkuliahanBerjalan === false &&
      loadingPerkuliahanBerjalan !== prevLoadingPerkuliahanBerjalan &&
      isUpdated &&
      !errLoadingPerkuliahanBerjalan
    ) {
      if (typeform !== 'create') {
        view(dispatch, { id: onViewData._id || perkuliahanBerjalan._id })
        onClose()
        setTypeform('edit')
        setEdit(false)
      } else {
        onModalClose()
      }
      if (perkuliahanBerjalan && perkuliahanBerjalan.message) {
        message.success(perkuliahanBerjalan.message)
      }
      setIsupdated(false)
      onUpdateSuccess()
    }
  }, [
    dispatch,
    errLoadingPerkuliahanBerjalan,
    isUpdated,
    loadingPerkuliahanBerjalan,
    newEntry,
    onClose,
    onModalClose,
    onUpdateSuccess,
    onViewData._id,
    openModal,
    prevEntry,
    prevLoadingPerkuliahanBerjalan,
    prevOpenModal,
    typeform,
    perkuliahanBerjalan
  ])

  // actions

  async function onModalClose (view) {  // eslint-disable-line
    await setOpenModalVisible(false)
    onClose()
    setTypeform('edit')
    setEdit(false)
  }
  const handleButtonEdit = () => {
    setIsupdated(true)
    if (edit) {
      handleSave()
    } else {
      setEdit(true)
    }
  }

  const handleSave = () => {
    if (typeform === 'create') {
      create(dispatch, { ...inputData })
    } else {
      let updatedData = { ...inputData }
      update(dispatch, updatedData, { id: perkuliahanBerjalan.data._id })
    }
  }
  const handleDelete = () => {
    remove(dispatch, { id: onViewData._id })
    onModalClose()
    setTimeout(() => {
      onUpdateSuccess()
    }, 200)
  }

  const perkuliahanBerjalanData =
    onViewData._id || (perkuliahanBerjalan && perkuliahanBerjalan.data && perkuliahanBerjalan.data._id)
  const titles =
    perkuliahanBerjalanData && typeform === 'edit'
      ? 'Perkuliahan Berjalan ' + perkuliahanBerjalanData
      : 'Tambah Perkuliahan'
  let payloadData = perkuliahanBerjalan ? { ...query, ...perkuliahanBerjalan.data } : query
  const ConfirmDelete = () => (
    <Popconfirm title="Are you sure to delete?" onConfirm={handleDelete}>
      <Button style={{ color: 'tomato' }} loading={loadingPerkuliahanBerjalan}>
        Delete
      </Button>
    </Popconfirm>
  )
  return (
    <Modal
      title={titles}
      visible={openModalVisible}
      onCancel={onModalClose}
      footer={[
        <ConfirmDelete key="delete" />,
        <Button type="primary" loading={loadingPerkuliahanBerjalan} key="edit" onClick={handleButtonEdit}>
          {edit ? 'Save' : 'Edit'}
        </Button>
      ]}
    >
      {edit ? (
        <FormInput returnData={setInputData} type={typeform} payload={payloadData} />
      ) : perkuliahanBerjalan && perkuliahanBerjalan.data && !loadingPerkuliahanBerjalan ? (
        <div className="view">
          {objectToArray(perkuliahanBerjalan.data)
            .filter(data => filterField(['__v'], data.fieldName))
            .map((data, i) => {
              const newValue = handleObjectProp(data.fieldName, data.value)
              return <ViewInput key={i} fieldName={capitalize(newValue.fieldName)} value={newValue.value} />
            })}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </Modal>
  )
}
ViewModal.propTypes = {
  openModal: bool,
  onClose: func,
  newEntry: bool,
  onViewData: object,
  query: object,
  onUpdateSuccess: func
}
