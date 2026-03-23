'use client';

import { ResponsiveContainer, Line, XAxis, YAxis, Tooltip, CartesianGrid, Bar, ComposedChart } from 'recharts';
import { HourlyData } from '@/lib/weather';
import { useTheme } from '@/context/ThemeContext';

interface Props {
  hours: HourlyData[];
}

export default function ForecastChart({ hours }: Props) {
  const { theme } = useTheme();
  const dark = theme === 'dark';

  const data = hours.map((h) => ({
    time: `${new Date(h.time).getHours()}:00`,
    temp: Math.round(h.temperature),
    rain: h.precipitationProbability,
  }));

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow p-6">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-zinc-300 mb-4">Graf předpovědi</h2>
      <ResponsiveContainer width="100%" height={220}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={dark ? '#3f3f46' : '#f0f0f0'} />
          <XAxis dataKey="time" tick={{ fontSize: 11, fill: dark ? '#a1a1aa' : '#6b7280' }} interval={2} />
          <YAxis yAxisId="temp" unit="°" tick={{ fontSize: 11, fill: dark ? '#a1a1aa' : '#6b7280' }} />
          <YAxis yAxisId="rain" orientation="right" unit="%" tick={{ fontSize: 11, fill: dark ? '#a1a1aa' : '#6b7280' }} domain={[0, 100]} />
          <Tooltip
            contentStyle={{ backgroundColor: dark ? '#27272a' : '#fff', border: 'none', borderRadius: 8, color: dark ? '#e4e4e7' : '#111' }}
            formatter={(value, name) => name === 'temp' ? [`${value}°C`, 'Teplota'] : [`${value}%`, 'Srážky']}
          />
          <Bar yAxisId="rain" dataKey="rain" fill={dark ? '#1d4ed8' : '#bfdbfe'} radius={[3, 3, 0, 0]} />
          <Line yAxisId="temp" type="monotone" dataKey="temp" stroke={dark ? '#38bdf8' : '#0284c7'} strokeWidth={2} dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
