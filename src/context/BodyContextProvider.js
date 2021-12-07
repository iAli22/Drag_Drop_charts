import React, { createContext, useState } from "react";
export const Store = createContext({
  store: {
    dimension: "",
    measure: "",
  },
  setStore: () => {},
});

function BodyContextProvider({ children }) {
  const [store, setStore] = useState({
    dimension: "",
    measure: "",
  });
  const value = { store, setStore };

  return <Store.Provider value={value}>{children}</Store.Provider>;
}

export default BodyContextProvider;
