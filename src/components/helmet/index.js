import React from 'react'
import { Helmet } from 'react-helmet'
import { node } from 'prop-types'

function Head({ children }) {
  return <Helmet> {children} </Helmet>
}
Head.propTypes = {
  children: node
}

export default Head
