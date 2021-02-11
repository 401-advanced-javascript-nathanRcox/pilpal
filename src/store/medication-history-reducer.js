import { REACT_NATIVE_API } from '@env';
import axios from 'axios';

let initialState = {
  medication_history: []
}

export const getAllMedHistory = (payload) => dispatch => {
  axios.defaults.headers.common = { 'Authorization': `bearer ${payload.token}` }

  console.log('payload on history', payload);
  return axios.get(REACT_NATIVE_API + `/api/v2/medication-history/user_id/${payload.id}`)
    .then(response => {
      dispatch(getMed(response.data))
      // console.log('Response.data:', response.data);
    })
    .catch(error => console.error('get all failed', error))
}

const getMed = payload => {
  return {
    type: 'GET-ALL',
    payload: payload
  }
}

export const addMedicationHistory = (newMedicationHistory, token) => dispatch => {
  axios.defaults.headers.common = { 'Authorization': `bearer ${token}` }
  console.log(newMedicationHistory, token);
  return axios.post(REACT_NATIVE_API + '/api/v2/medication-history',
    newMedicationHistory)
    .then((response) => {
      // console.log(response.data);
      dispatch(addMedHistory(response.data));
    });

}

const addMedHistory = (newMedicationHistory) => {
  return {
    type: 'ADD-MEDHISTORY',
    payload: newMedicationHistory
  }
}

const medicationReducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case 'GET-ALL':
      return { medication_history: payload };
    case 'ADD-MEDHISTORY':
      return { medication_history: [...state.medication_history, payload] }
    default:
      return state;
  }
}

export default medicationReducer;
