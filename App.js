/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import MainStackNavigator from './src/components/navigation/MainStackNavigator';
import { TokenProvider } from './src/components/context/TokenContext';

const App = () => (
  <TokenProvider>
    <MainStackNavigator />
  </TokenProvider>
);

export default App;
