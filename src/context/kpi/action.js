import axios from 'axios'
import config from 'config'
import { saveAs } from 'file-saver'
import getUser from 'utils/userData'
import dispatchAction from 'utils/dispatcher'
import { message } from 'antd'

// action type strings should be unique across reducers so namespace them with the reducer name
export const actionTypes = {
  UPLOAD_PROGRESS: 'UPLOAD_PROGRESS',
  PROCESS_FILE_SUCCESS: 'PROCESS_FILE_SUCCESS',
  PROCESS_FILE: 'PROCESS_FILE',
  LIST_GROUP_SUCCESS: 'LIST_GROUP_SUCCESS',
  LIST_GROUP: 'LIST_GROUP',
  LIST_DOC_SUCCESS: 'LIST_DOC_SUCCESS',
  LIST_DOC: 'LIST_DOC',
  CALCULATE_KPI:'CALCULATE_KPI',
  CALCULATE_KPI_SUCCESS:'CALCULATE_KPI_SUCCESS',
  GET_KPI_SUMMARY:'GET_KPI_SUMMARY',
  GET_KPI_SUMMARY_SUCCESS:'GET_KPI_SUMMARY_SUCCESS',
  GET_CALCULATION_STATUS:'GET_CALCULATION_STATUS',
  GET_CALCULATION_STATUS_SUCCESS:'GET_CALCULATION_STATUS_SUCCESS',
  GET_ITEMS:'GET_ITEMS',
  GET_ITEMS_SUCCESS:'GET_ITEMS_SUCCESS',
  GET_REPORT:'GET_REPORT',
  GET_REPORT_SUCCESS:'GET_REPORT_SUCCESS',
  EXPORT_REPORT:'EXPORT_REPORT',
  EXPORT_REPORT_SUCCESS:'EXPORT_REPORT_SUCCESS',
  LIST_TEAM:'LIST_TEAM',
  LIST_TEAM_SUCCESS:'LIST_TEAM_SUCCESS',
  LIST_GROUP_TEAM:'LIST_GROUP_TEAM',
  LIST_GROUP_TEAM_SUCCESS:'LIST_GROUP_TEAM_SUCCESS'
}

// actions are where most of the business logic takes place
// they are dispatched by views or by other actions
/**
 *
 * @param {function} dispatch
 * @param {object} payload
 */
export const actionProcessFile = async (dispatch, payload) => {
  const user = getUser()
  const url = config.baseUrl + payload.get('url')
  const action = async () => {
    const response = await axios.post(url, payload, {
      timeout: 20000,
      headers: { 'Authorization' : user.token },
      onUploadProgress : function(progressEvent) {
        const percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total )
        dispatch({
          type: actionTypes.UPLOAD_PROGRESS,
          progress: { percentCompleted, doc: payload.get('docId') }
        })
      }
    })
    if (response.data.status === 200 && response.status <= 201) {
      let { data } = response.data
      dispatch({
        type: actionTypes.PROCESS_FILE_SUCCESS,
        data
      })
      message.success(`File "${payload.get('filename')}" has been successfully uploaded`)
    } else {
      const message = response.data && response.data.message
      throw new Error(message || 'An error has been occured')
    }
  }
  await dispatchAction(dispatch, actionTypes.PROCESS_FILE, action )
}


/**
 *
 * @param {function} dispatch
 * @param {object} payload
 */
export const actionGetListGroup = (dispatch, params) => {
  const url = config.baseUrl + '/falcon/group/employee'
  const action = async () => {
    const response = await axios.get(url, {
      params,
      timeout: 20000,
      headers: { 'Authorization' : getUser().token }
    })
    if (response.status <= 201) {
      let data = response.data
      dispatch({
        type: actionTypes.LIST_GROUP_SUCCESS,
        data
      })
    } else {
      const message = response.data && response.data.message
      throw new Error(message || 'An error has been occured')
    }
  }
  dispatchAction(dispatch, actionTypes.LIST_GROUP, action )
}

/**
 *
 * @param {function} dispatch
 * @param {object} payload
 */
export const actionGetListDocs = (dispatch) => {
  const url = config.baseUrl + '/googledocs/doc'
  const action = async () => {
    const response = await axios.get(url, {
      timeout: 20000,
      headers: { 'Authorization' : getUser().token }
    })
    if (response.status <= 201) {
      let data = response.data
      dispatch({
        type: actionTypes.LIST_DOC_SUCCESS,
        data
      })
    } else {
      const message = response.data && response.data.message
      throw new Error(message || 'An error has been occured')
    }
  }
  dispatchAction(dispatch, actionTypes.LIST_DOC, action )
}


/**
 *
 * @param {function} dispatch
 * @param {object} params
 */
export const actionCalculate = (dispatch, params) => {
  const url = config.baseUrl + '/googledocs/monthly/calculation'
  const action = async () => {
    const response = await axios.get(url, {
      params,
      timeout: 20000,
      headers: { 'Authorization' : getUser().token }
    })
    if (response.status <= 201) {
      let data = response.data
      dispatch({
        type: actionTypes.CALCULATE_KPI_SUCCESS,
        data
      })
    } else {
      const message = response.data && response.data.message
      throw new Error(message || 'An error has been occured')
    }
  }
  dispatchAction(dispatch, actionTypes.CALCULATE_KPI, action )
}


