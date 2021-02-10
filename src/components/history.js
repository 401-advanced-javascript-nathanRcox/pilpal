import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Text, Surface } from 'react-native-paper';
import { getAllMedHistory } from '../store/medication-history-reducer';

const mapDispatchToProps = { getAllMedHistory };

function History(props) {

  useEffect(() => {
    console.log('PROPS on HISTORY:', props);
    getAllMedHistory(props.user)
  }, [props])

  return (
    <>
      <Text>Test</Text>
      {console.log('PROPS in HISTORY Render', props)}
      {props.history.medication_history.map(data => (
        <Surface key={data._id}>
          <Text>
            Test {data.name}
          </Text>
          <Text>
            {data.datetime}
          </Text>
          <Text>
            {data.notes}
          </Text>
        </Surface>
      ))}
    </>
  );
}
const mapStateToProps = (state) => ({
  history: state.medicationHistoryReducer,
  medications: state.medicationsReducer,
  user: state.userReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(History);
