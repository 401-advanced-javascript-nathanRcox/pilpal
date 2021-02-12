import { API_KEY as REACT_NATIVE_API } from '../../environmentVars';
import axios from 'axios';

let initialState = {
  medication_history: [],
  groupedByDate: {}
}

export const getAllMedHistory = (payload) => dispatch => {

  axios.defaults.headers.common = { 'Authorization': `bearer ${payload.token}` }

  return axios.get(REACT_NATIVE_API + `/api/v2/medication-history/user_id/${payload.id}`)

    .then(response => {
      response.data.forEach((item) => {
        let dateString = item.date + ' ' + item.time_of_day;
        item.dateTime = new Date(dateString);
      });
      const sortedMedHistory = response.data.sort((a, b) => b.dateTime - a.dateTime)
      let groupedData = getGroupedByDate(sortedMedHistory);
      dispatch(getMedHistory(groupedData));
    })
    .catch(error => console.error('get all failed', error))
}

const getMedHistory = payload => {
  return {
    type: 'GET-ALL',
    payload: payload
  }
}

const getGroupedByDate = (medicationHistory) => {
  console.log(medicationHistory);
  let groupedByDate = {}
  medicationHistory.forEach(medication => {
    if (groupedByDate[medication.date]) {
      groupedByDate[medication.date].push(medication)
    } else {
      //this key doesn't exist yet. create it
      groupedByDate[medication.date] = [];
      groupedByDate[medication.date].push(medication)
    }
  });
  console.log('MEDICATION GROUPED BY DATE', groupedByDate);
  return { medication_history: medicationHistory, groupedByDate };
}

export const addMedicationHistory = (newMedicationHistory, token) => dispatch => {
  axios.defaults.headers.common = { 'Authorization': `bearer ${token}` }
  // console.log(newMedicationHistory, token);
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

const medicationHistoryReducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case 'GET-ALL':
      return payload;
    case 'ADD-MEDHISTORY':
      return { medication_history: [...state.medication_history, payload] }
    default:
      return state;
  }
}

export default medicationHistoryReducer;
