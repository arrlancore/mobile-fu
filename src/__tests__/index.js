import React from 'react'
import { shallow } from 'enzyme'
import App from 'router'

describe('Call the main app', () => {
  it('renders without crashing', () => {
    shallow(<App />)
  })
})
