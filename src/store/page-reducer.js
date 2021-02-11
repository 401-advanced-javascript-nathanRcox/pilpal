
//category reducer
let initialState = {
  page: 'Sign In',
  navigationStack: []
}

export const back = () => {
  return {
    type: 'BACK',
    payload: []
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
      if (payload === state.navigationStack[state.navigationStack.length - 1]) return state;
      let newNavigationStack = [...state.navigationStack, payload];
      console.log('new navigation stack =', newNavigationStack);
      return { navigationStack: newNavigationStack, page: payload };
    case 'BACK':
      //todo: verify that this works
      console.log('going back to the last entry in ', state.navigationStack);
      //make a copy of the current navigation stack
      newNavigationStack = state.navigationStack.slice();
      console.log({ newNavigationStack });
      //remove the last item in the stack
      if (state.navigationStack.length > 1) newNavigationStack.pop();
      console.log({ newNavigationStack });

      return { page: newNavigationStack[newNavigationStack.length - 1], navigationStack: newNavigationStack }
    default:
      return state;
  }
}

export default pageReducer;