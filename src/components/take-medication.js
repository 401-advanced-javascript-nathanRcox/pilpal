import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getMedications } from '../store/medication-reducer';
import { TextInput, Button, Text, Checkbox } from 'react-native-paper';
import { invalidateToken } from '../store/user-reducer';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addMedicationHistory } from '../store/medication-history-reducer';

const mapDispatchToProps = { invalidateToken, getMedications };

function TakeMedication(props) {
  console.log('props in take medication = ', props)
  // const [medicationId, setMedicationId] = useState('');
  // const [userId, setUserId] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [note, setNote] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedMedicationList, setSelectedMedicationList] = useState([]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const takeMedication = () => {
    try {
      selectedMedicationList.forEach((medication) => {
        console.log({ medication });
        props.addMedicationHistory({
          user_id: props.user.id,
          medication_id: medication.id,
          name: medication.name,
          date: date,
          notes: note
        });
        props.page.changePage('MedicationHistory');
      })

    }
    catch (error) {
      console.log('error adding: ', error, 'invalidating token');
      props.invalidateToken();
    }
  }

  useEffect(() => {
    //setUserId(props.user.id);
    props.getMedications({ id: props.user.id, token: props.user.token });
    console.log(props.medications)
  }, []);

  return (
    <>
      <Button label="Date" onPress={showDatepicker}>Date</Button>
      <Button label="Time" onPress={showTimepicker}>Time</Button>
      {show ?
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
        : null}
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
      <Text>{errorMessage}</Text>
      {props.me}
      <Button onPress={() => takeMedication()}>Take Medication</Button>
    </>
  )
}

const mapStateToProps = (state) => ({
  history: state.medicationHistoryReducer,
  medications: state.medicationsReducer,
  medicationHistory: state.medicationHistoryReducer,
  user: state.userReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(TakeMedication);
