/*
--------------
| PENDÊNCIAS |
--------------

!! Modificar o retorno da API de Categorias para tornar a busca por uma Categoria-filho menos custosa computacionalmente
  (
    Atualmente, para buscar uma Categoria ou Produto-filho, deve-se buscar sequencialmente por todo o arranjo uma Categoria/Produto cujo atributo "id" seja igual ao "id" da categoria pai.
    A busca sequencial possui um custo muito alto. Para reduzir esse custo, são possíveis as seguintes modificações:
      1. 
  )

- Definir se usarei contexto para as Categorias ou não 
  (
    tendo em vista a atualização do catArray e do estado do contexto não está ocorrendo logo após o retorno da requisição, se fez necessário usar uma variável local,
    não inscrita no sistema de estados do React, para obter o arranjo atualizado pós-retorno contendo os objetos com dados de cada categoria. Caso o arranjo de categorias
    não seja usado em nenhum outro componente (tirando o componente da tela de edição/criação de categorias), não vale a pena manter o arranjo no contexto e duplicar dados na memória.
    No entanto, manter a variável "reload" no contexto pode ser interessante pois nos propicia a rerenderização do componente da tela de visualização/dados imediatamente após a edição,
    não sendo necessária a focalização da tela para modificar os elementos visuais. Pode ser interessante, portanto, manter o contexto apenas com a variável "reload".
  )

- Definir se usarei contexto para os Produtos ou não
  (
    A lógica por trás dessa decisão é similar à delineada acima. Caso os dados dos Produtos não sejam utilizados em outro componente tirando o de criação/edição de produtos,
    não valeria a pena criar um Context apenas para os Produtos (principalmente porque seria possível reaproveitar a variável "reload" do contexto das Categorias para modificar
    os elementos visuais).
  )
* Observação: é possível manter o Contexto e usar o hook useEffect para executar as funções na seguinte ordem:
  1) getCategorias,
  2) getProdutos.then(() => setLoading(false)),
  [3] (não seria necessário mais um hook useEffect) rerender com os arranjos de Categorias e Produtos atualizados, triggerado pelo setLoading(false).

- Modificar os métodos de rede de acordo com a escolha feita acima.
  (
    Caso opte por não armazenar o arranjo retornado do servidor nos Contextos, fazer os métodos getCategorias e getProdutos retornarem os arranjos. Caso contrário, manter apenas
    o setArray (método fornecido pelo Provider de cada contexto) na definição dos métodos.
  )
*/

import React, { useContext, useEffect, useRef } from 'react';
import { ScrollView } from 'react-native';
import { Paragraph } from 'react-native-paper';
import { getCategorias, getProdutos } from '../../../network';
import { categoriasRender } from '../../../utils';
import { CategoriasContext } from '../../context/CategoriasContext';
//import { EstabelecimentoContext } from '../../context/EstabelecimentoContext';
import { TokenContext } from '../../context/TokenContext';
import { StdScreen, Loading } from '../../ui/Ui';


const TelaDadosCategorias = () => {
  const tokenContextData = useContext(TokenContext);
  const catContextData = useContext(CategoriasContext);
  const { estabelecimento_id, reload, catArray } = catContextData;
  const prevDadosRef = useRef({estabelecimento_id, reload});
  const newIdOrReload = prevDadosRef.current.estabelecimento_id != estabelecimento_id || reload == true;
  const [loading, setLoading] = React.useState(newIdOrReload);

  //const [localCatArr, setLocalCatArr] = React.useState([]);
  let localCatArr = [];
  const [prodArr, setProdArr] = React.useState([]);
   
  console.log("newIdOrReload =", newIdOrReload);
  //investigar em que momentos este efeito está sendo executado. Printar valores estabId, reload e newIdOrReload
  useEffect(
    () => {
      console.log("Entrou no useEffect DadosCategorias");
      if (newIdOrReload) {
        console.log("Entrou no if do useEffect DadosCategorias");
        const { setReload, setCatArray } = catContextData;
        //---
        const token0 = tokenContextData.token;
        //--- 
        getCategorias(estabelecimento_id, tokenContextData, setCatArray).then(categorias => {
          localCatArr = categorias;
          console.log("localCatArr =", localCatArr);
          //---
          if (token0 == tokenContextData.token) console.log("TOKEN NÃO SE MODIFICOU ENTRE getCategorias E getProdutos");
          //---
          let promiseArray = localCatArr.map(cat => {
            console.log("entrou no catArray.map");
            getProdutos(cat.id, tokenContextData).then(prodArr => {
              console.log("Produtos de uma categoria =", prodArr);
              setProdArr([...prodArr]);
            }); //ineficiente. Criar endpoint para retornar produtos associados a um estabelecimento
          });
          Promise.all(promiseArray).then(() => {setLoading(false); setReload(false);});
        });
      }
    }, [newIdOrReload]
  );
  return (
    <StdScreen title="Categorias">
      {loading ? <Loading /> : <>
      <ScrollView>
        {catArray.length == 0 ? <>
        <Paragraph>
          Você ainda não possui nenhuma categoria! Clique no ícone abaixo para criar uma categoria.
        </Paragraph></> :
        categoriasRender(catArray, prodArr)}
      </ScrollView></>}
    </StdScreen>
  );
  /*
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
  */
}


export default TelaDadosCategorias;