import { View, Platform } from 'react-native';
import React from 'react';
import { Appbar, Menu, Divider } from 'react-native-paper';
import { changePage, back } from '../store/page-reducer';
import { connect } from 'react-redux';
import { invalidateToken } from '../store/user-reducer';

const mapDispatchToProps = { changePage, back, invalidateToken };


function Header(props) {
  const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const signOut = () => {
    props.invalidateToken();
    props.changePage('SignIn');
  }
  return (

    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => { props.back(props.page) }} />
        <Appbar.Content title="PilPal" />
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={< Appbar.Action icon={MORE_ICON} onPress={openMenu} />}>
          <Menu.Item onPress={() => { props.changePage('AddMedication') }} title="Settings (Add Medication)" />
          <Divider />
          <Menu.Item onPress={() => { props.changePage('TakeMedication') }} title="Take Medication" />
          <Divider />
          <Menu.Item onPress={() => { props.changePage('MedicationHistory') }} title="Medication History" />
          <Divider />
          <Menu.Item onPress={() => signOut()} title="Sign Out" />
        </Menu>
      </Appbar.Header>
    </View>
  )
}

const mapStateToProps = state => ({
  page: state.pageReducer
})


export default connect(mapStateToProps, mapDispatchToProps)(Header);