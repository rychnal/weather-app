import FavoriteButton from '@/components/FavoriteButton';
import FavoritesList from '@/components/FavoritesList';
import ForecastChart from '@/components/ForecastChart';
import GeolocationButton from '@/components/GeolocationButton';
import HourlyForecast from '@/components/HourlyForecast';
import SearchBar from '@/components/SearchBar';
import ThemeToggle from '@/components/ThemeToggle';
import { getCurrentWeather, getForecast, getHourlyForecast, getWeatherDescription } from '@/lib/weather';
import Link from 'next/link';
import { Suspense } from 'react';

const DEFAULT = { lat: 50.08, lon: 14.43, name: 'Praha' };

interface Props {
  searchParams: Promise<{ lat?: string; lon?: string; city?: string }>;
}

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;
  const lat = params.lat ? parseFloat(params.lat) : DEFAULT.lat;
  const lon = params.lon ? parseFloat(params.lon) : DEFAULT.lon;
  const cityName = params.city ?? DEFAULT.name;
  const key = `${lat}-${lon}`;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-100 dark:from-zinc-900 dark:to-zinc-800 p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-sky-900 dark:text-sky-300">Počasí</h1>

        <div className="flex gap-2">
          <div className="flex-1"><SearchBar /></div>
          <GeolocationButton />
          <ThemeToggle />
        </div>

        <FavoritesList />

        <Suspense key={key} fallback={<WeatherCardSkeleton />}>
          <WeatherSection lat={lat} lon={lon} cityName={cityName} />
        </Suspense>

        <Suspense key={`forecast-${key}`} fallback={<ForecastSkeleton />}>
          <ForecastSection lat={lat} lon={lon} cityName={cityName} />
        </Suspense>
      </div>
    </main>
  );
}

async function WeatherSection({ lat, lon, cityName }: { lat: number; lon: number; cityName: string }) {
  const current = await getCurrentWeather(lat, lon);
  const { icon, label } = getWeatherDescription(current.weathercode);

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow p-6 flex items-center gap-6">
      <span className="text-6xl">{icon}</span>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-xl font-medium text-gray-500 dark:text-zinc-400">{cityName}</p>
          <FavoriteButton city={{ name: cityName, lat, lon }} />
        </div>
        <p className="text-5xl font-bold text-sky-800 dark:text-sky-300">{Math.round(current.temperature)}°C</p>
        <p className="text-lg text-gray-500 dark:text-zinc-400">{label}</p>
        <p className="text-sm text-gray-400 dark:text-zinc-500">Vítr: {current.windspeed} km/h</p>
      </div>
    </div>
  );
}

async function ForecastSection({ lat, lon, cityName }: { lat: number; lon: number; cityName: string }) {
  const [forecast, hourlyForecast] = await Promise.all([
    getForecast(lat, lon),
    getHourlyForecast(lat, lon),
  ]);

  return (
    <>
      <HourlyForecast hours={hourlyForecast} />
      <ForecastChart hours={hourlyForecast} />

      <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-zinc-300">7denní předpověď</h2>
          <Link href={`/forecast/${encodeURIComponent(cityName)}`} className="text-sm text-sky-500 dark:text-sky-400 hover:underline">
            Detail →
          </Link>
        </div>
        <div className="space-y-2">
          {forecast.map((day) => {
            const d = getWeatherDescription(day.weathercode);
            return (
              <div key={day.date} className="flex items-center justify-between py-2 border-b dark:border-zinc-700 last:border-0">
                <span className="w-28 text-sm text-gray-600 dark:text-zinc-400">
                  {new Date(day.date).toLocaleDateString('cs-CZ', { weekday: 'short', day: 'numeric', month: 'numeric' })}
                </span>
                <span className="text-xl">{d.icon}</span>
                <span className="text-sm text-sky-600 dark:text-sky-400">{Math.round(day.tempMax)}°</span>
                <span className="text-sm text-gray-400 dark:text-zinc-500">{Math.round(day.tempMin)}°</span>
                <span className="text-xs text-blue-400">{day.precipitation} mm</span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

function WeatherCardSkeleton() {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow p-6 flex items-center gap-6">
      <div className="h-16 w-16 rounded-full bg-gray-200 dark:bg-zinc-700 animate-pulse" />
      <div className="space-y-2 flex-1">
        <div className="h-5 w-24 rounded bg-gray-200 dark:bg-zinc-700 animate-pulse" />
        <div className="h-12 w-32 rounded bg-gray-200 dark:bg-zinc-700 animate-pulse" />
        <div className="h-4 w-20 rounded bg-gray-100 dark:bg-zinc-700 animate-pulse" />
        <div className="h-4 w-28 rounded bg-gray-100 dark:bg-zinc-700 animate-pulse" />
      </div>
    </div>
  );
}

function ForecastSkeleton() {
  return (
    <>
      <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow p-6">
        <div className="h-5 w-40 rounded bg-gray-200 dark:bg-zinc-700 animate-pulse mb-4" />
        <div className="flex gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2 min-w-[56px]">
              <div className="h-3 w-8 rounded bg-gray-100 dark:bg-zinc-700 animate-pulse" />
              <div className="h-7 w-7 rounded bg-gray-100 dark:bg-zinc-700 animate-pulse" />
              <div className="h-4 w-6 rounded bg-gray-100 dark:bg-zinc-700 animate-pulse" />
              <div className="h-3 w-6 rounded bg-gray-100 dark:bg-zinc-700 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow p-6">
        <div className="h-5 w-36 rounded bg-gray-200 dark:bg-zinc-700 animate-pulse mb-4" />
        <div className="h-[220px] w-full rounded-lg bg-gray-100 dark:bg-zinc-700 animate-pulse" />
      </div>
      <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow p-6 space-y-3">
        <div className="h-5 w-36 rounded bg-gray-200 dark:bg-zinc-700 animate-pulse" />
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b dark:border-zinc-700 last:border-0">
            <div className="h-4 w-24 rounded bg-gray-100 dark:bg-zinc-700 animate-pulse" />
            <div className="h-6 w-6 rounded bg-gray-100 dark:bg-zinc-700 animate-pulse" />
            <div className="h-4 w-8 rounded bg-gray-100 dark:bg-zinc-700 animate-pulse" />
            <div className="h-4 w-8 rounded bg-gray-100 dark:bg-zinc-700 animate-pulse" />
            <div className="h-4 w-10 rounded bg-gray-100 dark:bg-zinc-700 animate-pulse" />
          </div>
        ))}
      </div>
    </>
  );
}
