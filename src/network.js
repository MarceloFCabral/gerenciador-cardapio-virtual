import { getBody } from './utils';
import { Alert } from "react-native";


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
  const url = URL_API + (typeof token != "undefined" ? "?jwt=" + token : "") + route + params;
  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' }
  });
  return response.json();
}

export async function login(email, pw, navigation) {
  let response = await post(ROTAS.login, getBody("login", [email, pw]));
  if (response.ok === true) {
    response = await response.json();
    navigation.navigate("bottomNav", { token: response.token });
  } else {
    Alert.alert("E-mail ou senha inválidos.");
  }
}
/*
export async function fetchEstabelecimento(id) {

  let r = await get(ROTAS.estabelecimentoId, id, token);
  if (r.ok) {
    console.log("=========== response está ok ===========");
    r = await r.json();
    console.log(r);
    r = r.estabelecimento; //sugerir mudança no retorno e não precisar de selecionar objeto estabelecimento da requisição
    console.log("-- nome --");
    console.log(r["nome"]);
    console.log("-- token --");
    console.log(r["token"]);
    console.log("-- descricao --");
    console.log(r["descricao"]);
    console.log("-- endereço --");
    console.log(r["endereco"]);
    setToken(r.token);
    setNome(r.nome);
    setDesc(r.descricao);
    setEnd(r.endereco);
  } else {
    console.log("response not ok @ Estabelecimento");
    r = await r.json();
    console.log(r);
  }
}
*/