'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { searchCities, City } from '@/lib/geocoding';
import { useDebounce } from '@/hooks/useDebounce';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<City[]>([]);
  const router = useRouter();
  const skipNextSearch = useRef(false);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (skipNextSearch.current) { skipNextSearch.current = false; return; }
    if (debouncedQuery.length < 2) { setResults([]); return; }
    searchCities(debouncedQuery).then(setResults);
  }, [debouncedQuery]);

  function select(city: City) {
    skipNextSearch.current = true;
    setQuery(city.name);
    setResults([]);
    router.push(`/?lat=${city.lat}&lon=${city.lon}&city=${encodeURIComponent(city.name)}`);
  }

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Hledat město..."
        className="w-full rounded-xl border border-sky-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 text-gray-800 dark:text-zinc-200 shadow-sm outline-none focus:ring-2 focus:ring-sky-400 dark:placeholder:text-zinc-500"
      />
      {results.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full rounded-xl border border-gray-100 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-lg">
          {results.map((city) => (
            <li
              key={`${city.lat}-${city.lon}`}
              onClick={() => select(city)}
              className="cursor-pointer px-4 py-3 text-sm text-gray-700 dark:text-zinc-300 hover:bg-sky-50 dark:hover:bg-zinc-700 first:rounded-t-xl last:rounded-b-xl"
            >
              {city.name}
              <span className="ml-2 text-gray-400 dark:text-zinc-500">{city.country}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
