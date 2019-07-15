import React from 'react'
import { Tooltip } from 'antd'
import './style.css'

function EnvInformation() {
  const [floatTo, setFloatTo] = React.useState('float-left')
  const info = 'kpi-frontend is running on development mode'
  const changeFloat = () => {
    const floats = ['float-left', 'float-right']
    if (floatTo === floats[0]) {
      setFloatTo(floats[1])
    } else {
      setFloatTo(floats[0])
    }
  }
  return (
    <Tooltip placement="right" title={info}>
      <span onClick={changeFloat} className={`float-env-info ${floatTo}`}>
        DEV
      </span>
    </Tooltip>
  )
}

export default EnvInformation
