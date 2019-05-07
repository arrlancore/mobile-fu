import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../updateObject';

const initialState = {
  loading: false,
  formSuccess: false,
  data:[],
};

const storeDataMember = (state, action) =>
  updateObject(state, action.data);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DATA_MEMBER:
      return storeDataMember(state, action);

    default:
      return state;
  }
};

export default reducer;
