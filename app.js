import React from 'react';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import store from './src/store'
import Header from './src/components/header';
import Main from './src/components/main'

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <Header />
        <Main />
      </PaperProvider>
    </Provider >
  );
}