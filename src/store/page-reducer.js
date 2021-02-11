
//category reducer
let initialState = {
  page: 'Sign In',
  navigationStack: []
}

export const back = (state = initialState) => {
  console.log('going back to the last entry in ', state.navigationStack);
  return {
    type: 'BACK',
    payload: state
  }
}
export const changePage = (newPage) => {
  // console.log('changing page to: ', { newPage });
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
      // console.log('new navigation stack =', newNavigationStack);
      return { navigationStack: newNavigationStack, page: payload };
    case 'BACK':
      //todo: verify that this works
      return { ...state, navigationStack: state.navigationStack.splice(state.navigationStack.length - 1, 1) }
    default:
      return state;
  }
}

export default pageReducer;