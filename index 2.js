import { registerRootComponent } from 'expo';

// import App from './App';

// registerRootComponent calls 
AppRegistry.registerComponent('main', () => App);
// // It also ensures that whether you load the app in the Expo client or in a native build,
// // the environment is set up appropriately
registerRootComponent(App);


// import * as React from 'react';
// import { Provider as PaperProvider } from 'react-native-paper';
// import { Provider as StoreProvider } from 'react-redux';
// import App from './App';
// import store from './src/store';

// export default function Main() {
//   return (
//     <StoreProvider store={store}>
//       <PaperProvider>
//         <App />
//       </PaperProvider>
//     </StoreProvider>
//   );
// }