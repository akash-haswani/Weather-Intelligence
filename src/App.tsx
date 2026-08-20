import { useState, FormEvent } from 'react';
import { Search, Loader2, CloudSun } from 'lucide-react';
import { fetchWeatherData } from './api';
import { GeocodeResult, ForecastResponse } from './types';
import WeatherDashboard from './components/WeatherDashboard';

export default function App() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<GeocodeResult | null>(null);
  const [weatherData, setWeatherData] = useState<ForecastResponse | null>(null);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const { location, weatherData } = await fetchWeatherData(query);
      setLocation(location);
      setWeatherData(weatherData);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-100 font-sans text-slate-900 overflow-x-hidden">
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 py-4 bg-white border-b border-slate-200 shadow-sm gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
            <CloudSun className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">
            Weather<span className="text-blue-600">Intel</span>
          </h1>
        </div>
        
        <div className="flex-1 w-full max-w-md mx-0 sm:mx-12">
          <form onSubmit={handleSearch} className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="w-5 h-5 text-slate-400" />
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search city (e.g. London, Tokyo)..."
              className="w-full py-2 pl-10 pr-12 bg-slate-50 border border-slate-200 rounded-full focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all shadow-inner"
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="absolute inset-y-1 right-1 px-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-300 disabled:text-slate-500 text-white rounded-full text-xs font-medium transition-all"
            >
              {loading ? <Loader2 className="animate-spin h-4 w-4" /> : 'Go'}
            </button>
          </form>
          {error && (
            <div className="absolute top-16 left-1/2 -translate-x-1/2 w-full max-w-md p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm shadow-lg z-50 text-center">
              {error}
            </div>
          )}
        </div>

        <div className="hidden lg:flex items-center gap-4 text-sm font-medium text-slate-500">
          <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          <div className="w-px h-4 bg-slate-200"></div>
          <span>Weather Intelligence</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 flex flex-col">
        {location && weatherData ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 w-full">
            <WeatherDashboard location={location} weatherData={weatherData} />
          </div>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center opacity-50 space-y-6 text-center px-4 py-20">
            <CloudSun size={80} className="text-slate-300" />
            <p className="text-xl md:text-2xl font-light text-slate-500 max-w-md">
              Search for a city to get intelligent weather forecasts and planning insights.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
