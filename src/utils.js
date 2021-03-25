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
import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { Categoria, Produto } from './components/ui/Ui';


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

//testar essa função.
export const pickerArrRender = arr => arr.map(v => <Picker.Item label={v.nome} value={v.id} key={v.id} />);

//obter produtos associados a uma determinada categoria
//verificar pq está dando falha ao tentar cadastrar produtos usando a API
const getCatProdutos = (categoria_id, prodArr) => {
  let len = prodArr.length;
  let prodFilhoArr = [];
  for (let i = 0; i < len; i++) {
    if (prodArr[i].categoria_id == categoria_id) {
      let prod = prodArr[i];
      prodFilhoArr.push(
        <Produto 
          title={prod.nome}
          desc={prod.descricao}
          val={prod.valor}
          //função indefinida
        />
      );
    }
  }
  return prodFilhoArr;
}

//renderizar categorias e produtos
//mudar retorno das categorias e produtos pra isso ser mais eficiente (evitar busca sequencial)
export const categoriasRender = (catArr, prodArr) => {
  console.log("entrou no categoriasRender");
  let len = catArr.length;
  let catPaisArr = [];
  for (let i = 0; i < len; i++) {
    let catPai = catArr[i];
    let filhosArr = [];
    filhosArr = [...getCatProdutos(catPai.id, prodArr)];
    if (catPai.categoria_pai_id == null) {
      //let catFilhosArr = [];
      for (let j = 0; j < len; j++) {
        let cat = catArr[j];
        if (cat.categoria_pai_id == catPai.id) {
          filhosArr.push(
            <Categoria
              key={cat.id}
              title={cat.nome}
              desc={cat.descricao}
              exp={false} 
              //funções indefinidas
            />
          );
        }
      }
      catPaisArr.push(
        <Categoria 
          key={catPai.id}
          title={catPai.nome}
          desc={catPai.descricao}
          exp={false}
          children={filhosArr}
        />
      );
    }
  }

  return catPaisArr;
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