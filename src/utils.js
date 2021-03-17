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

const binarySearchId = (id, list) => {
  let first = 0;
  let last = list.length - 1;
  let position = -1;
  let found = false;
  let middle;

  while (found === false && first <= last) {
    middle = Math.floor((first + last)/2);
    if (list[middle].id == id) {
      found = true;
      position = middle;
    } else if (list[middle].id > id) {
      last = middle - 1;
    } else {
      first = middle + 1;
    }
  }
  return position;
}


//retorna false se arranjos contendo objetos com dados da API são diferentes, true caso contrário
export function equalsObjArr(a, b) {
  for (o in a)
    if (binarySearchId(o.id, b) == -1) return false;
    
  return true;
}