import React from 'react';
import { ActivityIndicator, Colors } from 'react-native-paper';

function Footer(props) {
  return (
    <ActivityIndicator animating={true} size='small' color={Colors.blue100} />
  )
}

export default Footer;