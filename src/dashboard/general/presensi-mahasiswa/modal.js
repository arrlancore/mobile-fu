import React from 'react'
import { bool, func, object } from 'prop-types'
import { Modal, Button, message } from 'antd'
import { view, update, create } from 'context/user/action'
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

export default function ViewModal({ openModal, onClose, newEntry, onViewData, onUpdateSuccess }) {
  const [edit, setEdit] = React.useState(false)
  const [typeform, setTypeform] = React.useState('edit')
  const [inputData, setInputData] = React.useState({})
  const [isUpdated, setIsupdated] = React.useState(false)
  const [user, dispatch] = useStateValue('singleUser')
  const [errLoadingUser, loadingUser] = useStateDefault('USER')
  const [openModalVisible, setOpenModalVisible] = React.useState(openModal)
  // set new data

  const prevEntry = usePrevious(newEntry)
  const prevOpenModal = usePrevious(openModal)
  const prevLoadingUser = usePrevious(loadingUser)

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
    if (loadingUser === false && loadingUser !== prevLoadingUser && isUpdated && !errLoadingUser) {
      if (typeform !== 'create') {
        view(dispatch, { id: onViewData._id })
        onClose()
        setTypeform('edit')
        setEdit(false)
      } else {
        onModalClose()
      }
      if (user && user.message) {
        message.success(user.message)
      }
      setIsupdated(false)
      onUpdateSuccess()
    }
  }, [
    dispatch,
    errLoadingUser,
    isUpdated,
    loadingUser,
    newEntry,
    onClose,
    onModalClose,
    onUpdateSuccess,
    onViewData._id,
    openModal,
    prevEntry,
    prevLoadingUser,
    prevOpenModal,
    typeform,
    user
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
      update(dispatch, updatedData, { id: user.data._id })
    }
  }

  const userdata = onViewData.email || (user && user.data && user.data.email)
  const titles = userdata ? 'User ' + userdata : 'User'
  return (
    <Modal
      title={titles}
      visible={openModalVisible}
      onCancel={onModalClose}
      footer={[
        <Button loading={loadingUser} key="edit" onClick={handleButtonEdit}>
          {edit ? 'Save' : 'Edit'}
        </Button>,
        <Button key="close" type="primary" onClick={onModalClose}>
          Close
        </Button>
      ]}
    >
      {edit ? (
        <FormInput returnData={setInputData} type={typeform} payload={user ? user.data : {}} />
      ) : user && user.data && !loadingUser ? (
        <div className="view">
          {objectToArray(user.data)
            .filter(data => filterField(['deviceIds', 'roles', '__v', 'password'], data.fieldName))
            .map((data, i) => (
              <ViewInput key={i} fieldName={capitalize(data.fieldName)} value={data.value} />
            ))}
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
