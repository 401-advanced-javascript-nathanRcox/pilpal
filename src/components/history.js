import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Avatar, Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet, ScrollView } from 'react-native';
import { getAllMedHistory } from '../store/medication-history-reducer';

const mapDispatchToProps = { getAllMedHistory };

function History(props) {

  const [history, setHistory] = useState('true');
  const [oneMed, setOneMed] = useState('false');

  const getOneDrugById = (drug) => {
    console.log('DRUG:', drug);
  }

  useEffect(() => {
    console.log('PROPS.HISTORY:', props.history);
    props.getAllMedHistory(props.user)
  }, [])

  return (
    <ScrollView>
      <Button>Sort by Medication</Button>
      {props.history.map(drug => (
        <Card style={styles.surface} key={drug._id}>
          <Card.Title title={drug.name}  />
          <Card.Content>
            {/* <Title> {drug.name} </Title> */}
            <Paragraph>
              Date & Time: {drug.datetime}
            </Paragraph>
            <Paragraph>
              Notes: {drug.notes}
            </Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button>Edit</Button>
            <Button onPress={() => getOneDrugById(drug._id)}>History</Button>
          </Card.Actions>
        </Card>
      ))}
    </ScrollView>
  );
}
const mapStateToProps = (state) => ({
  history: state.medicationHistoryReducer.medication_history,
  user: state.userReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(History);

const styles = StyleSheet.create({
  surface: {
    margin: 8,
    // height: 100,
    // width: 300,
    // alignItems: 'center',
    // justifyContent: 'center',
    // elevation: 4,
  },
});
