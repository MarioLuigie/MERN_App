import { createContext, useContext, useState } from "react";

const Context = createContext();

export const useAppContext = () => useContext(Context);

export const ContextProvider = ({ children }) => {

  const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('profile')));

  const [navbarHeight, setNavbarHeight ] = useState(0);
  
  return (
    <Context.Provider value={{ 
      user, 
      setUser, 
      navbarHeight,
      setNavbarHeight
      }}
    >
      {children}
    </Context.Provider>
  )
}