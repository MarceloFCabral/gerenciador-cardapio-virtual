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

export async function post(route, body, token) {
  let response = {};
  let headers = { Accept: 'application/json', 'Content-Type': 'application/json' };
  if (typeof token != "undefined") headers['Authorization'] = 'Bearer ' + token;
  try {
    response = await fetch(URL_API + route, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });
    return response;
  } catch(e) {
    console.log("Promise rejeitada em POST. Erro:")
    console.log(e);
  }
}

export async function get(route, params, token) {
  const url = URL_API + (typeof token != "undefined" ? "?jwt=" + token : "") + route + params;
  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  return response;
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
  //const response = await post(ROTAS.login, getBody("login", [email, pw]));
  post(ROTAS.login, getBody("login", [email, pw])).then(response => {
    if (response.ok === true) {
      console.log("======= response na função login =======");
      console.log(response.json());
      navigation.navigate("bottomNav", { token: (response.json()).token });
    } else {
      Alert.alert("E-mail ou senha inválidos.");
    }
  });
}