import  { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [toasts, setToast] = useState([]); 
  const [timerId, setTimerId] = useState(null); // Estado para almacenar el ID del temporizador

  const toastViewed = () => {
    if (timerId) {
      clearTimeout(timerId);
    }


    const newTimerId = setTimeout(() => {
      setToast([]);
    }, 3500);

    setTimerId(newTimerId);
  };

  return (
    <GlobalContext.Provider value={{ toasts, setToast, toastViewed }}>
      {children}
    </GlobalContext.Provider>
  );
};
