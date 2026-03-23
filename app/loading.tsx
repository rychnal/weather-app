export default function Loading() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-100 p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="h-9 w-32 rounded-lg bg-sky-200 animate-pulse" />
        <div className="h-12 w-full rounded-xl bg-white animate-pulse" />

        <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-6">
          <div className="h-16 w-16 rounded-full bg-gray-200 animate-pulse" />
          <div className="space-y-2">
            <div className="h-5 w-24 rounded bg-gray-200 animate-pulse" />
            <div className="h-12 w-32 rounded bg-gray-200 animate-pulse" />
            <div className="h-4 w-20 rounded bg-gray-100 animate-pulse" />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 space-y-3">
          <div className="h-5 w-36 rounded bg-gray-200 animate-pulse" />
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
              <div className="h-4 w-24 rounded bg-gray-100 animate-pulse" />
              <div className="h-6 w-6 rounded bg-gray-100 animate-pulse" />
              <div className="h-4 w-8 rounded bg-gray-100 animate-pulse" />
              <div className="h-4 w-8 rounded bg-gray-100 animate-pulse" />
              <div className="h-4 w-10 rounded bg-gray-100 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}