import { StyleSheet, View, Platform } from 'react-native';
import React, { useEffect } from 'react';
import { Appbar } from 'react-native-paper';
import { changePage, back } from '../store/page-reducer';
import { connect } from 'react-redux';

const mapDispatchToProps = { changePage, back };


function Header(props) {
  const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

  useEffect(() => {
    console.log('PROPS.PAGE CHANGED TO = ', props.page);
  }, [props.page])
  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => { props.back() }} />
        <Appbar.Content title="PilPal" />
        <Appbar.Action icon="magnify" onPress={() => {
          // console.log('changing to sign in page');
          props.changePage('SignIn');
          // console.log(props.page);
        }} />
        <Appbar.Action icon={MORE_ICON} onPress={() => {
          console.log('changing to add medication page');
          props.changePage('AddMedication')
          console.log('HEADER PAGE props.page changed to ', props.page);

        }} />
      </Appbar.Header>
    </View>
  )
}

const mapStateToProps = state => ({
  page: state.pageReducer
})


export default connect(mapStateToProps, mapDispatchToProps)(Header);