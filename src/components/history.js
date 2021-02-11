import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Text, Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet, ScrollView } from 'react-native';
import { getAllMedHistory, getHistoryOneMed } from '../store/medication-history-reducer';
import { getOneMed } from '../store/medication-reducer';


const mapDispatchToProps = { getAllMedHistory, getHistoryOneMed, getOneMed };

function History(props) {

  const [medProfile, setMedProfile] = useState([]);
  const [historyOfOne, setHistoryOfOne] = useState([]);
  const [displayAllHistory, setDisplayAllHistory] = useState(true);
  const [displayMedProfile, setDisplayMedProfile] = useState(false);
  const [displayOneMedHistory, setDisplayOneMedHistory] = useState(false);

  const getOneDrugById = async (drug) => {
    const getMedObj = await props.medications.filter(med => med._id === drug);
    console.log('getMedObj:', getMedObj);
    await setMedProfile(getMedObj);
    setDisplayAllHistory(false);
    setDisplayOneMedHistory(false);
    setDisplayMedProfile(true);
  }

  const getAllHistoryOneMed = async (drug) => {

    let getHistoryOneMed = await props.history.filter(meds => meds.medication_id === drug);
    await setHistoryOfOne(getHistoryOneMed);
    setDisplayAllHistory(false);
    setDisplayMedProfile(false);
    setDisplayOneMedHistory(true);
  }

  useEffect(() => {
    props.getAllMedHistory(props.user)
  }, [])

  return (
    <ScrollView>
      <Button>Sort by Medication</Button>
      <>
        { displayMedProfile === true ?
          <Card style={styles.surface}>
            <Card.Title title={medProfile[0].name} />
            <Card.Content>
              {/* <Title> {drug.name} </Title> */}
              <Paragraph>
                Dosage: {medProfile[0].dosage}
              </Paragraph>
              <Paragraph>
                Frequency: {medProfile[0].frequency}
              </Paragraph>
              <Paragraph>
                Time of Day: {medProfile[0].datetime}
              </Paragraph>
              <Paragraph>
                Notes: {medProfile[0].notes}
              </Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button>Edit</Button>
              <Button onPress={() => { setDisplayAllHistory(true), setDisplayMedProfile(false), 
              setDisplayOneMedHistory(false)} }>Back to History</Button>
            </Card.Actions>
          </Card>
          : displayAllHistory === true ?
            props.history.map(drug => (
              <Card style={styles.surface} key={drug._id}>
                <Card.Title title={drug.name} />
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
                  <Button onPress={() => getOneDrugById(drug.medication_id)}>Drug Profile</Button>
                  <Button onPress={() => getAllHistoryOneMed(drug.medication_id)}>Drug History</Button>
                </Card.Actions>
              </Card>
            ))
            : displayOneMedHistory === true ?
              historyOfOne.map(drug => (
                <Card style={styles.surface} key={drug._id}>
                  <Card.Title title={drug.name} />
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
                    <Button onPress={() => setDisplayAllHistory(true)}>Back to History</Button>
                  </Card.Actions>
                </Card>
              ))
              : <Text>''</Text>
        }
      </>
    </ScrollView>
  );
}

const mapStateToProps = (state) => ({
  history: state.medicationHistoryReducer.medication_history,
  user: state.userReducer,
  medications: state.medicationsReducer.medications,
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
