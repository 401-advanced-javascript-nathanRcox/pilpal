
//category reducer
let initialState = {
  page: 'SignIn',
  navigationStack: []
}

export const back = (payload) => {
  console.log('going back to the last entry in ', state.navigationStack);

  return {
    type: 'BACK',
    payload: payload
  }
}
export const changePage = (newPage) => {
  console.log('changing page to: ', { newPage });
  return {
    type: 'CHANGEPAGE',
    payload: newPage
  }
}

const pageReducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case 'CHANGEPAGE':
      let newNavigationStack = [...state.navigationStack, payload];
      console.log('new navigation stack =', newNavigationStack);
      return { navigationStack: newNavigationStack, page: payload };
    case 'BACK':
      //todo: verify that this works
      return { ...state, navigationStack: state.navigationStack.splice(state.navigationStack.length - 1, 1) }
    default:
      return state;
  }
}

export default pageReducer;