import { getBody } from './utils';
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
  const url = URL_API + (typeof token != "undefined" ? "?jwt=" + token : "") + route + params;
  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' }
  });
  return response.json();
}

export async function login(email, pw, navigation, setToken) {
  let response = await post(ROTAS.login, getBody("login", [email, pw]));
  if (response.ok === true) {
    response = await response.json();
    setToken(response.token);
    console.log("método LOGIN ---- passou setToken");
    navigation.navigate("bottomNav");
  } else {
    Alert.alert("E-mail ou senha inválidos.");
  }
}

export async function atualizarEstabelecimento(nome, desc, end, setToken) {
  console.log("função atualizarEstabelecimento");
}