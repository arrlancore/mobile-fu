import React from 'react'
import { bool, func, object } from 'prop-types'
import { Modal, Button } from 'antd'
import { view, update, create } from 'context/general/action'
import { usePrevious, useStateValue, useStateDefault } from 'context'

import ViewInput from 'components/card/ViewInput'

import FormInput from './formInput'

const data = {
  nama: 'dwiki arlan',
  alamat: 'jakarta',
  noHp: '0864579000',
  color: 'blue'
}

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
  const [user, dispatch] = useStateValue('user')
  const [, loadingUser] = useStateDefault('USER')
  const [openModalVisible, setOpenModalVisible] = React.useState(openModal)
  // set new data
  const arrData = objectToArray(data)

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
    if (loadingUser === 'false' && loadingUser !== prevLoadingUser && isUpdated) {
      setOpenModalVisible(false)
      setIsupdated(false)
      onUpdateSuccess()
    }
  }, [
    dispatch,
    isUpdated,
    loadingUser,
    newEntry,
    onClose,
    onUpdateSuccess,
    onViewData._id,
    openModal,
    prevEntry,
    prevLoadingUser,
    prevOpenModal,
    user._id
  ])

  // actions

  const onModalClose = () => {
    setOpenModalVisible(false)
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

  const handleSave = () => (edit ? create(dispatch, inputData) : update(dispatch, inputData))

  return (
    <Modal
      title="User"
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
        <FormInput returnData={setInputData} type={typeform} payload={{}} />
      ) : user.data ? (
        <div className="view">
          <ViewInput
            fieldName="Name"
            value="Arlan"
            customRender={value => {
              return <span style={{ color: 'red' }}>{value}</span>
            }}
          />
          {arrData
            .filter(data => filterField(['nama', 'alamat'], data.fieldName))
            .map((data, i) => (
              <ViewInput key={i} fieldName={capitalize(data.fieldName)} value={data.value} />
            ))}
        </div>
      ) : (
        <div>loading...</div>
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
