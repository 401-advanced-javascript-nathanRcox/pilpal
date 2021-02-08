import React, { useEffect, setState, useState } from 'react';
import { Button, TextInput, Text, View } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export default function SignIn() {
  const [text, setText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    //getPermissions();
  }, []);

  return (
    <TextInput
      label="Email"
      value={text}
      onChangeText={text => setText(text)} />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    width: '100%'
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

  /*
  button: {
    backgroundColor: '#eee',
    color: '#000'
  },
  tableHeader: {
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
