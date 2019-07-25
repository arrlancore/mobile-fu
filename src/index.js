import React from 'react'
import ReactDOM from 'react-dom'
import reducers from 'context/reducers'
import { Provider as ContextProvider } from 'context'
import './index.css'
import App from './router'
import * as serviceWorker from './serviceWorker'
import Nprogress from 'nprogress'
import './i18n'

Nprogress.configure({ showSpinner: false })
const dev = process.env.NODE_ENV === 'development'
const sw = () => (dev ? serviceWorker.unregister() : serviceWorker.register())
const Root = () => (
  <ContextProvider reducer={reducers}>
    <App />
  </ContextProvider>
)

ReactDOM.render(<Root />, document.getElementById('root'))

// Learn more about service workers: http://bit.ly/CRA-PWA
sw()
