import React, { useContext } from 'react';
import { StdScreen, TextInput } from '../../ui/Ui';
import { EstabelecimentoContext } from '../../context/EstabelecimentoContext';
import { TokenContext } from '../../context/TokenContext';
import { atualizarEstabelecimento } from '../../../network';

/*
-- DANDO ERRO NESTA TELA, VERIFICAR --
*/
const TelaEditarEstabelecimento = () => {
  const { nome, desc, end } = useContext(EstabelecimentoContext);
  const { token, setToken } = useContext(TokenContext);

  const [novoNome, setNovoNome] = React.useContext(nome);
  const [novaDesc, setNovaDesc] = React.useContext(desc);
  const [novoEnd, setNovoEnd] = React.useContext(end);

  return (
    <StdScreen title="Editar Estabelecimento">
      <TextInput
        label="Nome"
        value={novoNome}
        onChangeText={() => setNovoNome(text)}
      />
      <TextInput
        label="Descrição"
        value={novaDesc}
        onChangeText={() => setNovaDesc(text)}
        style={{ height: "10%" }}
      />
      <TextInput
        label="Endereço"
        value={novoEnd}
        onChangeText={() => setNovoEnd(text)}
      />
      <Button mode="contained" onPress={() => atualizarEstabelecimento()}>

      </Button>
    </StdScreen>
  );
};

export default TelaEditarEstabelecimento;