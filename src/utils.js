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
import { deleteCategoria, deleteProduto } from './network';

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

    //adequar
    case "categoria":
      keys = ["nome", "descricao", "categoria_pai_id", "estabelecimento_id"];
      break;
    
    //adequar
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
const produtosRender = (idsArr, prodObj, handleEditProd, handleDelProd) => idsArr.map(
  id => {
    let p = prodObj[id];
    return <Produto 
      key={id}
      title={p.nome}
      desc={p.descricao}
      val={p.valor}
      onPressEdit={() => handleEditProd(id)}
      onPressDelete={() => handleDelProd(id)} 
    />;
  }
);
/*
//deletar produtos
const produtosDelete = (idsArr, prodObj, tokenContextData) => idsArr.map(id => deleteProduto(id,));
*/
/*
1 arranjo de filhos para cada categoriaPai
*/

export const categoriasRender = (catObj, prodObj, handlers) => {
  let catArr = [];
  let renderedArr = [];
  for (id in catObj) {
    catArr.push(recCategoriasRender({ cat: catObj[id], idCatPai: id }, catObj, prodObj, handlers, renderedArr));
  }
  return catArr;
}

const recCategoriasRender = (catAndId, catObj, prodObj, handlers, renderedArr) => {
  const { cat, idCatPai } = catAndId;
  //console.log("categoriasRender - produtos_filhos =", cat.produtos_filhos);
  //let pChildren = produtosRender(cat.produtos_filhos, prodObj, handlers.handleEditProd, handlers.handleDelProd);
  if (renderedArr[idCatPai] != 'x') {
    let pChildren = produtosRender(cat.produtos_filhos, prodObj, handlers.handleEditProd, handlers.handleDelProd);
    if (cat.categorias_filhas.length != 0) {
      let cChildren = cat.categorias_filhas.map(
        id => {
          let catF = recCategoriasRender({ cat: catObj[id], id }, catObj, prodObj, handlers, renderedArr);
          //delete catObj[id]; //obrigatório refazer requisição para obter categorias atualizadas, pois o delete "deforma" o retorno original
          return catF;
        }
      );
      console.log("categoria_pai_id =", cat.categoria_pai_id);
      renderedArr[idCatPai] = 'x';
      return <Categoria 
        key={id}
        title={cat.nome}
        desc={cat.descricao}
        children={[ ...pChildren, ...cChildren ]}
        onPressAdd={() => handlers.handleAdd(id)}
        onPressEdit={() => handlers.handleEditCat(cat, id)}
        onPressDelete={() => handlers.handleDelCat(id)}
      />
    } else {
      renderedArr[idCatPai] = 'x';
      return <Categoria 
        key={id}
        title={cat.nome}
        desc={cat.descricao}
        children={pChildren}
        onPressAdd={() => handlers.handleAdd(id)}
        onPressEdit={() => handlers.handleEditCat(cat, id)}
        onPressDelete={() => handlers.handleDelCat(id)}
      />
    }
  }
}
/*
//deletar categoria, suas categorias filhas e seus produtos filhos recursivamente
export const categoriasDelete = (id, catObj, prodObj) => {
  //let c = catObj[id];
  for (id in catObj) {
    let c = catObj[id];

  }
}
*/
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