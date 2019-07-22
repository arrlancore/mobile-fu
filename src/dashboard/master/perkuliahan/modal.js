import React from 'react'
import { bool, func, object } from 'prop-types'
import { Modal, Button, message, Popconfirm } from 'antd'
import { view, update, create, remove } from 'context/master-kelas/action'
import { usePrevious, useStateValue, useStateDefault } from 'context'

import ViewInput from 'components/card/ViewInput'

import FormInput from './formInput'

const objectToArray = obj => {
  const keys = Object.keys(obj)
  return keys.map(key => ({ fieldName: key, value: obj[key] }))
}

const handleObjectProp = (key, prop) => {
  let data = prop || ''
  if (prop && prop.length && prop[0] && (key === 'createdBy' || key === 'updatedBy')) {
    data = prop.map(data => data.fullName).toString()
  }
  if (prop && prop.namaGedung) {
    data = prop.namaGedung
  }
  return { fieldName: key, value: data }
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
  const [kelas, dispatch] = useStateValue('masterKelas')
  const [errLoadingKelas, loadingKelas] = useStateDefault('KELAS')
  const [openModalVisible, setOpenModalVisible] = React.useState(openModal)
  // set new data

  const prevEntry = usePrevious(newEntry)
  const prevOpenModal = usePrevious(openModal)
  const prevLoadingKelas = usePrevious(loadingKelas)

  React.useEffect(() => {
    if (newEntry && prevEntry !== newEntry) {
      setOpenModalVisible(true)
      setEdit(true)
      setTypeform('create')
    }
    if (openModal && prevOpenModal !== openModal) {
      setOpenModalVisible(true)
      view(dispatch, { id: onViewData._id })
    }
    if (loadingKelas === false && loadingKelas !== prevLoadingKelas && isUpdated && !errLoadingKelas) {
      if (typeform !== 'create') {
        view(dispatch, { id: onViewData._id })
        onClose()
        setTypeform('edit')
        setEdit(false)
      } else {
        onModalClose()
      }
      if (kelas && kelas.message) {
        message.success(kelas.message)
      }
      setIsupdated(false)
      onUpdateSuccess()
    }
  }, [
    dispatch,
    errLoadingKelas,
    isUpdated,
    loadingKelas,
    newEntry,
    onClose,
    onModalClose,
    onUpdateSuccess,
    onViewData._id,
    openModal,
    prevEntry,
    prevLoadingKelas,
    prevOpenModal,
    typeform,
    kelas
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
      update(dispatch, updatedData, { id: kelas.data._id })
    }
  }
  const handleDelete = () => {
    remove(dispatch, { id: onViewData._id })
    onModalClose()
    setTimeout(() => {
      onUpdateSuccess()
    }, 200)
  }

  const kelasdata = onViewData.namaKelas || (kelas && kelas.data && kelas.data.namaKelas)
  const titles = kelasdata && typeform === 'edit' ? 'Kelas ' + kelasdata : 'Kelas'
  const ConfirmDelete = () => (
    <Popconfirm title="Are you sure to delete?" onConfirm={handleDelete}>
      <Button style={{ color: 'tomato' }} loading={loadingKelas}>
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
        <Button type="primary" loading={loadingKelas} key="edit" onClick={handleButtonEdit}>
          {edit ? 'Save' : 'Edit'}
        </Button>
      ]}
    >
      {edit ? (
        <FormInput returnData={setInputData} type={typeform} payload={kelas ? kelas.data : {}} />
      ) : kelas && kelas.data && !loadingKelas ? (
        <div className="view">
          {objectToArray(kelas.data)
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
