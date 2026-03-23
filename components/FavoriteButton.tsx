'use client';

import { useFavorites } from '@/context/FavoritesContext';

interface Props {
  city: {
    name: string;
    lat: number;
    lon: number;
    country?: string;
  };
}

export default function FavoriteButton({ city }: Props) {
  const { favorites, toggleFavorite } = useFavorites();
 
  const isFavorite = favorites.some(f => f.name === city.name);

  function toggle() {
    toggleFavorite(city)
  }

  return (
    <button
      onClick={toggle}
      className="text-2xl transition-transform hover:scale-110 text-rose-400 hover:text-rose-500"
      title={isFavorite ? 'Odebrat z oblíbených' : 'Přidat do oblíbených'}
    >
      {isFavorite ? '♥' : '♡'}
    </button>
  );
}
