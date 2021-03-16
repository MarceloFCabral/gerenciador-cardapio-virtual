import React, { useContext, useEffect } from 'react';
import { getEstabelecimentos } from '../../../network';
import { ItemList, StdScreen } from '../../ui/Ui';
import { TokenContext } from '../../context/TokenContext';
import { ScrollView } from 'react-native';
import { EstabelecimentoContext } from '../../context/EstabelecimentoContext';

const TelaSelecionarEstabelecimento = ({ navigation }) => {
  const tokenContextData = useContext(TokenContext);
  const estabContextData = useContext(EstabelecimentoContext);
  const [dados, setDados] = React.useState(null);
  const setContextData = (item) => {
    const { setId, setNome, setDesc, setEnd } = estabContextData;
    setId(item.id);
    setNome(item.nome);
    setDesc(item.descricao);
    setEnd(item.endereco);
    navigation.goBack();
  };

  useEffect(
    () => {
      getEstabelecimentos(tokenContextData).then(r => setDados(r));
    }, []
  );
  return (
    <StdScreen title="Selecionar Estabelecimento">
      <ScrollView>
        {dados && <ItemList data={dados} onPress={setContextData} />}
      </ScrollView>
    </StdScreen>
  );
};

export default TelaSelecionarEstabelecimento;