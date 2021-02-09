
import { REACT_NATIVE_API } from '@env';
import axios from 'axios';
//category reducer
let initialState = {
  medication_history: []
}

export const getAllMedHistory = (payload) => dispatch => {
  console.log('payload on history', payload.token);
  return axios.get(REACT_NATIVE_API + '/api/v2/medication-history', {
    headers: { 'Authorization': payload }
    })
    .then(response => {
      dispatch(addMedicationHistory(response.data))
    })
    .catch(error => console.error('get all failed', error))
  }
export const addMedicationHistory = (newMedicationHistory) => {
  return {
    type: 'ADD',
    payload: newMedicationHistory
  }
}

const medicationReducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case 'ADD':

      return { medication_history: [...state.medication_history, payload] };
    default:
      return state;
  }
}

export default medicationReducer;