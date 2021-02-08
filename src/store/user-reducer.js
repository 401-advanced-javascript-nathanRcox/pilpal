import axios from 'axios';
import { ActionSheetIOS } from 'react-native';
// const REACT_NATIVE_API = 'https://pilpal-server.herokuapp.com';
import { REACT_NATIVE_API } from '@env';

//user reducer
let initialState = {
  id: '',
  username: '',
  role: '',
  token: ''
}

export const signUp = (newUser) => {
  return {
    type: 'SIGNUP',
    payload: newUser
  }
}

export const signIn = (user) => {
  console.log(user);
  return {
    type: 'SIGNIN',
    payload: user
  }
}

const userReducer = (state = initialState, action) => {
  console.log('STATE = ', state);
  let { type, payload } = action;
  console.log(payload);
  switch (type) {
    case 'SIGNUP':
      console.log("payload", payload);
      axios.post(REACT_NATIVE_API + '/signup', {
        username: payload.username,
        password: payload.password
      })
        .then(result => {
          console.log(result);
          let user = {
            id: result.data.user._id,
            username: result.data.user.username,
            role: result.data.user.role,
            token: result.data.token
          };
          console.log({ user });
          return { ...state, user };
        })
      //todo: do an API call here
      //save the auth token in a cookie
      return payload;
    case 'SIGNIN':
      //todo: do an API call
      console.log("payload", payload);
      axios.post(REACT_NATIVE_API + '/signin', {}, {
        auth: {
          username: payload.username,
          password: payload.password
        }
      })
        .then((result) => {
          console.log({ result })
          let user = {
            id: result.data.user._id,
            username: result.data.user.username,
            role: result.data.user.role,
            token: result.data.token
          };
          console.log({ user });
          return { ...state, user };
        });
      return state;
      break;
    //save the auth token in a cookie

    //return payload;
    default:
      return state;
  }
}

export default userReducer;