import { createContext, useContext, useState } from "react";

const Context = createContext();

export const useAppContext = () => useContext(Context);

export const ContextProvider = ({ children }) => {
  const [ user, setUser ] = useState(null);

  return (
    <Context.Provider value={{ user, setUser }}>
      {children}
    </Context.Provider>
  )
}