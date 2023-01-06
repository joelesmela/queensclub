import { useContext, createContext } from 'react';

export const ShuffleContext = createContext();
export const useShuffle = () => {
  const context = useContext(ShuffleContext);
  return context;
};

export const ShuffleProvider = ({ children }) => {
  const shuffleArray = (inputArray) => {
    inputArray.sort(() => Math.random() - 0.5);
  };

  return (
    <ShuffleContext.Provider value={{
      shuffleArray,
    }}>
      { children }
    </ShuffleContext.Provider>
  );
};
