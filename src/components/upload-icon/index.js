import React from 'react'
import CloudIcon from 'assets/icon/cloud.svg'
import ArrowIcon from 'assets/icon/arrow.svg'
import './style.css'

function UploadIcon() {
  return (
    <div className="upload-icon">
      <img className="icon-cloud" src={CloudIcon} alt="icon-cloud" />
      <img className="icon-arrow" src={ArrowIcon} alt="icon-arrow" />
    </div>
  )
}

export default UploadIcon
