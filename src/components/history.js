import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Text, View} from 'react-native-paper';
import { getAllMedHistory } from '../store/medication-history-reducer';

const mapDispatchToProps = { getAllMedHistory };

function History(props) {
    // console.log('I AM THE PROPS!', props)

    useEffect(()=> {
       getAllMedHistory(props.user.token)
    }, [])

    return (
        <>
        {console.log('I AM THE PROPS!', props)}
            {props.history.medication_history.map(data => {
                <View key={data._id}>
                    <Text>
                        {data.name}
                    </Text>
                    <Text>
                        {data.datetime}
                    </Text>
                    <Text>
                        {data.notes}
                    </Text>
                </View>
            })}
        </>
    );
}
const mapStateToProps = (state) => ({
    history: state.medicationHistoryReducer,
    medications: state.medicationsReducer,
    user: state.userReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(History);
