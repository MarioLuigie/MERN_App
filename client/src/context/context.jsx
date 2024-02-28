import { createContext, useContext, useState } from "react";

const Context = createContext();

export const useAppContext = () => useContext(Context);

export const ContextProvider = ({ children }) => {

  const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('profile')));

  const [currentLocation, setCurrentLocation ] = useState("");
  const [currentId, setCurrentId] = useState(null);
  const [navbarHeight, setNavbarHeight ] = useState(0);

  const [ isCreateFormOpen, setIsCreateFormOpen ] = useState(false);
  const [ isSearchFormOpen, setIsSearchFormOpen ] = useState(false);

  const handleOpenForm = (setState) => () => {
    setState(true);
  };

  const handleCloseForm = (setState) => () => {
    setState(false);
  };

  return (
    <Context.Provider value={{ 
      user, 
      setUser, 
      currentLocation, 
      setCurrentLocation,
      currentId,
      setCurrentId,
      navbarHeight,
      setNavbarHeight,
      isCreateFormOpen, 
      setIsCreateFormOpen, 
      isSearchFormOpen, 
      setIsSearchFormOpen,
      handleOpenForm,
      handleCloseForm
      }}
    >
      {children}
    </Context.Provider>
  )
}