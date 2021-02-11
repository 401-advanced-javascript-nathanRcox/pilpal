import { REACT_NATIVE_API } from '@env';
import axios from 'axios';

let initialState = {
  medications: []
}

export const getMedications = (payload) => async dispatch => {
  axios.defaults.headers.common = { 'Authorization': `bearer ${payload.token}` }

  return await axios.get(
    REACT_NATIVE_API + '/api/v2/medications/user_id/' + payload.id)
    .then(response => {
      response.data.forEach((medication) => {
        medication.checked = false;
      });
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
  return {
    type: 'TOGGLECHECKED',
    payload: payload
  }
}
const medicationReducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case 'ADD-MED':
      return { medications: [...state.medications, payload] };
    case 'GETALL':
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
