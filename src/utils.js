/*
-- POST -- (exige body)
  - usuário -
    * register
    * login

  - estabelecimento -
    * criar estabelecimento
  
  - categoria -
    * criar categoria

  - produto -
    * criar produto
*/

function getKeys(reqType) {
  let keys = null;
  switch(reqType) {
    case "usuarioLogin":
      keys = ["email", "password"];
      break;

    case "usuarioRegister":
      keys = ["name", "email", "password", "password_confirmation"];
      break;
    
    case "estabelecimento":
      keys = ["nome", "descricao", "endereco"];
      break;

    case "categoria":
      keys = ["nome", "descricao", "categoria_pai_id", "estabelecimento_id"];
      break;
    
    case "produto":
      keys = ["nome", "descricao", "valor", "categoria_id"];
      break;
    
    default:
      console.log("reqType não é válido!");
  }

  return keys;
}
/*
export function getBody(bodyType, data) { //para métodos POST
  let keys = getKeys(bodyType);
  let body = {};

  if (keys !== null) {
    data.forEach((item, i) => {
      body[keys[i]] = item;
    });
  }

  return body;
}
*/
export function getParams(paramsType, data) {
  let keys = getKeys(paramsType);
  let params = "?";

  if (keys !== null) {
    keys.forEach((item, i) => {
      params += item + "=" + data[item];
      if (i != keys.length - 1) params += "&";
    });
  }

  console.log("== getParams: retorno da funcao ==");
  console.log(params);

  return params;
}