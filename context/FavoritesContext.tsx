'use client';

import { createContext, useContext } from 'react';

import { City } from '@/lib/geocoding';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface FavoritesContextType {
  favorites: City[];
  toggleFavorite: (city: City) => void;
}


const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useLocalStorage<City[]>('favorites', []);

  function toggleFavorite(city: City) {
    if (favorites.some(f => f.name === city.name)) {
      setFavorites(favorites.filter(f => f.name !== city.name));
    } else {
      setFavorites([...favorites, city]);
    }
  }


  return <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>{children}</FavoritesContext.Provider>;
}

export function useFavorites(): FavoritesContextType {

  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
}
