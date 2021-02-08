
//user reducer
let initialState = {
}

export const signup = (newUser) => {
  return {
    type: 'SIGNUP',
    payload: newUser
  }
}

export const signin = (user) => {
  return {
    type: 'SIGNIN',
    payload: user
  }
}

const userReducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case 'SIGNUP':
      //todo: do an API call here
      return { payload };
    case 'SIGNIN':
      //todo: do an API call
      return { payload };
    default:
      return state;
  }
}

export default userReducer;