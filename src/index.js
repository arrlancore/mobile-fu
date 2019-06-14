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

const Root = () => (
  <ContextProvider reducer={reducers}>
    <App />
  </ContextProvider>
)

ReactDOM.render(
  <Root />,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()

