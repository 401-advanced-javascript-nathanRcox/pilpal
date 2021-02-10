import React, { useEffect, setState, useState } from 'react';
import { Button, TextInput, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { signUp } from '../store/user-reducer';

const mapDispatchToProps = { signUp };

function SignUp(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    //check if user is signed in. If yes, skip the authentication requirement
    // console.log('User = ', props.user);
    //else do nothing.
  }, []);

  const newUser = async () => {
    try {
      await props.signUp({
        username,
        password,
        email
      });
      console.log('STATE AFTER SIGN UP', props.user);

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
      <TextInput
        style={styles.input}
        label="Email"
        value={email}
        onChangeText={email => setEmail(email)} />
      <Text>{errorMessage}</Text>
      <Button mode="contained" onPress={() => newUser()}>
        Sign Up
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
    // borderWidth: 4,
    // borderColor: "#20232a",
    // borderRadius: 6,
    backgroundColor: '#fff', //"#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    textDecorationLine: "underline"
  },
  input: {
  }
  /*tableHeader: {
    fontSize: 18,
    padding: 5
  },
  item: {
    fontSize: 16,
    paddingHorizontal: 5,
    textAlign: 'left',
    color: '#20232a'
  }*/
});

const mapStateToProps = state => ({
  user: state.userReducer
})


export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
