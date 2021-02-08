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

  const medObject = { user_id: '60208a7d3d9e100015160499', medName, dosage, frequency, timeOfDay, medNote };
  
  const newMedication = (med) => {
    props.addMedication(med);
  }

  useEffect(() => {console.log('Props.State on Medications:', props.state)});

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
  state,
  user_id: state.userReducer.id,
});

export default connect(mapStateToProps, mapDispatchToProps)(Medication);
