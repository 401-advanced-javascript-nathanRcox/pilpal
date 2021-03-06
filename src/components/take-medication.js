import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addMedicationHistory } from '../store/medication-history-reducer';
import { getMedications, toggleChecked } from '../store/medication-reducer';
import { Surface, TextInput, Button, Text, Checkbox } from 'react-native-paper';
import { StyleSheet, ScrollView, View } from 'react-native';
import { invalidateToken } from '../store/user-reducer';
import { changePage } from '../store/page-reducer';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates'
import 'intl';
import 'intl/locale-data/jsonp/en'; // or any other locale you need
// import { SelectDate } from './date-time-picker';

const mapDispatchToProps = { invalidateToken, getMedications, changePage, toggleChecked, addMedicationHistory };

function TakeMedication(props) {
  const selectDate = new Date();

  const [date, setDate] = useState(selectDate.toLocaleDateString());
  const [time, setTime] = useState(selectDate.getHours() + ':' + selectDate.getMinutes());
  const [note, setNote] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [visibleDate, setVisibleDate] = React.useState(false)
  const [visibleTime, setVisibleTime] = React.useState(false)

  const onDismissDate = React.useCallback(() => {
    setVisibleDate(false)
  }, [setVisibleDate]);

  const onChangeDate = React.useCallback(({ date }) => {
    setVisibleDate(false)
    setDate(date.toLocaleDateString());
  }, []);

  const onDismissTime = React.useCallback(() => {
    setVisibleTime(false)
  }, [setVisibleTime]);

  const onConfirmTime = React.useCallback(
    ({ hours, minutes }) => {
      setVisibleTime(false);
      setTime(`${hours}:${minutes}`)
      // console.log({ hours, minutes });
    },
    [setVisibleTime]
  );

  const takeMedication = () => {
    try {
      props.medications.medications.forEach((medication) => {
        if (medication.checked) {
          props.addMedicationHistory({
            user_id: props.user.id,
            medication_id: medication._id,
            name: medication.name,
            date: date,
            time_of_day: time,
            notes: note
          }, props.user.token);
        }
      });
      props.changePage('Medication History');
    }
    catch (error) {
      console.log('error taking medication: ', error, 'invalidating token');
      setErrorMessage(error);
      props.invalidateToken();
      props.changePage('Sign In');
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
      // props.invalidateToken();
    }
  }
  useEffect(() => {
    //setUserId(props.user.id);
    // console.log('PROPS ON LOADING TAKE MEDICATION PAGE', props);
    getMeds();
  }, []);

  return (
    <ScrollView>
      <DatePickerModal
        mode="single"
        visible={visibleDate}
        onDismiss={onDismissDate}
        date={selectDate}
        onConfirm={onChangeDate}
        //saveLabel="Save" // optional
        label="Select date" // optional
        animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
        locale={'en'} // optional, default is automically detected by your system
      />
      <TimePickerModal
        visible={visibleTime}
        onDismiss={onDismissTime}
        onConfirm={onConfirmTime}
        hours={selectDate.getHours()} // default: current hours
        minutes={selectDate.getMinutes()} // default: current minutes
        label="Select time" // optional, default 'Select time'
        cancelLabel="Cancel" // optional, default: 'Cancel'
        confirmLabel="Ok" // optional, default: 'Ok'
        animationType="fade" // optional, default is 'none'
        locale={'en'} // optional, default is automically detected by your system
      />
      <View style={styles.buttonRow}>
        <View style={styles.button}>
          <Button onPress={() => setVisibleDate(true)}>
            Date: {date}
          </Button>
        </View>
        <View style={styles.button}>
          <Button onPress={() => setVisibleTime(true)}>
            Time: {time}
          </Button>
        </View>
      </View>

      <TextInput
        label="Notes"
        style={styles.input}
        value={note}
        onChangeText={note => setNote(note)}
      />

      <Text style={styles.header}>Medications</Text>
      {props.medications.medications.map(medication => (
        <Surface key={medication._id}>
          < Checkbox.Item
            status={medication.checked ? "checked" : "unchecked"}
            label={medication.name}
            style={styles.checkbox}
            onPress={() => {
              toggleSelection(medication)
            }} />
        </Surface>
      )
      )}
      <Text style={styles.error}>{errorMessage}</Text>
      <Button onPress={() => takeMedication()}>Save</Button>
      <Text style={styles.spacer}></Text>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  spacer: {
    height: 100
  },
  header: {
    marginTop: 5,
    paddingVertical: 5,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonRow: {
    marginVertical: 10,
    flexDirection: 'row'
  },
  button: {
    width: "50%"
  },
  error: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    color: "#8B0000",
    fontSize: 18
  }
});
const mapStateToProps = (state) => ({
  medications: state.medicationsReducer,
  medicationHistory: state.medicationHistoryReducer,
  user: state.userReducer,
  page: state.pageReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(TakeMedication);
