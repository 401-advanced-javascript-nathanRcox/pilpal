import React, { useEffect, setState, useState } from 'react';
import { Button, TextInput, Text } from 'react-native-paper';
import { StyleSheet, Link } from 'react-native';
import { connect } from 'react-redux';
import { signIn, retrieveToken } from '../store/user-reducer';
import { changePage } from '../store/page-reducer';

const mapDispatchToProps = { signIn, changePage, retrieveToken };

function SignIn(props) {
  //todo: if the user is already signed in, change page to add medication page
  // console.log(token);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const getToken = async () => {
    // console.log('props = ', props)
    await props.retrieveToken();
    // console.log('props = ', props)
    // console.log('retrieved { token, user id } = ', props.user.token, ',  userID: ', props.user.id);
    if (props.user.token && props.user.id)
      props.changePage('Take Medication');
    // else
    //   AsyncStorage.clear();
  }

  useEffect(() => {
    getToken();
    //check if user is signed in. If yes, skip the authentication requirement
  }, [props.user.token]);

  const go = async () => {
    try {
      await props.signIn({
        username,
        password
      });
      // console.log('STATE AFTER SIGN IN', props.user);
      props.changePage('Take Medication');
      // console.log(props.user)
    }
    catch (error) {
      setErrorMessage('Incorrect username or password, please try again.');
      console.log(errorMessage);
    }
  }
  return (
    <>
      <TextInput
        style={styles.input}
        label="Username"
        value={username}
        autoCapitalize="none"
        onChangeText={user => setUsername(user)} />
      <TextInput
        style={styles.input}
        label="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={password => setPassword(password)} />
      <Text>{errorMessage}</Text>
      {/* find this error message and update it */}
      <Button mode="contained" onPress={() => go()}>
        Sign In
      </Button>
      <Button onPress={() => props.changePage('Sign Up')}>SignUp</Button>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    textAlign: "center",
    width: '100%',
    margin: "auto",
    padding: 20
  },
  header: {
    marginTop: 16,
    paddingVertical: 5,
    paddingTop: 45,
    backgroundColor: '#fff',
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    textDecorationLine: "underline"
  },
  input: {
  }
});

const mapStateToProps = state => ({
  user: state.userReducer,
  page: state.pageReducer
})


export default connect(mapStateToProps, mapDispatchToProps)(SignIn);