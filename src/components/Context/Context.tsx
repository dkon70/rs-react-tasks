import { useState, useContext, createContext } from 'react';
import { AppContextType, AppProviderProps, Data } from '../types/Types';

const AppContext = createContext<AppContextType | null>(null);

const AppProvider = ({ children }: AppProviderProps) => {
  const [inputContext, setInputContext] = useState('');
  const [dataContext, setDataContext] = useState<Data>({ products: [] });

  return (
    <AppContext.Provider
      value={{ inputContext, setInputContext, dataContext, setDataContext }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error();
  }
  return context;
};

export { AppProvider, useAppContext };
