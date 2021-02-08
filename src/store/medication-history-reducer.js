
//category reducer
let initialState = {
  medication_history: []
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
      //todo: do an API call here

      //return the new item added to the arra as state?
      return { ...state, activeCategory: payload };
    default:
      return state;
  }
}

export default medicationReducer;