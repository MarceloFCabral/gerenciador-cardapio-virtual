export function getBody(bodyType, data) { //para métodos POST
  let keys = null;
  //let body = new FormData();
  let body = {};
  switch(bodyType) {
    case "login":
      keys = ["email", "password"];
      break;

    case "register":
      keys = ["name", "email", "password", "password_confirmation"];
      break;

    case "criarEstabelecimento":
      keys = ["nome", "descricao", "endereco"];
      break;

    case "atualizarEstabelecimento":
      keys = ["nome", "descricao", "endereco"];
      break;

    case "criarCategoria":
      keys = ["nome", "descricao", "categoria_pai_id", "estabelecimento_id"];
      break;
    
    case "atualizarCategoria":
      keys = ["nome", "descricao", "categoria_pai_id", "estabelecimento_id"];
      break;
    
    default:
      console.log("bodyType não é válido!");
      break;
  }

  if (keys !== null) {
    data.forEach((item, i) => {
      body[keys[i]] = item;
    });
  }

  //console.log("-- body --");
  //console.log(body);

  return body;
}