import React from 'react'
import ReactDOM from 'react-dom'
import reducers from 'context/reducers'
import { Provider } from 'context'
import './index.css'
import App from 'dashboard/app'
import * as serviceWorker from './serviceWorker'


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
