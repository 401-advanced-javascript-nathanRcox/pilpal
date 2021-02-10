import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getMedications } from '../store/medication-reducer';
import { TextInput, Button, Text, Checkbox } from 'react-native-paper';
import { invalidateToken } from '../store/user-reducer';
import { addMedicationHistory } from '../store/medication-history-reducer';

const mapDispatchToProps = { invalidateToken, getMedications };

function TakeMedication(props) {
  // const [medicationId, setMedicationId] = useState('');
  // const [userId, setUserId] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString());
  const [note, setNote] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedMedicationList, setSelectedMedicationList] = useState([]);
  const [checked, setChecked] = React.useState(false);

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
      });
      props.page.changePage('MedicationHistory');
    }
    catch (error) {
      console.log('error taking medication: ', error, 'invalidating token');
      props.invalidateToken();
    }
  }

  const toggleSelection = (event, medication) => {
    console.log('in toggle selection', event, medication);
    event.target.checked = !event.target.checked;
    if (event.target.checked) setSelectedMedicationList([...selectedMedicationList, medication])
    else setSelectedMedicationList(selectedMedicationList.filter(listMedication => {
      if (listMedication.id === medication.id) return medication;
    }))
    event.preventDefault;
  }

  const getMeds = async () => {
    console.log('getting meds');
    await props.getMedications({ id: props.user.id, token: props.user.token });
    console.log('PROPS.MEDICATIONS = ', props.medications)
  }
  useEffect(() => {
    //setUserId(props.user.id);
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
      {props.medications.medications.map((medication) => (
        <Checkbox.Item
          key={medication.id}
          checked={false}
          label={medication.name}
          onPress={() => {
            toggleSelection(medication)
          }} />

      )
      )}
      <Text>{errorMessage}</Text>
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
