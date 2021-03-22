import React from 'react';
import { StdScreen, Categoria, Produto } from '../../ui/Ui';
//import theme from '../../../../styles/theme';

const TelaDadosCategorias = () => {
  return (
    <StdScreen title="Categorias">
      <Categoria
        title="Bebidas"
        desc="Confira nossa seleção de bebidas geladinhas."
        exp={false}
        onPressEdit={() => console.log("press edit")}
        onPressAdd={() => console.log("press add")}
      >
        <Categoria
          title="Cervejas"
          desc="Cervejas geladas e de rótulos variados."
          exp={false}
          onPressEdit={() => console.log("press edit")}
          onPressAdd={() => console.log("press add")}
        >
          <Produto 
            title="Cerveja Colorado 600ml"
            desc="Uma cerveja bem nice"
            val="9,00"
            onPressEdit={() => console.log("press edit produto")}
          />
        </Categoria>
      </Categoria>
    </StdScreen>
  );
}


export default TelaDadosCategorias;