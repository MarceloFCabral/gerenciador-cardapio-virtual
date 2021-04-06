/*
Dá pra melhorar.
*/
import React, { useContext, useEffect } from 'react';
import { Alert, ScrollView } from 'react-native';
import { Paragraph } from 'react-native-paper';
import { getCategorias, getProdutos } from '../../../network';
import { categoriasRender } from '../../../utils';
import { EstabelecimentoContext } from '../../context/EstabelecimentoContext';
import { TokenContext } from '../../context/TokenContext';
import { StdScreen, Loading } from '../../ui/Ui';
import { LogBox } from 'react-native';

//não há state persistance ou deep linking. É possível ignorar com segurança
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const TelaDadosCategorias = ({ navigation }) => {
  console.log("============ Renderizando TelaDadosCategorias ============");
  const recHandleDelCat = () => {

  }
  const handlers = {
    handleEditCat: (categoria, id) => navigation.navigate("editCategorias", { status: 'e', categoria, id, setReload }),
    handleAdd: catPaiId => {
      Alert.alert(
        "",
        "Deseja criar uma categoria ou um produto?",
        [
          { text: "Categoria", onPress: () => navigation.navigate("editCategorias", { status: 'c', catPaiId, setReload }) },
          { text: "Produto", onPress: () => navigation.navigate("editProdutos", { status: 'c', catPaiId, setReload }) }
        ],
        {
          cancelable: true
        }
      );
    },
    handleEditProd: produto => navigation.navigate("editProd", { status: 'e', produto, setReload }),
    handleDelCat: () => {},
    handleDelProd: prodId => deleteProduto(prodId, tokenContextData, setReload),
  }

  const tokenContextData = useContext(TokenContext);
  const { token, setToken } = tokenContextData;
  const estabContextData = useContext(EstabelecimentoContext);
  const { estabelecimento_id } = estabContextData;
  const [catObj, setCatObj] = React.useState({});
  const [prodObj, setProdObj] = React.useState({});
  const [reload, setReload] = React.useState(false);
  //const prevDadosRef = useRef({ estabelecimento_id, catObj, prodObj });

  //talvez terei que usar set pras variáveis abaixo
  //console.log("estabelecimento_id render anterior =", prevDadosRef.current.estabelecimento_id);
  console.log("estabelecimento_id render atual =", estabelecimento_id);
  console.log("reload =", reload);
  //const newIdOrReload = prevDadosRef.current.estabelecimento_id != estabelecimento_id || reload == true;
  //const reRender = prevDadosRef.current.catObj != catObj && prevDadosRef.current.prodObj != prodObj;
  const [reRender, setReRender] = React.useState(true);

  console.log("valor de reRender =", reRender);
  const [componentArr, setComponentArr] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
   
 //console.log("newIdOrReload =", newIdOrReload);
  
  //fetch de categorias e produtos. Só é realizado quando o estabelecimento é modificado ou quando há modificação nas categorias ou produtos.
  useEffect(
    () => {
      setLoading(true);
      console.log("Entrou no useEffect reload ou estabelecimento_id");
      /*if () {*/
        //console.log("Entrou no if (newIdOrReload)");
        getCategorias(estabelecimento_id, token, setToken).then(({ categorias, token }) => {
          setCatObj(categorias);
          getProdutos(estabelecimento_id, token, setToken).then(({ produtos }) => {
            setProdObj(produtos);
            setReRender(true);
            setReload(false);
          });
        });
      /*}*/
    }, [reload, estabelecimento_id]
  );

  //atualiza o arranjo de componentes exibidos na tela somente quando os objetos de categorias E produtos são modificados.
  //OBS importante: o método "categoriasRender" deleta propriedades do objeto catObj, tornando-o inutilizável em uma renderização futura.
  //Sempre é necessário fazer um novo fetch para renderizar categorias ou produtos atualizados.
  useEffect(
    () => {
      if (reRender) {
        console.log("entrou no useEffect do reRender");
        setComponentArr(categoriasRender(catObj, prodObj, handlers));
        setReRender(false);
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