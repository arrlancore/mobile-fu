import React from 'react'
import ReactDOM from 'react-dom'
import reducers from 'context/reducers'
import { Provider } from 'context'
import './index.css'
import App from './router'
import * as serviceWorker from './serviceWorker'
import Nprogress from 'nprogress'

Nprogress.configure({ showSpinner: false })

const Root = () => (
  <Provider reducer={reducers}>
    <App />
  </Provider>
)

ReactDOM.render(
  <Root />,
  document.getElementById('root')
)
serviceWorker.unregister()
