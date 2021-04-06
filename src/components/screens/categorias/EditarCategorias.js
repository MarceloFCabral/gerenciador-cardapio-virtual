/*
ATENÇÃO:
A ideia é tornar possível mudar a qual categoria-pai uma categoria ou produto pertence usando um tracker de movimentos que permita o arraste de uma categoria/produto para dentro
/fora de outra categoria. O Picker é provisório.

Estou tentando NÃO USAR um Contexto para as Categorias e Produtos (evitar muitos re-renders, além de crer que não seja necessário).
  -> Isso torna necessário alterar os métodos de rede relacionados às categorias em network.js (não há mais "catContextData" sendo passada como parâmetro).
  -> O re-render seria triggerado pelo método setReload proveniente do componente "TelaDadosCategoria".

A edição dos dados de uma determinada Categoria/Produto faria uso do fato de que objetos, em JS, são passados a funções e métodos como referência. Qualquer alteração em uma propriedade
de um objeto "dentro" de uma função ou procedimento também se reflete no "exterior".
*/


import React, { useContext } from 'react';
import { TouchableStdScreen, TextInput, Button, MultilineTextInput } from '../../ui/Ui';
//import { CategoriasContext } from '../../context/CategoriasContext';
import { EstabelecimentoContext } from '../../context/EstabelecimentoContext';
import { TokenContext } from '../../context/TokenContext';
import { createCategoria, updateCategoria } from '../../../network';
//import { Picker } from '@react-native-picker/picker';
//import { pickerArrRender } from '../../../utils';

const TelaEditarCategoria = ({ route, navigation }) => {
  const edit = route.params.status == 'e';
  const { setReload, catPaiId, id } = route.params;
  console.log("catPaiId (vindo da rota) =", catPaiId);
  let categoria = edit ? route.params.categoria : null; //categoria tem de ter a prop key/chave/id

  const { estabelecimento_id } = useContext(EstabelecimentoContext);
  const tokenContextData = useContext(TokenContext);

  const [nome, setNovoNome] = React.useState(edit ? categoria.nome : "");
  const [descricao, setNovaDesc] = React.useState(edit ? categoria.descricao : "");

  const [categoria_pai_id, setCatPaiId] = React.useState(
    edit ? (categoria.categoria_pai_id != null ? categoria.categoria_pai_id : undefined) : catPaiId
  ); //usado no edit
  console.log("categoria_pai_id (estado local EditarCategoria) =", categoria_pai_id);

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
      {/*<Picker
        selectedValue={categoria_pai_id}
        onValueChange={value => setCatPaiId(value)}
      >
        {pickerArrRender(catArray)}
        <Picker.Item label="Selecione uma categoria" value={-1} />
      </Picker>*/}
      <Button mode="contained" onPress={
        () => edit ? 
          updateCategoria(
            {nome, descricao, id, categoria_pai_id, estabelecimento_id},
            tokenContextData, navigation, setReload
          ) :
          createCategoria(
            {nome, descricao, categoria_pai_id, estabelecimento_id}, 
            tokenContextData, navigation, setReload
          )
      }>
        {edit ? "SALVAR" : "CRIAR"}
      </Button>
    </TouchableStdScreen>
  );
};

export default TelaEditarCategoria;