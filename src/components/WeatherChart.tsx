import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { DailyForecast } from '../types';

interface Props {
  daily: DailyForecast;
}

export default function WeatherChart({ daily }: Props) {
  const data = daily.time.map((time, index) => ({
    date: new Date(time).toLocaleDateString('en-US', { weekday: 'short' }),
    max: daily.temperature_2m_max[index],
    min: daily.temperature_2m_min[index],
  }));

  return (
    <div className="h-64 w-full mt-4 text-sm">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorMax" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorMin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="date" stroke="#94a3b8" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" vertical={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', color: '#0f172a', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
            itemStyle={{ color: '#0f172a', fontWeight: '500' }}
          />
          <Area type="monotone" dataKey="max" name="High" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorMax)" />
          <Area type="monotone" dataKey="min" name="Low" stroke="#94a3b8" strokeWidth={2} strokeDasharray="4 4" fillOpacity={1} fill="url(#colorMin)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
