
import HourlyForecast from "@/components/HourlyForecast";
import ForecastChart from "@/components/ForecastChart";
import { searchCities } from "@/lib/geocoding";
import { getForecast, getHourlyForecast, getWeatherDescription } from "@/lib/weather";

interface Props {
  params: Promise<{ city: string }>;
}

export default async function ForecastPage({ params }: Props) {
  const { city } = await params;
  const decodedCityName = decodeURIComponent(city);

  const cities = await searchCities(decodedCityName);
  if (cities.length === 0) {
    return <div>Město nenalezeno</div>;
  }
  const { lat, lon } = cities[0];

  const [forecast, hourlyForecast] = await Promise.all([
    getForecast(lat, lon),
    getHourlyForecast(lat, lon),
  ]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-100 dark:from-zinc-900 dark:to-zinc-800 p-8">
      <div className="max-w-2xl mx-auto space-y-6">

        <a href="/" className="text-sky-600 dark:text-sky-400 text-sm hover:underline">← Zpět</a>

        <h1 className="text-3xl font-bold text-sky-900 dark:text-sky-300">Předpověď – {decodedCityName}</h1>

        <HourlyForecast hours={hourlyForecast} />
        <ForecastChart hours={hourlyForecast} />

        <div className="space-y-3">
         
          {forecast.map((day) => {
            const d = getWeatherDescription(day.weathercode);
            return (
              <div key={day.date} className="bg-white dark:bg-zinc-800 rounded-2xl shadow p-5 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-700 dark:text-zinc-300">{day.date}</p>
                  <p className="text-sm text-gray-400 dark:text-zinc-500">{d.label}</p>
                </div>

                <span className="text-4xl">{d.icon}</span>

                <div className="text-right">
                  <p className="text-sky-600 dark:text-sky-400 font-bold text-xl">{day.tempMax}°</p>
                  <p className="text-gray-400 dark:text-zinc-500">{day.tempMin}°</p>
                  <p className="text-xs text-blue-400">{day.precipitation} mm</p>
                </div>
              </div>
            )
          })}
          
        

        </div>
      </div>
    </main>
  );
}
