import { createContext, useContext, useState } from "react";

const Context = createContext();

export const useAppContext = () => useContext(Context);

export const ContextProvider = ({ children }) => {

  const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('profile')));
<<<<<<< HEAD

=======
  
>>>>>>> 12_CreateAppReducer
  const [currentLocation, setCurrentLocation ] = useState("");
  const [currentId, setCurrentId] = useState(null);
  const [navbarHeight, setNavbarHeight ] = useState(0);
  
  return (
    <Context.Provider value={{ 
      user, 
      setUser, 
      currentLocation, 
      setCurrentLocation,
      currentId,
      setCurrentId,
      navbarHeight,
      setNavbarHeight
      }}
    >
      {children}
    </Context.Provider>
  )
}