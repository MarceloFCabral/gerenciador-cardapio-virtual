import React, { useContext } from 'react';
import { EstabelecimentoContext } from './EstabelecimentoContext';

export const CategoriasContext = React.createContext();

export const CategoriasProvider = ({ children }) => {
  const estabelecimento_id = useContext(EstabelecimentoContext).id;
  const [catArray, setCatArray] = React.useState([]);
  const [reload, setReload] = React.useState(true);
  /*
  const setCatData = (newCatData, idx) => {
    if (catArray.length >= idx + 1)
      catArray[idx] = newCatData;
  }
  */
  const pushCatData = newCatData => catArray.push(newCatData);

  return (
    <CategoriasContext.Provider
      value={{
        estabelecimento_id,
        catArray, setCatArray,
        reload, setReload,
        /*setCatData, */ pushCatData,
      }}
    >
      {children}
    </CategoriasContext.Provider>
  );
}