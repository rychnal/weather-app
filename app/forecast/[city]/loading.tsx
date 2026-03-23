export default function Loading() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-100 p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="h-4 w-12 rounded bg-sky-200 animate-pulse" />
        <div className="h-9 w-56 rounded-lg bg-sky-200 animate-pulse" />

        {/* HourlyForecast skeleton */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="h-5 w-40 rounded bg-gray-200 animate-pulse mb-4" />
          <div className="flex gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2 min-w-[56px]">
                <div className="h-3 w-8 rounded bg-gray-100 animate-pulse" />
                <div className="h-7 w-7 rounded bg-gray-100 animate-pulse" />
                <div className="h-4 w-6 rounded bg-gray-100 animate-pulse" />
                <div className="h-3 w-6 rounded bg-gray-100 animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* ForecastChart skeleton */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="h-5 w-36 rounded bg-gray-200 animate-pulse mb-4" />
          <div className="h-[220px] w-full rounded-lg bg-gray-100 animate-pulse" />
        </div>

        {/* Forecast days skeleton */}
        <div className="space-y-3">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow p-5 flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 w-20 rounded bg-gray-200 animate-pulse" />
                <div className="h-3 w-16 rounded bg-gray-100 animate-pulse" />
              </div>
              <div className="h-10 w-10 rounded bg-gray-100 animate-pulse" />
              <div className="space-y-2 items-end flex flex-col">
                <div className="h-6 w-10 rounded bg-gray-200 animate-pulse" />
                <div className="h-4 w-8 rounded bg-gray-100 animate-pulse" />
                <div className="h-3 w-10 rounded bg-gray-100 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
