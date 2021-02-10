import React from 'react';
import SignIn from './signin';
import AddMedication from './add-medication';
import TakeMedication from './take-medication';
// import MedicationHistory from './src/components/history';
import { connect } from 'react-redux';
import { changePage } from '../store/page-reducer';
import { View } from 'react-native';

const mapDispatchToProps = { changePage };
import { useEffect } from 'react';


function Main(props) {

  return (
    <View>
      {props.page.page === 'SignIn' ? <SignIn />
        :
        props.page.page === 'SignUp' ? <SignUp />
          :
          props.page.page === 'AddMedication' && props.user.token ? <AddMedication />
            :
            props.page.page === 'TakeMedication' && props.user.token ? <TakeMedication />
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