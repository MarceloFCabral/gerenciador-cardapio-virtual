import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import TelaDadosCategorias from '../screens/categorias/DadosCategorias';
import { CategoriasProvider } from '../context/CategoriasContext';

const Stack = createStackNavigator();

const CategoriasNav = () => (
  <NavigationContainer independent={true}>
    <CategoriasProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="dadosCategorias" component={TelaDadosCategorias} />
      </Stack.Navigator>
    </CategoriasProvider>
  </NavigationContainer>
);


export default CategoriasNav;