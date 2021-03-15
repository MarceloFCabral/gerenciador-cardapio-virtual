import React from 'react';

export const EstabelecimentoContext = React.createContext();

export const EstabelecimentoProvider = ({ children }) => {
  const [id, setId] = React.useState(1); //passando um para os testes da API
  const [nome, setNome] = React.useState('');
  const [descricao, setDesc] = React.useState('');
  const [endereco, setEnd] = React.useState('');

  return (
    <EstabelecimentoContext.Provider 
      value={{ id, setId, nome, setNome, descricao, setDesc, endereco, setEnd }}
    >
      {children}
    </EstabelecimentoContext.Provider>
  );
};