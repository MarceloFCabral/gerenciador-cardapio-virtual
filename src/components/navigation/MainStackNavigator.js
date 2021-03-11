import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TelaLogin from '../screens/Login';
import BottomNavigator from './BottomNavigator';

const Stack = createStackNavigator();

const MainStackNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" component={TelaLogin} />
      <Stack.Screen name="bottomNav" component={BottomNavigator} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default MainStackNavigator;