import { getParams } from './utils';
import { Alert } from "react-native";

//URL e rotas
const URL_API = "http://192.168.1.106/cardapio-virtual-api/public/api";
export const ROTAS = {
  registro: "/register",
  login: "/login",
  estabelecimento: "/estabelecimento",
  estabelecimentoId: "/estabelecimento/",
  categoria: "/categoria",
  categoriaId: "/categoria/",
  produto: "/produto",
  produtoId: "/produto/"
}

/*
------------------------------
| Métodos de requisição HTTP |
------------------------------
*/
export function post(route, body, token) {
  let headers = { Accept: 'application/json', 'Content-Type': 'application/json' };
  if (typeof token != "undefined") headers['Authorization'] = 'Bearer ' + token;
  return fetch(URL_API + route, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  });
}

export function get(route, params, token) {
  const url = URL_API + route + params;
  let headers = { Accept: 'application/json', 'Content-Type': 'application/json' };
  if (typeof token != "undefined") headers['Authorization'] = 'Bearer ' + token;
  console.log("=== método get ===");
  console.log(url);
  return fetch(url, {
    method: 'GET',
    headers
  });
}

export function put(route, params, token) {
  const url = URL_API + route + params;
  let headers = { Accept: 'application/json', 'Content-Type': 'application/json' };
  if (typeof token != "undefined") headers['Authorization'] = 'Bearer ' + token;
  return fetch(url, {
    method: 'PUT',
    headers
  });
}

export function del(route, params, token) {
  const url = URL_API + route + params;
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token
  };
  return fetch(url, {
    method: 'DELETE',
    headers
  });
}

/*
-------------------
| Função de login |
-------------------
*/
export async function login(userData, navigation, setToken) { //userData = objeto js com chaves user e password -> obrigatório
  let r = await post(ROTAS.login, userData);
  if (r.ok) {
    r = await r.json();
    setToken(r.token);
    //console.log("método LOGIN ---- passou setToken");
    navigation.navigate("bottomNav");
  } else {
    r = await r.json();
    console.log("Retorno login");
    console.log(r);
    Alert.alert("E-mail ou senha inválidos.");
  }
}

/*
--------------------------------------------------------------------
| Procedimentos e funções relacionadas ao CRUD de Estabelecimentos |
--------------------------------------------------------------------
*/

//create
export async function createEstabelecimento(newEstabData, estabContextData, tokenContextData, navigation) {
  const { setNome, setDesc, setEnd, setReload } = estabContextData;
  const { token, setToken } = tokenContextData;

  let r = await post(ROTAS.estabelecimento, newEstabData, token);
  if (r.ok) {
    r = await r.json();
    setToken(r.token);
    setNome(newEstabData.nome);
    setDesc(newEstabData.descricao);
    setEnd(newEstabData.endereco);
    setReload(true);
    Alert.alert("Estabelecimento criado com sucesso!");
    navigation.goBack();
  } else {
    r = await r.json();
    console.log(r);
    Alert.alert("Ocorreu um erro. Tente novamente.");
  }
}

//read estabelecimento único
export async function fetchEstabelecimento(estabContextData, tokenContextData) {
  const { id, setNome, setDesc, setEnd } = estabContextData;
  const { token, setToken } = tokenContextData;
  let r = await get(ROTAS.estabelecimentoId, id, token);
  if (r.ok) {
    r = await r.json();
    setToken(r.token);
    //console.log("=== token retornado fetchEstabelecimento ===");
    //console.log(r.token);
    r = r.estabelecimento; //sugerir mudança no retorno e não precisar de selecionar objeto estabelecimento da requisição
    setNome(r.nome);
    setDesc(r.descricao);
    setEnd(r.endereco);
  }
}

//read todos os estabelecimentos
export async function getEstabelecimentos(tokenContextData, setEstabArray) {
  const { token, setToken } = tokenContextData;
  let r = await get(ROTAS.estabelecimento, "", token);
  if (r.ok) {
    r = await r.json();
    //console.log("retorno getEstabelecimentos");
    //console.log(r);
    setToken(r.token);
    setEstabArray(r.estabelecimento);
  }
}

//update
export async function updateEstabelecimento(newEstabData, estabContextData, tokenContextData, navigation) {
  const { id, setNome, setDesc, setEnd, setReload } = estabContextData;
  const { token, setToken } = tokenContextData;

  console.log("-- id do estabelecimento -- : " + id);

  let r = await put(ROTAS.estabelecimentoId + id, getParams("estabelecimento", newEstabData), token);
  if (r.ok) {
    r = await r.json();
    setToken(r.token);
    setNome(newEstabData.nome);
    setDesc(newEstabData.descricao);
    setEnd(newEstabData.endereco);
    setReload(true);
    Alert.alert("Dados atualizados com sucesso!");
    navigation.goBack();
  } else {
    r = await r.json();
    console.log(r);
    Alert.alert("Ocorreu um erro. Tente novamente.");
  }
}

