import React, { useContext, useEffect } from 'react';
import { getEstabelecimentos } from '../../../network';
import { ItemList, StdScreen, Loading, CreateButton } from '../../ui/Ui';
import { TokenContext } from '../../context/TokenContext';
import { ScrollView } from 'react-native';
import { EstabelecimentoContext } from '../../context/EstabelecimentoContext';
import { Paragraph } from 'react-native-paper';

const TelaSelecionarEstabelecimento = ({ navigation }) => {
  const tokenContextData = useContext(TokenContext);
  const estabContextData = useContext(EstabelecimentoContext);
  const { reload, estabArray } = estabContextData;
  console.log("Reload em SelecionarEstabelecimento = ", reload);
  const [loading, setLoading] = React.useState(reload ? true : false);
  const setContextData = item => {
    const { setId, setNome, setDesc, setEnd } = estabContextData;
    setId(item.id);
    setNome(item.nome);

    setDesc(item.descricao);
    setEnd(item.endereco);
    navigation.navigate("dadosEstabelecimento");
  };
/*
verificar pq reload não está tendo o valor mudado após alterar ou criar
*/
  useEffect(
    () => {
      const { setReload, setEstabArray } = estabContextData;
      if (reload) {
        getEstabelecimentos(tokenContextData, setEstabArray).then(() => setLoading(false));
        setReload(false);
      }
    }, [reload] //isso é muito legal!!!
  );
  return (
    <StdScreen title="Selecionar Estabelecimento">
      {loading ? <Loading /> : <>
      <ScrollView>
        {estabArray.length == 0 ? <>
        <Paragraph>
          {"Você ainda não possui nenhum estabelecimento cadastrado! Clique no ícone abaixo para criar um estabelecimento."}
          </Paragraph>
        <CreateButton onPress={() => navigation.navigate("editarEstabelecimento", { status: 'c' })} /></> : 
        <ItemList data={estabArray} onPress={setContextData} />}
      </ScrollView></>}
    </StdScreen>
  );
};

export default TelaSelecionarEstabelecimento;