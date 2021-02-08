import React from 'react';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import store from './src/store'
import SignIn from './src/components/signin';

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <SignIn />
      </PaperProvider>
    </Provider>
  );
}