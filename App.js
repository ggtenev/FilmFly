import "react-native-gesture-handler";

import * as React from "react";
import StartScreen from './StartScreen';
import { Provider as StoreProvider } from 'react-redux';
import store from './redux/store';
export default function App() { 
  return (
    // <Login/>
    <StoreProvider store={store}>
       <StartScreen/>
    </StoreProvider>
  );
}
