import { getWeatherDescription, HourlyData } from '@/lib/weather';

interface Props {
  hours: HourlyData[];
}

export default function HourlyForecast({ hours }: Props) {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow p-6">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-zinc-300 mb-4">Hodinová předpověď</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {hours.map((hour) => (
          <div key={hour.time} className="flex flex-col items-center gap-1 min-w-[56px]">
            <span className="text-xs text-gray-400 dark:text-zinc-500">{new Date(hour.time).getHours()}:00</span>
            <span className="text-2xl">{getWeatherDescription(hour.weathercode).icon}</span>
            <span className="text-sm font-semibold text-sky-700 dark:text-sky-400">{Math.round(hour.temperature)}°</span>
            <span className="text-xs text-blue-400">{hour.precipitationProbability}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
