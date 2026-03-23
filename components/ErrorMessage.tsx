export default function ErrorMessage({ message, onReset }: { message: string; onReset: () => void }) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-100 dark:from-zinc-900 dark:to-zinc-800 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow p-8 text-center space-y-4">
          <p className="text-4xl">⚠️</p>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-zinc-200">Nepodařilo se načíst počasí</h2>
          <p className="text-gray-500 dark:text-zinc-400 text-sm">{message}</p>
          <button
            onClick={onReset}
            className="rounded-xl bg-sky-500 px-5 py-2 text-white hover:bg-sky-600"
          >
            Zkusit znovu
          </button>
        </div>
      </div>
    </main>
  );
}
