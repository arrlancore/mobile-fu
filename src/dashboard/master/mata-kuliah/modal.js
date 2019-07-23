import React from 'react'
import { bool, func, object } from 'prop-types'
import { Modal, Button, message, Popconfirm } from 'antd'
import { view, update, create, remove } from 'context/master-mata-kuliah/action'
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
    if (isObject && prop[0] && (key === 'createdBy' || key === 'updatedBy')) {
      data = prop.map(data => data.fullName).toString()
    }
    if (isObject && prop.namaJurusan) {
      data = prop.namaJurusan
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

export default function ViewModal({ openModal, onClose, newEntry, onViewData, onUpdateSuccess }) {
  const [edit, setEdit] = React.useState(false)
  const [typeform, setTypeform] = React.useState('edit')
  const [inputData, setInputData] = React.useState({})
  const [isUpdated, setIsupdated] = React.useState(false)
  const [mataKuliah, dispatch] = useStateValue('mastermataKuliah')
  const [errLoadingMataKuliah, loadingMataKuliah] = useStateDefault('MATA_KULIAH')
  const [openModalVisible, setOpenModalVisible] = React.useState(openModal)
  // set new data

  const prevEntry = usePrevious(newEntry)
  const prevOpenModal = usePrevious(openModal)
  const prevLoadingMataKuliah = usePrevious(loadingMataKuliah)

  React.useEffect(() => {
    if (newEntry && prevEntry !== newEntry) {
      setOpenModalVisible(true)
      setEdit(true)
      setTypeform('create')
    }
    if (openModal && prevOpenModal !== openModal) {
      setOpenModalVisible(true)
      view(dispatch, { id: onViewData._id || mataKuliah._id })
    }
    if (
      loadingMataKuliah === false &&
      loadingMataKuliah !== prevLoadingMataKuliah &&
      isUpdated &&
      !errLoadingMataKuliah
    ) {
      if (typeform !== 'create') {
        view(dispatch, { id: onViewData._id || mataKuliah._id })
        onClose()
        setTypeform('edit')
        setEdit(false)
      } else {
        onModalClose()
      }
      if (mataKuliah && mataKuliah.message) {
        message.success(mataKuliah.message)
      }
      setIsupdated(false)
      onUpdateSuccess()
    }
  }, [
    dispatch,
    errLoadingMataKuliah,
    isUpdated,
    loadingMataKuliah,
    newEntry,
    onClose,
    onModalClose,
    onUpdateSuccess,
    onViewData._id,
    openModal,
    prevEntry,
    prevLoadingMataKuliah,
    prevOpenModal,
    typeform,
    mataKuliah
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
      create(dispatch, inputData)
    } else {
      let updatedData = inputData
      delete updatedData.password
      delete updatedData.email
      update(dispatch, updatedData, { id: mataKuliah.data._id })
    }
  }
  const handleDelete = () => {
    remove(dispatch, { id: onViewData._id })
    onModalClose()
    setTimeout(() => {
      onUpdateSuccess()
    }, 200)
  }

  const mataKuliahdata = onViewData.namaMataKuliah || (mataKuliah && mataKuliah.data && mataKuliah.data.namaMataKuliah)
  const titles = mataKuliahdata && typeform === 'edit' ? 'Mata Kuliah ' + mataKuliahdata : 'Mata Kuliah'
  const ConfirmDelete = () => (
    <Popconfirm title="Are you sure to delete?" onConfirm={handleDelete}>
      <Button style={{ color: 'tomato' }} loading={loadingMataKuliah}>
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
        <Button type="primary" loading={loadingMataKuliah} key="edit" onClick={handleButtonEdit}>
          {edit ? 'Save' : 'Edit'}
        </Button>
      ]}
    >
      {edit ? (
        <FormInput returnData={setInputData} type={typeform} payload={mataKuliah ? mataKuliah.data : {}} />
      ) : mataKuliah && mataKuliah.data && !loadingMataKuliah ? (
        <div className="view">
          {objectToArray(mataKuliah.data)
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
  onUpdateSuccess: func
}
