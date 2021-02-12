import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Text, Card, Paragraph } from 'react-native-paper';
import { StyleSheet, ScrollView } from 'react-native';
import { getAllMedHistory } from '../store/medication-history-reducer';

const mapDispatchToProps = { getAllMedHistory };

function History(props) {

  const [medProfile, setMedProfile] = useState([]);
  const [historyOfOne, setHistoryOfOne] = useState([]);
  const [displayAllHistory, setDisplayAllHistory] = useState(false);
  const [displayMedProfile, setDisplayMedProfile] = useState(false);
  const [displayOneMedHistory, setDisplayOneMedHistory] = useState(false);
  const [displayAllGroupedByDate, setdisplayAllGroupedByDate] = useState(true);

  const getOneDrugById = async (drug) => {
    const getMedObj = await props.medications.filter(med => med._id === drug);
    // console.log('getMedObj:', getMedObj);
    await setMedProfile(getMedObj);
    setDisplayAllHistory(false);
    setDisplayOneMedHistory(false);
    setDisplayMedProfile(true);
    setdisplayAllGroupedByDate(false);
  }

  const getAllHistoryOneMed = async (drug) => {

    let getHistoryOneMed = await props.history.medication_history.filter(meds => meds.medication_id === drug);
    await setHistoryOfOne(getHistoryOneMed);
    setDisplayAllHistory(false);
    setDisplayMedProfile(false);
    setDisplayOneMedHistory(true);
    setdisplayAllGroupedByDate(false);
  }

  useEffect(() => {
    async function fetchData() {
      await props.getAllMedHistory(props.user);
    }
    fetchData();

  }, []);

  return (
    <ScrollView>
      <Button onPress={() => {
        setDisplayAllHistory(true);
        setDisplayMedProfile(false);
        setdisplayAllGroupedByDate(false);
        setDisplayOneMedHistory(false);
      }}>Display All</Button>
      <Button onPress={() => {
        setDisplayAllHistory(false);
        setDisplayMedProfile(false);
        setdisplayAllGroupedByDate(true);
        setDisplayOneMedHistory(false);
      }}>Display By Date</Button>
      {displayAllGroupedByDate ?
        Object.entries(props.history.groupedByDate).map(([key, value]) => (

          <Card style={styles.surface}>
            <Card.Title title={key} />
            {value.map(item => (
              <Card.Content><Paragraph>
                {item.time_of_day}: {item.name}
              </Paragraph></Card.Content>
            ))}
          </Card>
        ))
        :
        displayMedProfile ?
          <Card style={styles.surface}>
            <Card.Title title={medProfile[0].name} />
            <Card.Content>
              <Paragraph>
                Dosage: {medProfile[0].dosage}
              </Paragraph>
              <Paragraph>
                Frequency: {medProfile[0].frequency}
              </Paragraph>
              <Paragraph>
                Time of Day: {medProfile[0].time_of_day}
              </Paragraph>
              <Paragraph>
                Notes: {medProfile[0].notes}
              </Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button>Edit</Button>
              <Button onPress={() => {
                setDisplayAllHistory(true), setDisplayMedProfile(false),
                  setDisplayOneMedHistory(false)
              }}>Back to History</Button>
            </Card.Actions>
          </Card>
          : displayAllHistory === true ?
            props.history.medication_history.map(drug => (
              <Card style={styles.surface} key={drug._id}>
                <Card.Title title={drug.name} />
                <Card.Content>
                  {/* <Title> {drug.name} </Title> */}
                  <Paragraph>
                    Date & Time: {drug.date} {drug.time_of_day}
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
                      Date & Time: {drug.date} {drug.time_of_day}
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
      <Text style={styles.spacer}></Text>
    </ScrollView>
  );
}

const mapStateToProps = (state) => ({
  history: state.medicationHistoryReducer,
  user: state.userReducer,
  medications: state.medicationsReducer.medications,
});

export default connect(mapStateToProps, mapDispatchToProps)(History);

const styles = StyleSheet.create({
  spacer: {
    height: 100
  },
  surface: {
    margin: 8,
    // height: 100,
    // width: 300,
    // alignItems: 'center',
    // justifyContent: 'center',
    // elevation: 4,
  },
});
