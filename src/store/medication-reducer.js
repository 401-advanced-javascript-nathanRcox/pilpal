// Medication reducer
import { REACT_NATIVE_API } from '@env';

const axios = require('axios').default;

let initialState = {
  medications: []
}

// const API = process.env.REACT_APP_API;
// const API = 'http://localhost:3000/api/v1/medications';
// REACT_NATIVE_API + '/api/v2/medications'
// const URL = 'https://pilpal-server.herokuapp.com/api/v2/medications'

export const getMedications = (payload) => dispatch => {
  console.log('User ID = ', payload);
  return axios.get(
    REACT_NATIVE_API + '/api/v2/medications/user_id/' + payload.id,
    {},
    {
      headers: {
        'Authorization': payload
      }
    }
  )
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
  console.log('Token:', payload.token)
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
        'Authorization': payload.token
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