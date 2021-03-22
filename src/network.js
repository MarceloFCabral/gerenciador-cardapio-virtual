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
  categoriaId: "/categoria/"
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

export async function put(route, params, token) {
  const url = URL_API + route + params;
  let headers = { Accept: 'application/json', 'Content-Type': 'application/json' };
  if (typeof token != "undefined") headers['Authorization'] = 'Bearer ' + token;
  return fetch(url, {
    method: 'PUT',
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
    console.log("método LOGIN ---- passou setToken");
    navigation.navigate("bottomNav");
  } else {
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
    console.log("=== token retornado fetchEstabelecimento ===");
    console.log(r.token);
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
    console.log("retorno getEstabelecimentos");
    console.log(r);
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
export async function createCategoria(newCatData, catContextData, tokenContextData, navigation) { //idx do arranjo e estabelecimento_id passados em newCatData
  const { pushCatData, setReload } = catContextData;
  const { token, setToken } = tokenContextData;

  let r = await post(ROTAS.categoria, newCatData, token);
  if (r.ok) {
    r = await r.json();
    setToken(r.token);
    pushCatData(newCatData);
    setReload(true);
    Alert.alert("Categoria criada com sucesso!");
    navigation.goBack();
  } else {
    r = await r.json();
    console.log(r);
    Alert.alert("Ocorreu um erro. Tente novamente.");
  }
}

//read

//update
export async function updateCategoria(newCatData, categoria, catContextData, tokenContextData, navigation) {
  const { setReload } = catContextData;
  const { token, setToken } = tokenContextData;
  let r = await put(ROTAS.categoriaId + categoria.id, getParams("categoria", newCatData), token);
  if (r.ok) {
    r = await r.json();
    setToken(r.token);
    categoria = { ...newCatData };
    setReload(true);
    Alert.alert("Categoria atualizada com sucesso!");
    navigation.goBack();
  } else {
    r = await r.json();
    console.log(r);
    Alert.alert("Ocorreu um erro. Tente novamente.");
  }
}