import React, { useContext, useEffect } from 'react';
import { getEstabelecimentos } from '../../../network';
import { ItemList, StdScreen, Loading } from '../../ui/Ui';
import { TokenContext } from '../../context/TokenContext';
import { ScrollView } from 'react-native';
import { EstabelecimentoContext } from '../../context/EstabelecimentoContext';

const TelaSelecionarEstabelecimento = ({ navigation }) => {
  const tokenContextData = useContext(TokenContext);
  const estabContextData = useContext(EstabelecimentoContext);
  const { reload, estabArray } = estabContextData;
  const [loading, setLoading] = React.useState(reload ? true : false);
  const setContextData = item => {
    const { setId, setNome, setDesc, setEnd } = estabContextData;
    setId(item.id);
    setNome(item.nome);

    setDesc(item.descricao);
    setEnd(item.endereco);
    navigation.goBack();
  };

  useEffect(
    () => {
      const { setReload, setEstabArray } = estabContextData;
      if (reload) {
        getEstabelecimentos(tokenContextData, setEstabArray).then(() => setLoading(false));
        setReload(false);
      }
    }, []
  );
  return (
    <StdScreen title="Selecionar Estabelecimento">
      {loading ? <Loading /> : <>
      <ScrollView>
        {estabArray && <ItemList data={estabArray} onPress={setContextData} />}
      </ScrollView></>}
    </StdScreen>
  );
};

export default TelaSelecionarEstabelecimento;