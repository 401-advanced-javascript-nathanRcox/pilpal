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
// export const get = () => dispatch => {
//   console.log('iN GET ----------------=')
//   return superagent.get('https://dina-auth-api.herokuapp.com/api/v1/products')
//     .then(response => {
//       response.body.forEach(product => {
//         product.inCart = 0;
//       });
//       dispatch(getProducts({ products: response.body }));;
//     })
// }

// const getProducts = payload => {
//   return {
//     type: 'GET',
//     payload: payload
//   }
// }

export const signUp = (newUser) => dispatch => {
  return {
    type: 'SIGNUP',
    payload: newUser
  }
}

export const signIn = (user) => dispatch => {
  console.log(user);

  return axios.post(REACT_NATIVE_API + '/signin', {}, {
    auth: {
      username: user.username,
      password: user.password
    }
  })
    .then(result => {
      console.log({ result })
      let user = {
        id: result.data.user._id,
        username: result.data.user.username,
        role: result.data.user.role,
        token: result.data.token
      };
      dispatch(getSignIn({ user }));;

    });

}

const getSignIn = payload => {
  return {
    type: 'SIGNIN',
    payload
  }
}

const userReducer = (state = initialState, action) => {
  let { type, payload } = action;
  // console.log('userReducer Payload:', payload);
  switch (type) {
    case 'SIGNUP':
      // console.log("payload", payload);
      axios.post(REACT_NATIVE_API + '/signup', {
        username: payload.username,
        password: payload.password
      })
        .then(result => {
          // console.log(result);
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
      console.log("payload", payload);
      return payload;
      break;
    //save the auth token in a cookie

    //return payload;
    default:
      return state;
  }
}

export default userReducer;
