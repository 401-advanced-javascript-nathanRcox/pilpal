import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addMedicationHistory } from '../store/medication-history-reducer';
import { getMedications, toggleChecked } from '../store/medication-reducer';
import { Surface, TextInput, Button, Text, Checkbox } from 'react-native-paper';
import { StyleSheet, ScrollView } from 'react-native';
import { invalidateToken } from '../store/user-reducer';
import { changePage } from '../store/page-reducer';

const mapDispatchToProps = { invalidateToken, getMedications, changePage, toggleChecked, addMedicationHistory };

function TakeMedication(props) {
  const [date, setDate] = useState(new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString());
  const [note, setNote] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const takeMedication = () => {
    try {
      props.medications.medications.forEach((medication) => {
        if (medication.checked) {
          console.log({ medication });
          console.log({ token: props.user.token })
          props.addMedicationHistory({
            user_id: props.user.id,
            medication_id: medication._id,
            name: medication.name,
            datetime: date,
            notes: note
          }, props.user.token);
        }
      });
      console.log('PROPS AFTER SAVING = ', props);
      props.changePage('MedicationHistory');
    }
    catch (error) {
      console.log('error taking medication: ', error, 'invalidating token');
      setErrorMessage(error);
      props.invalidateToken();
      props.changePage('SignIn');
    }
  }

  const toggleSelection = (medication) => {
    props.toggleChecked(medication);
  }

  const getMeds = async () => {
    try {
      // console.log('getting meds');
      await props.getMedications({ id: props.user.id, token: props.user.token });
      // console.log('PROPS.MEDICATIONS = ', props.medications)
    }
    catch (error) {
      console.log('error getting medications: ', error, 'invalidating token');
      setErrorMessage(error);
      props.invalidateToken();
    }
  }
  useEffect(() => {
    //setUserId(props.user.id);
    console.log('PROPS ON LOADING TAKE MEDICATION PAGE', props);
    getMeds();
  }, []);

  return (
    <>
      <TextInput
        label="Date"
        value={date}
        onChangeText={date => setDate(date)}
      />

      <TextInput
        label="Notes"
        value={note}
        onChangeText={note => setNote(note)}
      />

      <ScrollView>
        {props.medications.medications.map(medication => (
            <Surface key={medication._id}>
              < Checkbox.Item
                // {console.log()}
                
                status={medication.checked ? "checked" : "unchecked"}
                label={medication.name}
                onPress={() => {
                  toggleSelection(medication)
                }} />
            </Surface>
        )
        )}
        <Text>{errorMessage}</Text>
        <Button onPress={() => takeMedication()}>Take Medication</Button>
      </ScrollView>

    </>
  )
}

const mapStateToProps = (state) => ({
  medications: state.medicationsReducer,
  medicationHistory: state.medicationHistoryReducer,
  user: state.userReducer,
  page: state.pageReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(TakeMedication);
