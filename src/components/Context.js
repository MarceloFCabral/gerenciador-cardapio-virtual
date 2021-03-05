import React from 'react';

const Context = React.createContext({
  token: "default",
  setToken: () => {}
});

export default Context;