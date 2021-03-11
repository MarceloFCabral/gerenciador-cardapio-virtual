import React from 'react';

export const TokenContext = React.createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = React.useState('');

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};