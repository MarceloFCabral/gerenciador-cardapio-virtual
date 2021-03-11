import React, { useEffect, useContext } from 'react';
//import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TelaDadosEstabelecimento from '../screens/estabelecimento/DadosEstabelecimento';
import TelaEditarEstabelecimento from '../screens/estabelecimento/EditarEstabelecimento';
import { EstabelecimentoProvider } from '../context/EstabelecimentoContext';
import { TokenContext } from '../context/TokenContext';

const Stack = createStackNavigator();

const EstabelecimentoNav = () => {
  const { token } = useContext(TokenContext);

  useEffect(() => {console.log("=== TOKEN NO COMPONENTE EstabelecimentoNav ==="); console.log(token)}, []);
  return (
    <EstabelecimentoProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="dadosEstabelecimento" component={TelaDadosEstabelecimento} />
        <Stack.Screen name="editarEstabelecimento" component={TelaEditarEstabelecimento} />
      </Stack.Navigator>
    </EstabelecimentoProvider>
  );
};

export default EstabelecimentoNav;