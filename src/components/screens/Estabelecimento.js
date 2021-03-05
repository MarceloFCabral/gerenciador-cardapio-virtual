import React, { useEffect } from 'react';
import { Headline, Separator, LoginImage } from '../ui/Ui';
import { GeneralView } from '../views/Views';
import { get, ROTAS } from '../../network';
import { Text } from 'react-native-paper';
import Context from '../Context';

const TelaEstabelecimento = ({ token, setToken }) => {
  let printToken = () => { console.log("======= TOKEN E SET TOKEN ======="); console.log(token); console.log(setToken) };
  const [nome, setNome] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [end, setEnd] = React.useState('');

  const [editNome, setEditNome] = React.useState(false);
  const [editDesc, setEditDesc] = React.useState(false);
  const [editEnd, setEditEnd] = React.useState(false);
  /*
  //fetch
  useEffect(() => { /*printToken(); get(ROTAS.estabelecimentoId, 1, /*props.token)
    .then(response => {
      if (response.ok) {
        console.log("=========== response está ok ===========");
        response = response.json();
        setToken(response.token);
        setNome(response.nome);
        setDesc(response.desc);
        setEnd(response.end);
      }
    })}, 
  []);
  */
  useEffect(() => printToken(), []);
  return (
    <>
    <Headline>Estabelecimento</Headline>
    <GeneralView>
      <Separator />
      <LoginImage
        source={require('../../../assets/images/elo-apps.png')}
      />
      <Text>{nome}</Text>
      <Text>{desc}</Text>
      <Text>{end}</Text>
    </GeneralView>
    </>
  );
};

export default TelaEstabelecimento;