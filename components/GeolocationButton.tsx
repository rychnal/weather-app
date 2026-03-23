'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGeolocation } from '@/hooks/useGeolocation';

export default function GeolocationButton() {
  const router = useRouter();
  const { location, loading, locate } = useGeolocation();

  useEffect(() => {
    if (location) {
      router.push(`/?lat=${location.lat}&lon=${location.lon}&city=${encodeURIComponent('Moje poloha')}`);
    }
  }, [location]);

  return (
    <button
      onClick={locate}
      disabled={loading}
      className="rounded-xl border border-sky-200 bg-white px-4 py-3 text-gray-500 shadow-sm hover:bg-sky-50 disabled:opacity-50"
      title="Použít moji polohu"
    >
      {loading ? '...' : '📍'}
    </button>
  );
}
