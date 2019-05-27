import React, {useContext, useState, useReducer, useEffect} from 'react'
import {node, func} from 'prop-types'
import Context from './Context'

export const Provider = ({ children, reducer }) => {
  const [ store, dispatch ] = useReducer(reducer)
  const [ state, setState ] = useState({ isLoaded: false })
  useEffect(() => {
    dispatch({ type: '@init' })
    setState({ isLoaded: true })
  }, [])
  return (
    <Context.Provider value={{ dispatch, store }}>
      {state.isLoaded ? children : false}
    </Context.Provider>
  )
}
Provider.propTypes = {
  children: node,
  reducer: func
}

/**
 * use context to get global state
 * @param {string} key optionally
 * if key provided it'll return only property required
 */
export const useStateValue = (key) => {
  const {store, dispatch} = useContext(Context)
  return key ? [ store[key] || {}, dispatch ] : [ store, dispatch ]
}

/**
 * use context to get error and loading state
 * @param {string} key is required
 */
export const useStateDefault = (key) => {
  const { store, dispatch } = useContext(Context)
  const { error, loading } = store
  return [
    error[key],
    loading[key],
    dispatch
  ]
}

