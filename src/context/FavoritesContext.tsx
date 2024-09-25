import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";
import { Cocktail } from "../interfaces";

interface FavoritesContextType {
  favorites: Cocktail[];
  setFavorites: Dispatch<SetStateAction<Cocktail[]>>;
  removeFavorite: (drinkName: string) => void;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<Cocktail[]>([]);

  const removeFavorite = (drinkName: string) => {
    setFavorites(favorites.filter((drink) => drink.name !== drinkName));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }

  return context;
};
