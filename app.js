import React from 'react';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import store from './src/store'
import Header from './src/components/header';
// import Footer from './src/components/footer';
// import TakeMedication from './src/components/take-medication';
// import MedicationHistory from './src/components/history';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from './src/components/signin';
import AddMedication from './src/components/add-medication';
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <Header />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="SignIn" component={SignIn} options={{ title: 'Sign In' }} />
            <Stack.Screen name="AddMedication" component={AddMedication} options={{ title: 'Add Medication' }} />
          </Stack.Navigator>

        </NavigationContainer>
        {/* <Footer /> */}
      </PaperProvider>
    </Provider>
  );
}



/* <Stack.Screen name="MedicationHistory" component={MedicationHistory} options={{ title: 'History Dashboard' }} /> */
/* <Stack.Screen name="TakeMedication" component={TakeMedication} options={{ title: 'Take Medication' }} /> */