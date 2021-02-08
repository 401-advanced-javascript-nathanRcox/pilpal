import { StyleSheet, View } from 'react-native';
import React, { useEffect, setState, useState } from 'react';
import { Button, TextInput, Text } from 'react-native-paper';


function Header() {

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Medication Tracker</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
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
  }
});

export default Header;