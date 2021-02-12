import React from 'react';
import SignIn from './signin';
import SignUp from './signup';
import AddMedication from './add-medication';
import TakeMedication from './take-medication';
import MedicationHistory from './history';
import { connect } from 'react-redux';
import { View } from 'react-native';

const mapDispatchToProps = {};

function Main(props) {

  return (
    <View>
      {props.page.page === 'Sign In' ? <SignIn />
        :
        props.page.page === 'Sign Up' ? <SignUp />
          :
          props.page.page === 'Medicine Cabinet' && props.user.token ? <AddMedication />
            :
            props.page.page === 'Take Medication' && props.user.token ? <TakeMedication />
              :
              props.page.page === 'Medication History' && props.user.token ? <MedicationHistory />
                : null
      }
    </View>
  );
}
const mapStateToProps = state => ({
  page: state.pageReducer,
  user: state.userReducer
})


export default connect(mapStateToProps, mapDispatchToProps)(Main);