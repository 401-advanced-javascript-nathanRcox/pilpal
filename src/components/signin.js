import React, { useEffect, setState, useState } from 'react';
import { Button, TextInput, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { signIn } from '../store/user-reducer';
import { changePage } from '../store/page-reducer';
// import CookieManager from '@react-native-cookies/cookies';

const mapDispatchToProps = { signIn, changePage };

function SignIn(props) {
  //todo: if the user is already signed in, change page to add medication page


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    //check if user is signed in. If yes, skip the authentication requirement
    //get from cookie
    // let token = CookieManager.get('token');
    // console.log('User = ', props.user);
    //else do nothing.
  }, []);

  const go = async () => {
    try {
      await props.signIn({
        username,
        password
      });
      console.log('STATE AFTER SIGN IN', props.user);
      // console.log(props.user)
    }
    catch (error) {
      setErrorMessage(error.message);
    }
  }
  return (
    <View style={styles.container}>
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
      <Button mode="contained" onPress={() => go()}>
        Sign In
      </Button>
    </View>
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