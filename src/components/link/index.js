import React from 'react'
import { Link } from 'react-router-dom'
import { node } from 'prop-types'

const link = ({children, ...rest }) => <Link {...rest}>{children}</Link>

link.propTypes = {
  children: node
}
export default link
