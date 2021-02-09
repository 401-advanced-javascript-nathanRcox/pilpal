import { StyleSheet, View, Platform } from 'react-native';
import React, { useEffect, setState, useState } from 'react';
//import { Button, TextInput, Text } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
// import { Button, View, Text } from 'react-native';



function Header({ navigation }) {

  console.log('h', navigation);
  const AddMedication = () => <AddMedication />;
  const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

  return (
    <View>

      <Appbar.Header>
        <Appbar.Content title="PilPal" />
        <Appbar.Action icon="magnify" onPress={() => { navigation.navigate('SignIn') }} />
        <Appbar.Action icon={MORE_ICON} onPress={() => { navigation.navigate('AddMedication') }} />
      </Appbar.Header>
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