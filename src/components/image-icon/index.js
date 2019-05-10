import React from 'react'
import { string, func } from 'prop-types'

import './style.css'

const imageicon = props => {
  const defaultStyle = {
    width: 24,
    margin: 12
  }
  return (
    <span
      className="image-wrapper"
      id={'icon-' + props.alt}
      onClick={props.onClick}
    >
      <img {...props} alt={props.alt} style={props.style || defaultStyle} />
    </span>
  )
}

imageicon.propTypes = {
  style: string,
  alt: string,
  onClick: func
}

export default imageicon