/**
 *
 * @param {function} dispatch
 * @param {object} params
 */
export const actionGetSummary = (dispatch, params) => {
  console.log('summary')

  const url = config.baseUrl + '/googledocs/summary/status'
  const action = async () => {
    const response = await axios.get(url, {
      params,
      timeout: 20000,
      headers: { 'Authorization' : getUser().token }
    })
    if (response.status <= 201) {
      let data = response.data
      dispatch({
        type: actionTypes.GET_KPI_SUMMARY_SUCCESS,
        data
      })
    } else {
      const message = response.data && response.data.message
      throw new Error(message || 'An error has been occured')
    }
  }
  dispatchAction(dispatch, actionTypes.GET_KPI_SUMMARY, action )
}

/**
 *
 * @param {function} dispatch
 * @param {object} params
 */
export const actionCalculationStatus = (dispatch, params) => {
  const url = config.baseUrl + '/googledocs/summary/status/calculation'
  const action = async () => {
    const response = await axios.get(url, {
      params,
      timeout: 20000,
      headers: { 'Authorization' : getUser().token }
    })
    if (response.status <= 201) {
      let data = response.data
      dispatch({
        type: actionTypes.GET_CALCULATION_STATUS_SUCCESS,
        data
      })
    } else {
      const message = response.data && response.data.message
      throw new Error(message || 'An error has been occured')
    }
  }
  dispatchAction(dispatch, actionTypes.GET_CALCULATION_STATUS, action )
}


/**
 *
 * @param {function} dispatch
 * @param {object} params
 */
export const actionGetItems = (dispatch, params) => {
  const url = config.baseUrl + '/googledocs/kpi/item'
  const action = async () => {
    const response = await axios.get(url, {
      params,
      timeout: 20000,
      headers: { 'Authorization' : getUser().token }
    })
    if (response.status <= 201) {
      let data = response.data
      dispatch({
        type: actionTypes.GET_ITEMS_SUCCESS,
        data
      })
    } else {
      const message = response.data && response.data.message
      throw new Error(message || 'An error has been occured')
    }
  }
  dispatchAction(dispatch, actionTypes.GET_ITEMS, action )
}

/**
 *
 * @param {function} dispatch
 * @param {object} params
 */
export const actionGetReport = (dispatch, params) => {
  const url = config.baseUrl + '/googledocs/report'
  const action = async () => {
    const response = await axios.get(url, {
      params,
      timeout: 20000,
      headers: { 'Authorization' : getUser().token }
    })
    if (response.status <= 201) {
      let data = response.data
      dispatch({
        type: actionTypes.GET_REPORT_SUCCESS,
        data
      })
    } else {
      const message = response.data && response.data.message
      throw new Error(message || 'An error has been occured')
    }
  }
  dispatchAction(dispatch, actionTypes.GET_REPORT, action )
}

/**
 *
 * @param {function} dispatch
 * @param {object} params
 */
export const actionExportReport = (dispatch, params) => {
  const url = config.baseUrl + '/googledocs/report/export'
  const action = async () => {
    const response = await axios.get(url, {
      responseType: 'blob',
      params,
      timeout: 20000,
      headers: { 'Authorization' : getUser().token }
    })
    if (response.status <= 201) {
      let filename = `Report__${params.year + '__' +params.quarter}.xlsx`
      saveAs(response.data, filename)
      dispatch({
        type: actionTypes.EXPORT_REPORT_SUCCESS,
        data: { message: 'File excel has been exported' }
      })
    } else {
      const message = response.data && response.data.message
      throw new Error(message || 'An error has been occured')
    }
  }
  dispatchAction(dispatch, actionTypes.EXPORT_REPORT, action )
}

/**
 *
 * @param {function} dispatch
 * @param {object} params
 */
export const actionListTeam = (dispatch, params) => {
  const url = config.baseUrl + '/falcon/team'
  const action = async () => {
    const response = await axios.get(url, {
      params,
      timeout: 20000,
      headers: { 'Authorization' : getUser().token }
    })
    if (response.status <= 201) {
      let data = response.data
      dispatch({
        type: actionTypes.LIST_TEAM_SUCCESS,
        data
      })
    } else {
      const message = response.data && response.data.message
      throw new Error(message || 'An error has been occured')
    }
  }
  dispatchAction(dispatch, actionTypes.LIST_TEAM, action )
}

/**
 *
 * @param {function} dispatch
 * @param {object} params
 */
export const actionListGroupByTeam = (dispatch, params) => {
  const url = config.baseUrl + '/falcon/team-group'
  const action = async () => {
    const response = await axios.get(url, {
      params,
      timeout: 20000,
      headers: { 'Authorization' : getUser().token }
    })
    if (response.status <= 201) {
      let data = response.data
      dispatch({
        type: actionTypes.LIST_GROUP_TEAM_SUCCESS,
        data
      })
    } else {
      const message = response.data && response.data.message
      throw new Error(message || 'An error has been occured')
    }
  }
  dispatchAction(dispatch, actionTypes.LIST_GROUP_TEAM, action )
}
