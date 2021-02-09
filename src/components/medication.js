import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addMedication } from '../store/medication-reducer';
import { TextInput, Button } from 'react-native-paper';

const mapDispatchToProps = { addMedication };

function Medication(props) {

  const [medName, setMedName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('');
  const [medNote, setMedNote] = useState('');
  const [id, setUserId] = useState(props.user.id);

  const medObject = { user_id: id, medName, dosage, frequency, timeOfDay, medNote };
  
  const newMedication = (med) => {
    console.log('Props:', props);
    setUserId(props.user.id);
    console.log('MedObject on Medication:', medObject);
    props.addMedication(med);
  }

  useEffect(() => {console.log('Props on Medications:', props)}, [props]);

  return (
    <>
          <TextInput
        label="Name of Medication"
        value={medName}
        onChangeText={text => setMedName(text)}
      />
      <TextInput
        label="Dosage"
        value={dosage}
        onChangeText={text => setDosage(text)}
      />
      <TextInput
        label="Frequency"
        value={frequency}
        onChangeText={text => setFrequency(text)}
      />
      <TextInput
        label="Time of Day"
        value={timeOfDay}
        onChangeText={text => setTimeOfDay(text)}
      />
      <TextInput
        label="Notes"
        value={medNote}
        onChangeText={text => setMedNote(text)}
      />
      <Button onPress={() => newMedication(medObject)}>Add a Medication</Button>
      </>
  )
}

const mapStateToProps = (state) => ({
  history: state.medicationHistoryReducer,
  medications: state.medicationsReducer,
  user: state.userReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(Medication);
