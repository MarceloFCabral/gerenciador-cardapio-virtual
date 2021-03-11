import React from 'react';

export const EstabelecimentoContext = React.createContext();

export const EstabelecimentoProvider = ({ children }) => {
  const [nome, setNome] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [end, setEnd] = React.useState('');

  return (
    <EstabelecimentoContext.Provider 
      value={{ nome, setNome, desc, setDesc, end, setEnd }}
    >
      {children}
    </EstabelecimentoContext.Provider>
  );
};