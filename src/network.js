import { getParams } from './utils';
import { Alert } from "react-native";
//import { useContext } from 'react';
//import { TokenContext } from './components/context/TokenContext';
//import { EstabelecimentoContext } from './components/context/EstabelecimentoContext';

//URL e rotas
const URL_API = "http://192.168.1.106/cardapio-virtual-api/public/api";
export const ROTAS = {
  registro: "/register",
  login: "/login",
  estabelecimento: "/estabelecimento",
  estabelecimentoId: "/estabelecimento/"
}


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

export async function login(userData, navigation, setToken) { //userData = objeto js com chaves user e password -> obrigatório
  let r = await post(ROTAS.login, userData);
  if (r.ok === true) {
    r = await r.json();
    setToken(r.token);
    console.log("método LOGIN ---- passou setToken");
    navigation.navigate("bottomNav");
  } else {
    Alert.alert("E-mail ou senha inválidos.");
  }
}

export async function updateEstabelecimento(newEstabData, estabContextData, tokenContextData, navigation) {
  const { setNome, setDesc, setEnd } = estabContextData;
  const { token, setToken } = tokenContextData;

  console.log("-- id do estabelecimento -- : " + estabContextData.id);

  let r = await put(ROTAS.estabelecimentoId + estabContextData.id, getParams("estabelecimento", newEstabData), token);
  if (r.ok === true) {
    r = await r.json();
    setToken(r.token);
    setNome(newEstabData.nome);
    setDesc(newEstabData.descricao);
    setEnd(newEstabData.endereco);
    Alert.alert("Dados atualizados com sucesso!");
    navigation.goBack();
  } else {
    r = await r.json();
    console.log(r);
    Alert.alert("Ocorreu um erro. Tente novamente.");
  }
}