import * as React from 'react';
import { Modal, Portal, Button, Provider } from 'react-native-paper';
// import { changePage } from '../store/page-reducer';

export const NavToggle = (props) => {

  const containerStyle = { backgroundColor: 'white', padding: 20 };

  return (
    <Provider>
      <Portal>
        <Modal visible={props.visible} contentContainerStyle={containerStyle}>
          <Button title="hide modal" onPress={props.hideModal}>Add Medication</Button>
          <Button title="take to take meds page" onPress={() => props.changePage('Take Medication')}>Take a Medication</Button>
        </Modal>
      </Portal>
    </Provider>
  );
};
