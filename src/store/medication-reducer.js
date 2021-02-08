// Medication reducer

const axios = require('axios').default;

let initialState = {
  medications: []
}

const API = process.env.REACT_APP_API;
// const API = 'http://localhost:3000/api/v1/medications';
const URL = 'https://pilpal-server.herokuapp.com/api/v1/medications'
export const addMedication = (payload) => dispatch => {
  // console.log('medObject:', payload)
  return axios.post(`${API}/api/v1/medications`, {
    user_id: payload.user_id,
    name: payload.medName,
    dosage: payload.dosage,
    frequency: payload.frequency,
    time_of_day: payload.timeOfDay,
    notes: payload.medNote,
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
      //todo: do an API call here
      // console.log('Payload:', payload);
      return {medications: [...state.medications, payload]};

    default:
      return state;
  }
  
}

export default medicationReducer;