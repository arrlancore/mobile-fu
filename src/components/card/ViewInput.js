import React from 'react'
import { string, func } from 'prop-types'

const ViewInput = ({ fieldName, value, customRender, ...rest }) => {
  const ComponentValue = customRender ? customRender(value) : value
  return (
    <div style={{ marginBottom: 14 }} {...rest}>
      <small style={{ fontWeight: 'bold' }}>{fieldName}</small>
      <div>{ComponentValue}</div>
    </div>
  )
}
ViewInput.propTypes = {
  fieldName: string,
  value: string,
  customRender: func
}

export default ViewInput
