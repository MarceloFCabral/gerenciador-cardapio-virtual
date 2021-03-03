import { getBody } from './utils';
import { Alert } from "react-native";


//URL e rotas
const URL_API = "localhost/cardapio-virtual-api/public/api";
export const ROTAS = {
  registro: "/register",
  login: "/login",
  estabelecimento: "/estabelecimento",
  estabelecimentoId: "/estabelecimento/"
}

export async function post(route, body, token) {
  //let header = { Accept: 'application/json', 'Content-Type': 'application/json' };
  console.log("tipo da variável 'token'");
  console.log(token);
  if (typeof token != "undefined") headers['Authorization'] = 'Bearer ' + token;

  console.log("-- rota da API sendo acessada --");
  console.log(URL_API + route);

  const response = await fetch(URL_API + route, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    //body: JSON.stringify(body)
    body: JSON.stringify({ //passando manualmente temporariamente para tentar resolver o erro
      email: "teste@gmail.com",
      password: "1234"
    })
  });
  console.log("-- response do método post --");
  console.log(response);
  return response.json();
}

export async function get(route, params, token) {
  const url = URL_API + (typeof token != "undefined" ? "?jwt=" + token : "") + route + params;
  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  return response.json();
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
  let response = null;
  try {
    response = await post(ROTAS.login, getBody("login", [email, pw]));
  } catch (e) {
    console.log("Promise rejeitada no login.");
    console.log(e);
  }
  if (response !== null && response.ok === true) {
    setToken(response.token);
    navigation.navigate("bottomNav");
  } else {
    Alert.alert("E-mail ou senha inválidos.");
  }
}