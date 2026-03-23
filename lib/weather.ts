export interface WeatherData {
  temperature: number;
  windspeed: number;
  weathercode: number;
  time: string;
}

export interface ForecastDay {
  date: string;
  tempMax: number;
  tempMin: number;
  weathercode: number;
  precipitation: number;
}

export async function getCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`,
    { next: { revalidate: 1800 } }
  );
  if (!res.ok) throw new Error('Nepodařilo se načíst počasí');
  const data = await res.json();
  return data.current_weather;
}

export async function getForecast(lat: number, lon: number): Promise<ForecastDay[]> {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_sum` +
    `&timezone=Europe/Prague`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('Nepodařilo se načíst předpověď');
  const data = await res.json();
  return data.daily.time.map((date: string, i: number) => ({
    date,
    tempMax: data.daily.temperature_2m_max[i],
    tempMin: data.daily.temperature_2m_min[i],
    weathercode: data.daily.weathercode[i],
    precipitation: data.daily.precipitation_sum[i],
  }));
}

export interface HourlyData {
  time: string;
  temperature: number;
  weathercode: number;
  precipitationProbability: number;
}

export async function getHourlyForecast(lat: number, lon: number): Promise<HourlyData[]> {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&hourly=temperature_2m,weathercode,precipitation_probability` +
    `&timezone=Europe/Prague&forecast_days=1`,
    { next: { revalidate: 1800 } }
  );
  if (!res.ok) throw new Error('Nepodařilo se načíst hodinovou předpověď');
  const data = await res.json();
  return data.hourly.time.map((time: string, i: number) => ({
    time,
    temperature: data.hourly.temperature_2m[i],
    weathercode: data.hourly.weathercode[i],
    precipitationProbability: data.hourly.precipitation_probability[i],
  }));
}

export function getWeatherDescription(code: number): { icon: string; label: string } {
  if (code === 0)          return { icon: '☀️', label: 'Jasno' };
  if (code <= 3)           return { icon: '⛅', label: 'Polojasno' };
  if (code <= 48)          return { icon: '🌫️', label: 'Mlha' };
  if (code <= 67)          return { icon: '🌧️', label: 'Déšť' };
  if (code <= 77)          return { icon: '❄️', label: 'Sníh' };
  if (code <= 82)          return { icon: '🌦️', label: 'Přeháňky' };
  return                          { icon: '⛈️', label: 'Bouřka' };
}