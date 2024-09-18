import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react'; 

// Definiera typen för context-värdet
interface FavoritesContextType {
  favorites: string[];
  setFavorites: Dispatch<SetStateAction<string[]>>;
  removeFavorite: (name: string) => void;  // Lägg till removeFavorite här
}

// Skapa context med korrekt typning
export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Definiera typen för props som FavoritesProvider accepterar
interface FavoritesProviderProps {
  children: ReactNode;
}

// FavoritesProvider-komponenten
export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Funktion för att ta bort en favorit
  const removeFavorite = (name: string) => {
    setFavorites((prevFavorites) => prevFavorites.filter(fav => fav !== name));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook för att använda FavoritesContext
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  
  return context; // Returnerar både favorites, setFavorites och removeFavorite
};

