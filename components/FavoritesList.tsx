'use client';

import { useFavorites } from '@/context/FavoritesContext';
import Link from 'next/link';

export default function FavoritesList() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) return null;

  return (
    <div className="flex gap-2 flex-wrap">
      {favorites.map(f => (
        <Link
          key={f.name}
          href={`/?lat=${f.lat}&lon=${f.lon}&city=${encodeURIComponent(f.name)}`}
          prefetch={false}
          className="rounded-full bg-white border border-sky-200 px-3 py-1 text-sm text-sky-700 hover:bg-sky-50"
        >
          ♥ {f.name}
        </Link>
      ))}
    </div>
  );
}
