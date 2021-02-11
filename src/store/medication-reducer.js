// Medication reducer
import { REACT_NATIVE_API } from '@env';

import axios from 'axios';
import { Platform } from 'react-native';

let initialState = {
  medications: []
}

export const getMedications = (payload) => async dispatch => {
  // console.log('IN GET MEDICATIONS');
  axios.defaults.headers.common = { 'Authorization': `bearer ${payload.token}` }

  // console.log({ payload });
  return await axios.get(
    REACT_NATIVE_API + '/api/v2/medications/user_id/' + payload.id)
    .then(response => {
      // console.log('before adding checked property', response.data)
      response.data.forEach((medication) => {
        // console.log('medication = ', medication);
        medication.checked = false;
        // console.log('medication = ', medication);
      });
      // console.log('after adding checked property: ', response.data);
      dispatch(getMed(response.data));
    });
}

const getMed = payload => {
  return {
    type: 'GET-ALL',
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
    type: 'ADD-MED',
    payload: payload,
  }
}

export const toggleChecked = (payload) => {
  payload = { ...payload, checked: !payload.checked };
  // console.log('toggled payload = ', payload);
  return {
    type: 'TOGGLECHECKED',
    payload: payload
  }
}
const medicationReducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case 'ADD-MED':
      // console.log('Payload:', payload);
      return { medications: [...state.medications, payload] };
    case 'GET-ALL':
      // console.log('payload array = ', payload)
      return { medications: payload }
    case 'TOGGLECHECKED':
      //todo - can we find a way to do this in-place so we aren't changing the order?
      let arrayWithoutOldItem = state.medications.filter(medication => payload._id !== medication._id);
      return {
        medications: [
          ...arrayWithoutOldItem,
          payload
        ]
      }
    default:
      return state;
  }

}

export default medicationReducer;
