import React, { useContext } from 'react';
import { TouchableStdScreen, TextInput, Button, MultilineTextInput } from '../../ui/Ui';
import { CategoriasContext } from '../../context/CategoriasContext';
import { TokenContext } from '../../context/TokenContext';
import { createCategoria, updateCategoria } from '../../../network';
import { Picker } from '@react-native-picker/picker';
import { pickerArrRender } from '../../../utils';

const TelaEditarCategoria = ({ route, navigation }) => {
  const edit = route.params.status == 'e';
  let categoria = edit ? route.params.categoria : null; //categoria tem de ter a prop key/chave/id

  const catContextData = useContext(CategoriasContext);
  const { estabelecimento_id, catArray } = catContextData;
  const tokenContextData = useContext(TokenContext);

  const [nome, setNovoNome] = React.useState(edit ? categoria.nome : "");
  const [descricao, setNovaDesc] = React.useState(edit ? categoria.descricao : "");
  const [categoria_pai_id, setCatPaiId] = React.useState(edit ? categoria.categoria_pai_id : -1); //usado no edit

  const titleStr = (edit ? "Editar " : "Criar ") + "Categoria";

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
      <Picker
        selectedValue={categoria_pai_id}
        onValueChange={value => setCatPaiId(value)}
      >
        {pickerArrRender(catArray)}
      </Picker>
      <Button mode="contained" onPress={
        () => edit ? updateCategoria({nome, descricao, categoria_pai_id, estabelecimento_id}, categoria, catContextData, tokenContextData, navigation) :
                     createCategoria({nome, descricao, categoria_pai_id, estabelecimento_id}, catContextData, tokenContextData, navigation)
      }>
        {edit ? "SALVAR" : "CRIAR"}
      </Button>
    </TouchableStdScreen>
  );
};

export default TelaEditarCategoria;