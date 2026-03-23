'use client';

import { useTheme } from '@/context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="rounded-xl border border-sky-200 bg-white dark:bg-zinc-800 dark:border-zinc-700 px-4 py-3 text-gray-500 dark:text-zinc-400 shadow-sm hover:bg-sky-50 dark:hover:bg-zinc-700"
      title="Přepnout téma"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
