import { REACT_NATIVE_API } from '@env';
import axios from 'axios';

let initialState = {
  medication_history: []
}

export const getAllMedHistory = (payload) => dispatch => {
  console.log('payload on history', payload);
  return axios.get(REACT_NATIVE_API + `/api/v2/medication-history/user_id/${payload.id}`, {
    headers: { 'Authorization': payload.token }
    })
    .then(response => {
      dispatch(getMed(response.data))
    })
    .catch(error => console.error('get all failed', error))
  }
  const getMed = payload => {
    return {
      type: 'GETALL',
      payload: payload
    }
  }
  
const medicationReducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case 'GETALL':
      return { medication_history: payload };

    default:
      return state;
  }
}

export default medicationReducer;
