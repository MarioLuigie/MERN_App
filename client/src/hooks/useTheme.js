import { useState, useEffect } from "react";

const useTheme = () => {

  const [ isDarkMode, setIsDarkMode ] = useState(false);

  useEffect(() => {

    const storedTheme = localStorage.getItem('theme');
    
    if (storedTheme) {
      setIsDarkMode(JSON.parse(storedTheme));
    }

  }, []);

  useEffect(() => {

    localStorage.setItem('theme', JSON.stringify(isDarkMode));

  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  }

  return { isDarkMode, toggleTheme };

}

export default useTheme;