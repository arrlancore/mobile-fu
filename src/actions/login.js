import axios from "axios";
import { message } from "antd";
import * as actionTypes from "./actionTypes";

import constant from "../utils/constant";

/**
 */
export const loginMember = data => dispatch => {
  // Start
  const dataStart = {
    loading: true,
  };
  dispatch(storeDataMember(dataStart));
  const URL = constant.MASTER_PATH + constant.URL_LOGIN;
  axios
    .post(URL, data)
    .then(response => {
      if (response.status === 200) {
        const dataSuccess = {
          loading: false,
          formSuccess: true,
          data: response.data
        };
        dispatch(storeDataMember(dataSuccess));
      } else {
        const dataError = {
          loading: false,
          formError: true
        };
        dispatch(storeDataMember(dataError));
      }
    })
    .catch(error => {
      const dataError = {
        loading: false,
        formError: true
      };
      dispatch(storeDataMember(dataError));
    });
};

export const storeDataMember = data => ({
  type: actionTypes.DATA_MEMBER,
  data
});
