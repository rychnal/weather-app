export interface City {
  name: string;
  lat: number;
  lon: number;
  country?: string;
}

export async function searchCities(query: string): Promise<City[]> {
  if (!query || query.length < 2) return [];
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=cs`
  );
  const data = await res.json();
  return (data.results || []).map((r: any) => ({
    name: r.name,
    lat: r.latitude,
    lon: r.longitude,
    country: r.country,
  }));
}
