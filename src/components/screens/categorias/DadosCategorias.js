/*
--------------
| PENDÊNCIAS |
--------------

!! Modificar o retorno da API de Categorias para tornar a busca por uma Categoria-filho menos custosa computacionalmente
  (
    Atualmente, para buscar uma Categoria ou Produto-filho, deve-se buscar sequencialmente por todo o arranjo uma Categoria/Produto cujo atributo "id" seja igual ao "id" da categoria pai.
    A busca sequencial possui um custo muito alto. Para reduzir esse custo, são possíveis as seguintes modificações:
      [ver papel na mesa]
  )

- Definir se usarei contexto para as Categorias ou não 
  (
    tendo em vista a atualização do catArray e do estado do contexto não está ocorrendo logo após o retorno da requisição, se fez necessário usar uma variável local,
    não inscrita no sistema de estados do React, para obter o arranjo atualizado pós-retorno contendo os objetos com dados de cada categoria. Caso o arranjo de categorias
    não seja usado em nenhum outro componente (tirando o componente da tela de edição/criação de categorias), não vale a pena manter o arranjo no contexto e duplicar dados na memória.
    No entanto, manter a variável "reload" no contexto pode ser interessante pois nos propicia a rerenderização do componente da tela de visualização/dados imediatamente após a edição,
    não sendo necessária a focalização da tela para modificar os elementos visuais. Pode ser interessante, portanto, manter o contexto apenas com a variável "reload".
    obs.: para evitar o uso do Contexto apenas com a variável Reload, é possível passar como parâmetro de rota (para a tela de edição) o seguinte objeto:
    { status: 'c'/'e', setReload }. O uso de setReload no componente de edição triggeraria um rerender da tela de dados, atualizando os elementos do "DOM".
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
/*
Tarefa atual: tentando NÃO usar Contexto para Categorias e Produtos.
*/
import React, { useContext, useEffect, useRef } from 'react';
import { ScrollView } from 'react-native';
import { Paragraph } from 'react-native-paper';
import { getCategorias, getProdutos } from '../../../network';
import { categoriasRender } from '../../../utils';
import { EstabelecimentoContext } from '../../context/EstabelecimentoContext';
import { TokenContext } from '../../context/TokenContext';
import { StdScreen, Loading } from '../../ui/Ui';

const TelaDadosCategorias = () => {
  const { token, setToken } = useContext(TokenContext);
  const estabContextData = useContext(EstabelecimentoContext);
  const { estabelecimento_id } = estabContextData;
  const [catObj, setCatObj] = React.useState({});
  const [prodObj, setProdObj] = React.useState({});
  const [reload, setReload] = React.useState(true);
  const prevDadosRef = useRef({ estabelecimento_id, catObj, prodObj });
  //talvez terei que usar set pras variáveis abaixo
  const newIdOrReload = prevDadosRef.current.estabelecimento_id != estabelecimento_id || reload == true;
  const reRender = prevDadosRef.current.catObj != catObj && prevDadosRef.current.prodObj != prodObj;
  console.log("valor de reRender =", reRender);
  const [componentArr, setComponentArr] = React.useState([]);
  const [loading, setLoading] = React.useState(newIdOrReload);
   
  console.log("newIdOrReload =", newIdOrReload);
  
  useEffect(
    () => {
      console.log("Entrou no useEffect newIdOrReload");
      if (newIdOrReload) {
        console.log("Entrou no if (newIdOrReload)");
        getCategorias(estabelecimento_id, token, setToken).then(({ categorias, token }) => {
          setCatObj(categorias);
          getProdutos(estabelecimento_id, token, setToken).then(({ produtos }) => {
            setProdObj(produtos);
            setReload(false);
          });
        });
      }
    }, [newIdOrReload]
  );

  useEffect(
    () => {
      if (reRender) {
        console.log("entrou no useEffect do reRender");
        setComponentArr(categoriasRender(catObj, prodObj));
        setLoading(false);
      }
    }, [reRender]
  );

  return (
    <StdScreen title="Categorias">
      {loading ? <Loading /> : <>
      <ScrollView>
        {catObj.length == 0 ? <>
        <Paragraph>
          Você ainda não possui nenhuma categoria! Clique no ícone abaixo para criar uma categoria.
        </Paragraph></> :
        componentArr}
      </ScrollView></>}
    </StdScreen>
  );
}


export default TelaDadosCategorias;