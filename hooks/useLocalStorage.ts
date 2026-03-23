import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [state, set] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored) set(JSON.parse(stored));
    } catch {
      // storage unavailable (SSR, incognito) – keeps initialValue
    }
  }, []);

  function setValue(value: T) {
    set(value);
    localStorage.setItem(key, JSON.stringify(value));
  }

  return [state, setValue];
}