/*
--------------------------------------------------------------
| Procedimentos e funções relacionadas ao CRUD de Categorias |
--------------------------------------------------------------
*/

//create
//EDITAR ESSE MÉTODO PARA TRABALHAR SEM CONTEXTO PRÓPRIO DAS CATEGORIAS
export async function createCategoria(newCatData, tokenContextData, navigation, setReload) {
  //const { pushCatData, setReload } = catContextData;
  const { token, setToken } = tokenContextData;

  let r = await post(ROTAS.categoria, newCatData, token);
  if (r.ok) {
    r = await r.json();
    setToken(r.token);
    setReload(true);
    Alert.alert("Categoria criada com sucesso!");
    navigation.goBack();
  } else {
    r = await r.json();
    console.log(r);
    Alert.alert("Ocorreu um erro. Tente novamente.");
  }
}

//--> está retornando o arranjo <--
//read todas as categorias
export async function getCategorias(estabId, token, setToken) {
  //const { token, setToken } = tokenContextData;
  let r = await get(ROTAS.categoria, "?estabelecimento_id=" + estabId, token);
  if (r.ok) {
    r = await r.json();
    setToken(r.token);
    return { categorias: r.categorias, token: r.token };
  } else {
    console.log("erro getCategorias");
    r = await r.json();
    console.log(r);
  }
}

//read categoria única

//update
//EDITAR ESSE MÉTODO PARA TRABALHAR SEM CONTEXTO PRÓPRIO DAS CATEGORIAS
//atualmente editando este método para permitir edição de categorias
export async function updateCategoria(newCatData, tokenContextData, navigation, setReload) {
  //const { setReload } = catContextData;
  const { token, setToken } = tokenContextData;
  let r = await put(ROTAS.categoriaId + newCatData.id, getParams("categoria", newCatData), token);
  if (r.ok) {
    r = await r.json();
    setToken(r.token);
    setReload(true);
    Alert.alert("Categoria atualizada com sucesso!");
    navigation.goBack();
  } else {
    r = await r.json();
    console.log(r);
    Alert.alert("Ocorreu um erro. Tente novamente.");
  }
}

//delete
export async function deleteCategoria(catId, tokenContextData, setReload) {
  const { token, setToken } = tokenContextData;
  let r = await del(ROTAS.categoriaId + catId, "", token);
  if (r.ok) {
    r = await r.json();
    setToken(r.token);
    setReload(true);
    Alert.alert("Categoria excluída com sucesso!");
  } else {
    r = await r.json();
    console.log(r);
    Alert.alert("Ocorreu um erro. Tente novamente.");
  }
  return r;
}

/*
------------------------------------------------------------
| Procedimentos e funções relacionadas ao CRUD de Produtos |
------------------------------------------------------------
*/

//create
//tentando sem usar contexto exclusivo para produto. Passando arranjo como argumento ao invés disso
export async function createProduto(prodArray, newProdData, catContextData, tokenContextData, navigation) {
  const { setReload } = catContextData;
  const { token, setToken } = tokenContextData;

  let r = await post(ROTAS.produto, newProdData, token);
  if (r.ok) {
    r = await r.json();
    setToken(r.token);
    //pushCatData(newCatData);
    prodArray.push(newProdData);
    setReload(true);
    Alert.alert("Produto criado com sucesso!");
    navigation.goBack();
  } else {
    r = await r.json();
    console.log(r);
    Alert.alert("Ocorreu um erro. Tente novamente.");
  }
}

//read todas os produtos
export async function getProdutos(estabId, token, setToken) {
  //const { token, setToken } = tokenContextData;
  let r = await get(ROTAS.produto, "?estabelecimento_id=" + estabId, token);
  if (r.ok) {
    r = await r.json();
    setToken(r.token);
    return { produtos: r.produtos, token: r.token };

  } else {
    console.log("erro getProdutos");
    r = await r.json();
    console.log(r);
  }
}

//delete
export async function deleteProduto(prodId, tokenContextData, setReload) {
  const { token, setToken } = tokenContextData;
  let r = await del(ROTAS.produtoId + prodId, "", token);
  if (r.ok) {
    r = await r.json();
    setToken(r.token);
    setReload(true);
    Alert.alert("Produto excluído com sucesso!");
  } else {
    r = await r.json();
    console.log(r);
    Alert.alert("Ocorreu um erro. Tente novamente.");
  }
  return r;
}