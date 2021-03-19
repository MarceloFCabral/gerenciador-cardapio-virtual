import React from 'react';
import { Paragraph } from 'react-native-paper';
import { StdScreen, Categoria, Produto } from '../../ui/Ui';
//import theme from '../../../../styles/theme';

const TelaDadosCategorias = () => {
  return (
    <StdScreen title="Categorias">
      <Categoria
        title="teste"
        desc="desc teste blablablabla"
        exp={false}
        onPressEdit={() => console.log("press edit")}
        onPressAdd={() => console.log("press add")}
      >
        <Paragraph>Teste</Paragraph>
      </Categoria>
    </StdScreen>
  );
  /*
  return (
    <StdScreen title="Categorias">
      <Categoria title="Bebidas" desc="Bebidas variadas do nosso restaurante">
        <Produto title="Água" desc="Água mineral geladinha" val="3,00" />
        <Categoria title="Cervejas" desc="Cervejas geladinhas!">
          <Produto title="Skol Latão" desc="Uma cerveja horrível" val="3,50" />
          <Produto title="Original 600ml" desc="Uma cerveja melhorzinha" val="8,00" />
        </Categoria>
      </Categoria>
    </StdScreen>
  );
  */
}


export default TelaDadosCategorias;