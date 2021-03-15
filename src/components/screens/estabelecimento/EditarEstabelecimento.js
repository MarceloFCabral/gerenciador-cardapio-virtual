import React, { useContext } from 'react';
import { TouchableStdScreen, TextInput, Button } from '../../ui/Ui';
import { TextInput as NativeTextInput } from 'react-native';
import { EstabelecimentoContext } from '../../context/EstabelecimentoContext';
import { TokenContext } from '../../context/TokenContext';
import { updateEstabelecimento } from '../../../network';

/*
-- DANDO ERRO NESTA TELA, VERIFICAR --
*/
const TelaEditarEstabelecimento = ({ navigation }) => {
  const estabContextData = useContext(EstabelecimentoContext);
  const tokenContextData = useContext(TokenContext);

  const [nome, setNovoNome] = React.useState(estabContextData.nome);
  const [descricao, setNovaDesc] = React.useState(estabContextData.descricao);
  const [endereco, setNovoEnd] = React.useState(estabContextData.endereco);

  return (
    <TouchableStdScreen title="Editar Estabelecimento">
      <TextInput
        mode="outlined"
        label="Nome"
        value={nome}
        onChangeText={text => setNovoNome(text)}
      />
      <TextInput
        mode="outlined"
        label="Descrição"
        value={descricao}
        render={() => 
          <NativeTextInput
            value={descricao}
            multiline={true}
            textAlignVertical="top"
            style={{ height: 100, paddingHorizontal: 13, fontSize: 15 }}
            onChangeText={text => setNovaDesc(text)}
          />
        }
      />
      <TextInput
        mode="outlined"
        label="Endereço"
        value={endereco}
        render={() =>
          <NativeTextInput
            value={endereco}
            multiline={true}
            textAlignVertical="top"
            style={{ height: 80, paddingHorizontal: 13, fontSize: 15 }}
            onChangeText={text => setNovoEnd(text)}
          />
        }
      />
      <Button mode="contained" onPress={() => updateEstabelecimento({nome, descricao, endereco}, estabContextData, tokenContextData, navigation)}>
        SALVAR
      </Button>
    </TouchableStdScreen>
  );
};

export default TelaEditarEstabelecimento;