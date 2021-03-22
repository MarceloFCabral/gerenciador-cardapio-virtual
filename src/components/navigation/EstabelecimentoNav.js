import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import TelaDadosEstabelecimento from '../screens/estabelecimento/DadosEstabelecimento';
import TelaEditarEstabelecimento from '../screens/estabelecimento/EditarEstabelecimento';
import TelaSelecionarEstabelecimento from '../screens/estabelecimento/SelecionarEstabelecimento';
//import { EstabelecimentoProvider } from '../context/EstabelecimentoContext';

const Stack = createStackNavigator();

const EstabelecimentoNav = () => (
  <NavigationContainer independent={true}>
    {/*<EstabelecimentoProvider>*/}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="selecionarEstabelecimento" component={TelaSelecionarEstabelecimento} />
        <Stack.Screen name="dadosEstabelecimento" component={TelaDadosEstabelecimento} />
        <Stack.Screen name="editarEstabelecimento" component={TelaEditarEstabelecimento} />
      </Stack.Navigator>
    {/*</EstabelecimentoProvider>*/}
  </NavigationContainer>
);


export default EstabelecimentoNav;