import { ForecastResponse, GeocodeResult } from '../types';
import { getWeatherDetails } from '../lib/weather';
import { Wind, Thermometer, TrendingUp, Info } from 'lucide-react';
import WeatherChart from './WeatherChart';

interface Props {
  location: GeocodeResult;
  weatherData: ForecastResponse;
}

export default function WeatherDashboard({ location, weatherData }: Props) {
  const { current_weather, daily } = weatherData;
  const currentWeatherDetails = getWeatherDetails(current_weather.weathercode);
  const CurrentIcon = currentWeatherDetails.icon;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
      {/* Left Column (Hero, Forecast, Chart) */}
      <div className="lg:col-span-8 flex flex-col gap-6 w-full">
        {/* Current Weather Hero */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between shadow-xl min-h-[220px]">
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <h2 className="text-2xl font-medium opacity-90">{location.name}{location.admin1 ? `, ${location.admin1}` : ''}</h2>
              <p className="text-lg opacity-75 mt-1">{currentWeatherDetails.label}</p>
            </div>
            
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-7xl font-bold tracking-tighter">
                {Math.round(current_weather.temperature)}°
              </span>
              <span className="text-3xl opacity-80 font-light">C</span>
            </div>
            
            <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium">
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
                <Wind className="w-4 h-4" />
                <span>W {current_weather.windspeed} km/h</span>
              </div>
            </div>
          </div>
          
          <div className="relative z-10 self-end sm:self-center mt-6 sm:mt-0">
            <CurrentIcon className="w-28 h-28 sm:w-32 sm:h-32 text-yellow-300 drop-shadow-2xl" />
          </div>
          
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        </div>

        {/* 7-Day Forecast Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {daily.time.map((time, i) => {
            const details = getWeatherDetails(daily.weathercode[i]);
            const Icon = details.icon;
            const date = new Date(time);
            // Adding a simple timezone-agnostic check based on local string to match daily dates safely
            const isToday = new Date().toISOString().split('T')[0] === time;
            
            return (
              <div 
                key={time} 
                className={`flex flex-col items-center p-3 rounded-2xl ${isToday ? 'bg-blue-50 border-2 border-blue-200 shadow-md' : 'bg-white border border-slate-200 shadow-sm'} transition-transform hover:scale-105`}
              >
                <span className={`text-xs font-bold uppercase ${isToday ? 'text-blue-600' : 'text-slate-400'}`}>
                  {isToday ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' })}
                </span>
                <Icon className={`w-8 h-8 my-2 ${isToday ? 'text-blue-500' : 'text-slate-400'}`} />
                <span className={`text-sm font-bold ${isToday ? 'text-blue-700' : 'text-slate-800'}`}>
                  {Math.round(daily.temperature_2m_max[i])}°
                </span>
                <span className={`text-xs font-medium ${isToday ? 'text-blue-400' : 'text-slate-400'}`}>
                  {Math.round(daily.temperature_2m_min[i])}°
                </span>
              </div>
            );
          })}
        </div>

        {/* Chart */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 uppercase tracking-widest">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              Temperature Trend
            </h3>
            <div className="flex gap-3">
              <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>Max Temp
              </span>
              <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-slate-300"></span>Min Temp
              </span>
            </div>
          </div>
          <WeatherChart daily={daily} />
        </div>
      </div>

      {/* Right Column (Insights) */}
      <div className="lg:col-span-4 flex flex-col gap-6 overflow-hidden">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex-1">
          <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2 uppercase tracking-widest">
            <Thermometer className="w-4 h-4 text-orange-500" />
            Intelligence Insight
          </h3>
          <div className="space-y-4">
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl">
              <p className="text-sm font-bold text-green-800 mb-1 flex items-center gap-1">
                <Info size={16} /> Operational Advisory
              </p>
              <p className="text-xs text-green-700 leading-relaxed">
                {currentWeatherDetails.recommendation}
              </p>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl opacity-80">
              <p className="text-sm font-bold text-blue-800 mb-1 flex items-center gap-1">
                <Wind size={16} /> Wind Advisory
              </p>
              <p className="text-xs text-blue-700 leading-relaxed">
                Current wind speeds are at {current_weather.windspeed} km/h. {current_weather.windspeed > 30 ? 'Exercise caution in exposed areas.' : 'Conditions are favorable for normal operations.'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-100 border border-dashed border-slate-300 rounded-3xl p-4 flex items-center justify-center text-slate-400 text-xs italic text-center leading-tight">
          "Weather intelligence is the application of meteorology to operational decision making."
        </div>
      </div>
    </div>
  );
}
