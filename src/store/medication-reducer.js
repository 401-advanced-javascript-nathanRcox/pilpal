
//medication reducer
let initialState = {
  medications: []
}

export const addMedication = (newMedication) => {
  return {
    type: 'ADD',
    payload: newMedication
  }
}

const medicationReducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case 'ADD':
      //todo: do an API call here
      return { ...state, activeCategory: payload };
    default:
      return state;
  }
}

export default medicationReducer;