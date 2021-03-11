import React, { useContext } from 'react';
import { StdScreen, LoginImage, RippleButton } from '../../ui/Ui';
import { get, ROTAS } from '../../../network';
import { useFocusEffect } from '@react-navigation/native';
import { EstabelecimentoContext } from '../../context/EstabelecimentoContext';
import { TokenContext } from '../../context/TokenContext';
/*
TESTAR:
- criar variável que armazena se dados já foram carregados ou não
- passar índice atual do BottomNavigation para o componente
- criar uma variável booleana que recebe indexComponente === indexNav
- associar um effect à mudança dessa variável, fazendo a requisição condicionalmente
useEffect(() => async () => { if (!dataLoaded) loadData(); }, [currentIndex]);

--------

OUTRAS POSSIBILIDADES:
- tentar usar o objeto navigation das abas para dar "listen" em um evento
- investigar mais o pq do useEffect não estar ocorrendo na mudança de aba (tentar condicioná-lo a uma variável booleana como descrito acima e ver se funciona)
*/
const TelaDadosEstabelecimento = ({ navigation }) => {
  const { nome, setNome, desc, setDesc, end, setEnd } = useContext(EstabelecimentoContext);
  const { token, setToken } = useContext(TokenContext);
  
  //fetch
  useFocusEffect(
    React.useCallback(() => {
      console.log("=== TOKEN NO COMPONENTE DadosEstabelecimento ===");
      console.log(token);
      //função para fetch de dados. Deve ser escrita dentro da função passada como parâmetro para useCallback (infelizmente).
      const fetchEstabelecimento = async (id) => {
        let r = await get(ROTAS.estabelecimentoId, id, token);
        if (r.ok) {
          r = await r.json();
          setToken(r.token);
          console.log("=== token retornado fetchEstabelecimento ===");
          console.log(r.token);
          r = r.estabelecimento; //sugerir mudança no retorno e não precisar de selecionar objeto estabelecimento da requisição
          setNome(r.nome);
          setDesc(r.descricao);
          setEnd(r.endereco);
        }
      }
      fetchEstabelecimento(1); //passando id 1 como teste
    }, [])
  );

  return (
    <StdScreen title="Estabelecimento">
      <LoginImage
        source={require('../../../../assets/images/elo-apps.png')}
      />
      <RippleButton title="Nome" text={nome} onPress={() => navigation.navigate("editarEstabelecimento")} />
      <RippleButton title="Descrição" text={desc} onPress={() => console.log("descrição apertado")} />
      <RippleButton title="Endereço" text={end} onPress={() => console.log("endereço apertado")} />
    </StdScreen>
  );
};

export default TelaDadosEstabelecimento;