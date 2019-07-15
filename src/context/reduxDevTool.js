let id = 0
/**
 * the minimal devtool can be used for tracking the global states on the app.
 * need to completed todo
 * OPTIONAL FEATURES:
 * => tracking actions of reducers. TODO: need to provide action creators
 * => tracking the diff state when changes. TODO: need to return new state
 */
export default function withDevTools(initialState, actionCreators) {
  if (process.env.NODE_ENV === 'development') {
    const instanceID = id
    id += 1
    const name = `react-context: ${instanceID}`
    const isInstalled = window && window.__REDUX_DEVTOOLS_EXTENSION__
    const devTools = isInstalled ? window.__REDUX_DEVTOOLS_EXTENSION__.connect({ name, actionCreators }) : null
    devTools &&
      devTools.subscribe(message => {
        if (message.type === 'START') {
          devTools.init(initialState)
        }
        if (message.type === 'DISPATCH' && message.state) {
          console.log('DevTools requested to change the state to', message.state)
        }
      })
  }
}
