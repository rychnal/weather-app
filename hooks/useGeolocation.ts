import { useState, useEffect, useRef } from 'react';

interface Location {
  lat: number;
  lon: number;
}

interface GeolocationResult {
  location: Location | null;
  loading: boolean;
  error: string | null;
  locate: () => void;
}

export function useGeolocation(): GeolocationResult {
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => { mountedRef.current = false; };
  }, []);

  function locate() {
    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (!mountedRef.current) return;
        setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        setLoading(false);
      },
      (err) => {
        if (!mountedRef.current) return;
        setError(err.message);
        setLoading(false);
      }
    );
  }

  return { location, loading, error, locate };
}
