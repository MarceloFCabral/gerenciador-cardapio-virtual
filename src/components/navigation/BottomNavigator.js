/*
jwt: modificar valor apenas quando response.ok === true (token retornado)
*/
import React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import EstabelecimentoNav from './EstabelecimentoNav';
import CategoriasNav from './CategoriasNav';
import { EstabelecimentoProvider } from '../context/EstabelecimentoContext';

const Produtos = () => <Text>Produtos</Text>;

const Visualizacao = () => <Text>Visualização</Text>;

const Configuracoes = () => <Text>Configurações</Text>;

const BottomNavigator = () => {
  console.log("renderizando BottomNavigator");
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'estabelecimento', title: 'Estabelecimento', icon: 'album' },
    { key: 'categorias', title: 'Categorias', icon: 'album' },
    { key: 'produtos', title: 'Produtos', icon: 'history' },
    { key: 'visualizacao', title: 'Ver cardápio', icon: 'history' },
    { key: 'configuracoes', title: 'Configurações', icon: 'history' },
  ]);

  const renderScene = ({ route, jumpTo }) => {
    switch(route.key) {
      case 'estabelecimento':
        return <EstabelecimentoNav jumpTo={jumpTo} />;
      case 'categorias':
        return <CategoriasNav jumpTo={jumpTo} />;
      case 'produtos':
        return <Produtos jumpTo={jumpTo} />;
      case 'visualizacao':
        return <Visualizacao jumpTo={jumpTo} />;
      case 'configuracoes':
        return <Configuracoes jumpTo={jumpTo} />;  
    }
  }

  return (
    <EstabelecimentoProvider>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </EstabelecimentoProvider>
  );
}

export default BottomNavigator;