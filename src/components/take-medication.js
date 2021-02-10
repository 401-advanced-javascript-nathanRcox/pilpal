import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addMedication } from '../store/medication-reducer';
import { TextInput, Button, Text } from 'react-native-paper';
import { invalidateToken } from '../store/user-reducer';
import DateTimePicker from '@react-native-community/datetimepicker';

const mapDispatchToProps = { addMedication, invalidateToken };

function TakeMedication(props) {
  console.log('props in take medication = ', props)
  const [medicationId, setMedicationId] = useState('');
  const [userId, setUserId] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [note, setNote] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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

    let medObject = {
      user_id: props.user.id,
      token: props.user.token,
      date,
      note
    };
    console.log('Object to save from Take Medication page:', medObject);
    try {
      props.addMedication(medObject);
    }
    catch (error) {
      console.log('error adding: ', error, 'invalidating token');
      props.invalidateToken();
    }
  }

  useEffect(() => {
    setUserId(props.user.id);
  }, [])
  return (
    <>
      <Button label="Date" onPress={showDatepicker}>Date</Button>
      <Button label="Time" onPress={showTimepicker}>Time</Button>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
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

      <Button onPress={() => takeMedication()}>Take Medication</Button>
    </>
  )
}

const mapStateToProps = (state) => ({
  history: state.medicationHistoryReducer,
  medications: state.medicationsReducer,
  user: state.userReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(TakeMedication);
