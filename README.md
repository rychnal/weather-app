# Weather App

Weather forecast app built with Next.js 16, TypeScript and Tailwind CSS. Uses the free [Open-Meteo API](https://open-meteo.com/) — no API key required.

## Features

- Current weather and 7-day forecast for any city
- Hourly forecast with temperature/precipitation chart
- City search with debounced autocomplete
- Geolocation support
- Favourite cities (persisted in localStorage)
- Dark mode
- Streaming SSR with Suspense — current weather loads instantly, forecast streams in separately

## Stack

- **Next.js 16** – App Router, Server Components, Route streaming
- **TypeScript**
- **Tailwind CSS v4**
- **Recharts** – forecast chart
- **Open-Meteo API** – weather data, no API key needed

## Project structure

```
app/
├── page.tsx                  # Main page (search, current weather, forecast)
├── layout.tsx
├── loading.tsx               # Skeleton for main page
├── error.tsx
└── forecast/[city]/
    ├── page.tsx              # Forecast detail for a city
    ├── loading.tsx
    └── error.tsx

components/
├── SearchBar.tsx             # City search with debounce
├── GeolocationButton.tsx     # Detect current location
├── FavoriteButton.tsx        # Add/remove city from favourites
├── FavoritesList.tsx         # List of saved cities
├── HourlyForecast.tsx        # 24h hourly forecast
├── ForecastChart.tsx         # Temperature/rain chart (Recharts)
├── ThemeToggle.tsx           # Dark/light mode toggle
└── ErrorMessage.tsx          # Shared error UI

context/
├── FavoritesContext.tsx      # Shared favourites state
└── ThemeContext.tsx          # Shared theme state

hooks/
├── useDebounce.ts            # Debounce any value
├── useLocalStorage.ts        # Persist state in localStorage
└── useGeolocation.ts         # Browser geolocation API

lib/
├── weather.ts                # Open-Meteo API calls + types
└── geocoding.ts              # City search via Open-Meteo geocoding
```

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
