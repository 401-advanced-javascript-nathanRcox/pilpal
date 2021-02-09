import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getAllMedication } from '../store/medication-history-reducer';
import { Text, View} from 'react-native-paper';

const mapDispatchToProps = { getAllMedication };

function History(props) {


    return (
        <>
            {props.history.map(data => {
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
