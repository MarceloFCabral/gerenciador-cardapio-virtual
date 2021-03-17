import React, { useContext } from 'react';
import { TouchableStdScreen, TextInput, Button, MultilineTextInput } from '../../ui/Ui';
import { EstabelecimentoContext } from '../../context/EstabelecimentoContext';
import { TokenContext } from '../../context/TokenContext';
import { updateEstabelecimento, createEstabelecimento } from '../../../network';

const TelaEditarEstabelecimento = ({ route, navigation }) => {
  const edit = route.params.status == 'e';
  const estabContextData = useContext(EstabelecimentoContext);
  const tokenContextData = useContext(TokenContext);

  const [nome, setNovoNome] = React.useState(edit ? estabContextData.nome : "");
  const [descricao, setNovaDesc] = React.useState(edit ? estabContextData.descricao : "");
  const [endereco, setNovoEnd] = React.useState(edit ? estabContextData.endereco : "");

  const titleStr = (edit ? "Editar " : "Criar ") + "Estabelecimento";

  return (
    <TouchableStdScreen title={titleStr}>
      <TextInput
        mode="outlined"
        label="Nome"
        value={nome}
        onChangeText={text => setNovoNome(text)}
      />
      <MultilineTextInput
        mode="outlined"
        label="Descrição"
        value={descricao}
        size={100}
        onChangeText={setNovaDesc}
      />
      <MultilineTextInput
        mode="outlined"
        label="Endereço"
        value={endereco}
        size={80}
        onChangeText={setNovoEnd}
      />
      <Button mode="contained" onPress={
        () => edit ? updateEstabelecimento({nome, descricao, endereco}, estabContextData, tokenContextData, navigation) :
                     createEstabelecimento({nome, descricao, endereco}, estabContextData, tokenContextData, navigation)
      }>
        {edit ? "SALVAR" : "CRIAR"}
      </Button>
    </TouchableStdScreen>
  );
};

export default TelaEditarEstabelecimento;