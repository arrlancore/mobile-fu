import React from 'react'
import { bool, func, object } from 'prop-types'
import { Modal, Button, message, Popconfirm } from 'antd'
import { view, update, create, remove } from 'context/master-gedung/action'
import { usePrevious, useStateValue, useStateDefault } from 'context'

import ViewInput from 'components/card/ViewInput'

import FormInput from './formInput'

const objectToArray = obj => {
  const keys = Object.keys(obj)
  return keys.map(key => ({ fieldName: key, value: obj[key] }))
}

const capitalize = (text = '') => {
  const result = text.replace(/([A-Z])/g, ' $1')
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1)
  return finalResult
}

const filterField = (fieldNames = [], currentField) => {
  return !fieldNames.includes(currentField)
}

const handleUserObject = (key, prop) => {
  let data = '' || prop
  if (prop[0] && (key === 'createdBy' || key === 'updatedBy')) {
    data = prop.map(data => data.fullName).toString()
  }
  return { fieldName: key, value: data }
}

export default function ViewModal({ openModal, onClose, newEntry, onViewData, onUpdateSuccess }) {
  const [edit, setEdit] = React.useState(false)
  const [typeform, setTypeform] = React.useState('edit')
  const [inputData, setInputData] = React.useState({})
  const [isUpdated, setIsupdated] = React.useState(false)
  const [gedung, dispatch] = useStateValue('masterGedung')
  const [errLoadingGedung, loadingGedung] = useStateDefault('GEDUNG')
  const [openModalVisible, setOpenModalVisible] = React.useState(openModal)
  // set new data

  const prevEntry = usePrevious(newEntry)
  const prevOpenModal = usePrevious(openModal)
  const prevLoadingGedung = usePrevious(loadingGedung)

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
    if (loadingGedung === false && loadingGedung !== prevLoadingGedung && isUpdated && !errLoadingGedung) {
      if (typeform !== 'create') {
        view(dispatch, { id: onViewData._id })
        onClose()
        setTypeform('edit')
        setEdit(false)
      } else {
        onModalClose()
      }
      if (gedung && gedung.message) {
        message.success(gedung.message)
      }
      setIsupdated(false)
      onUpdateSuccess()
    }
  }, [
    dispatch,
    errLoadingGedung,
    isUpdated,
    loadingGedung,
    newEntry,
    onClose,
    onModalClose,
    onUpdateSuccess,
    onViewData._id,
    openModal,
    prevEntry,
    prevLoadingGedung,
    prevOpenModal,
    typeform,
    gedung
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
      update(dispatch, updatedData, { id: gedung.data._id })
    }
  }

  const handleDelete = () => {
    remove(dispatch, { id: onViewData._id })
    onModalClose()
    onUpdateSuccess()
  }

  const gedungdata = onViewData.namaGedung || (gedung && gedung.data && gedung.data.namaGedung)
  const titles = gedungdata ? gedungdata : 'Gedung'
  const ConfirmDelete = () => (
    <Popconfirm title="Are you sure to delete?" onConfirm={handleDelete}>
      <Button style={{ color: 'tomato' }} loading={loadingGedung}>
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
        <Button type="primary" loading={loadingGedung} key="edit" onClick={handleButtonEdit}>
          {edit ? 'Save' : 'Edit'}
        </Button>
      ]}
    >
      {edit ? (
        <FormInput returnData={setInputData} type={typeform} payload={gedung ? gedung.data : {}} />
      ) : gedung && gedung.data && !loadingGedung ? (
        <div className="view">
          {objectToArray(gedung.data)
            .filter(data => filterField(['__v'], data.fieldName))
            .map((data, i) => {
              const newValue = handleUserObject(data.fieldName, data.value)
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
