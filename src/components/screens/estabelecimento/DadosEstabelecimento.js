import React, { useContext, useEffect } from 'react';
import { StdScreen, LoginImage, ItemView, EditButton, ChangeButton, CreateButton } from '../../ui/Ui';
import { get, ROTAS } from '../../../network';
import { EstabelecimentoContext } from '../../context/EstabelecimentoContext';
import { TokenContext } from '../../context/TokenContext';
import { Centered, CenteredRow } from '../../views/Views';

const TelaDadosEstabelecimento = ({ navigation }) => {
  const { id, setId, nome, setNome, descricao, setDesc, endereco, setEnd } = useContext(EstabelecimentoContext);
  const { token, setToken } = useContext(TokenContext);
  
  //fetch 
  useEffect(
    () => {
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
      fetchEstabelecimento(id); //passando id 1 como teste
    }, [id]
  );
  

  return (
    <StdScreen title="Estabelecimento">
      <LoginImage
        source={require('../../../../assets/images/elo-apps.png')}
      />
      <ItemView title="Nome" text={nome} />
      <ItemView title="Descrição" text={descricao} />
      <ItemView title="Endereço" text={endereco} />
      <Centered style={{ height: '18%' }}>
        <CenteredRow>
          <CreateButton onPress={() => console.log("Create button apertado")}/>
          <EditButton onPress={() => navigation.navigate("editarEstabelecimento")} />
          <ChangeButton onPress={() => console.log("change apertado")} />
        </CenteredRow>
      </Centered>
    </StdScreen>
  );
};

export default TelaDadosEstabelecimento;