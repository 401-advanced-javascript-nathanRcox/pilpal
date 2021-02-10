// Medication reducer
import { REACT_NATIVE_API } from '@env';

import axios from 'axios';

let initialState = {
  medications: []
}

export const getMedications = (payload) => async dispatch => {
  axios.defaults.headers.common = { 'Authorization': `bearer ${payload.token}` }

  // console.log({ payload });
  return await axios.get(
    REACT_NATIVE_API + '/api/v2/medications/user_id/' + payload.id)
    .then(response => {
      console.log(response.data);
      dispatch(getMed(response.data));
    });
}

const getMed = payload => {
  return {
    type: 'GETALL',
    payload: payload
  }
}
export const addMedication = (payload) => dispatch => {
  // console.log('Token:', payload.token)
  return axios.post(REACT_NATIVE_API + '/api/v2/medications',
    {
      user_id: payload.user_id,
      name: payload.medName,
      dosage: payload.dosage,
      frequency: payload.frequency,
      time_of_day: payload.timeOfDay,
      notes: payload.medNote,
    },
    {
      headers: {
        Authorization: 'Bearer ' + payload.token
      }
    })
    .then(response => {
      // console.log('Response:', response);
      dispatch(postMed(response.data));
    })
    .catch(error => console.error('Post failed', error));
};

export const postMed = payload => {
  return {
    type: 'ADD',
    payload: payload,
  }
}

const medicationReducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case 'ADD':
      // console.log('Payload:', payload);
      return { medications: [...state.medications, payload] };
    case 'GETALL':
      console.log('payload array = ', payload)
      return { medications: payload }
    default:
      return state;
  }

}

export default medicationReducer;
