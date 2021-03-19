import React, { useContext } from 'react';
import { StdScreen, LoginImage, ItemView, EditButton, ChangeButton, CreateButton } from '../../ui/Ui';
import { EstabelecimentoContext } from '../../context/EstabelecimentoContext';
import { Centered, CenteredRow } from '../../views/Views';

const TelaDadosEstabelecimento = ({ navigation }) => {
  console.log("renderizando TelaDadosEstabelecimento");
  const estabContextData = useContext(EstabelecimentoContext);
  const { nome, descricao, endereco } = estabContextData;

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
          <CreateButton onPress={() => navigation.navigate("editarEstabelecimento", { status: 'c' })}/>
          <EditButton onPress={() => navigation.navigate("editarEstabelecimento", { status: 'e' })} />
          <ChangeButton onPress={() => navigation.navigate("selecionarEstabelecimento")} />
        </CenteredRow>
      </Centered>
    </StdScreen>
  );
};
/*
{loading ? <Loading /> : <> </>}
*/
export default TelaDadosEstabelecimento;