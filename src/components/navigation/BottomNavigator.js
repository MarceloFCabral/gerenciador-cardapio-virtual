/*
jwt: modificar valor apenas quando response.ok === true (token retornado)
*/
import React, { useEffect, useContext } from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import EstabelecimentoNav from './EstabelecimentoNav';
import { TokenContext } from '../context/TokenContext';

const Categorias = () => <Text>Categorias</Text>;

const Produtos = () => <Text>Produtos</Text>;

const Visualizacao = () => <Text>Visualização</Text>;

const Configuracoes = () => <Text>Configurações</Text>;

const BottomNavigator = () => {
  const { token, setToken } = useContext(TokenContext);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'estabelecimento', title: 'Estabelecimento', icon: 'album' },
    { key: 'categorias', title: 'Categorias', icon: 'album' },
    { key: 'produtos', title: 'Produtos', icon: 'history' },
    { key: 'visualizacao', title: 'Ver cardápio', icon: 'history' },
    { key: 'configuracoes', title: 'Configurações', icon: 'history' },
  ]);

  //const [dataLoaded, setDataLoaded] = React.useState([false, false, false, false, false]);
  //const [loadData] = React.useState([]);
  /*
  const changeTab = i => {
    if (dataLoaded[i] === false)
      loadData[i]();
  };
  */
  //let tokenObj = { token: token, setToken: setToken };
  /*
  const renderScene = BottomNavigation.SceneMap({
    estabelecimento: TelaEstabelecimento,
    categorias: Categorias,
    produtos: Produtos,
    visualizacao: Visualizacao,
    configuracoes: Configuracoes
  });
  */

  useEffect(() => {console.log("=== TOKEN NO COMPONENTE BOTTOMNAVIGATOR ==="); console.log(token)}, []);

  const renderScene = ({ route, jumpTo }) => {
    switch(route.key) {
      case 'estabelecimento':
        return <EstabelecimentoNav jumpTo={jumpTo} />;
      case 'categorias':
        return <Categorias token={token} setToken={setToken} jumpTo={jumpTo} />;
      case 'produtos':
        return <Produtos token={token} setToken={setToken} jumpTo={jumpTo} />;
      case 'visualizacao':
        return <Visualizacao token={token} setToken={setToken} jumpTo={jumpTo} />;
      case 'configuracoes':
        return <Configuracoes token={token} setToken={setToken} jumpTo={jumpTo} />;  
    }
  }

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default BottomNavigator;