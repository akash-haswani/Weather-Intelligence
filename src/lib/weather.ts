import { Sun, Cloud, CloudRain, CloudLightning, Snowflake, CloudFog, CloudDrizzle, LucideIcon } from 'lucide-react';

export function getWeatherDetails(code: number): { label: string; icon: LucideIcon; recommendation: string } {
  if (code === 0) return { label: 'Clear sky', icon: Sun, recommendation: 'Perfect day for outdoor activities. Don\'t forget sunscreen!' };
  if (code === 1 || code === 2 || code === 3) return { label: 'Partly cloudy', icon: Cloud, recommendation: 'Great weather for a walk or outdoor work.' };
  if (code === 45 || code === 48) return { label: 'Foggy', icon: CloudFog, recommendation: 'Drive safely, visibility might be reduced.' };
  if (code === 51 || code === 53 || code === 55 || code === 56 || code === 57) return { label: 'Drizzle', icon: CloudDrizzle, recommendation: 'A light jacket or umbrella is recommended.' };
  if (code === 61 || code === 63 || code === 65 || code === 66 || code === 67) return { label: 'Rain', icon: CloudRain, recommendation: 'Heavy rain expected. Plan indoor activities.' };
  if (code === 71 || code === 73 || code === 75 || code === 77 || code === 85 || code === 86) return { label: 'Snow', icon: Snowflake, recommendation: 'Cold and snowy. Dress warmly and be careful on the roads.' };
  if (code === 80 || code === 81 || code === 82) return { label: 'Rain showers', icon: CloudRain, recommendation: 'Intermittent rain. Keep an umbrella handy.' };
  if (code === 95 || code === 96 || code === 99) return { label: 'Thunderstorm', icon: CloudLightning, recommendation: 'Stay indoors and avoid open areas.' };
  return { label: 'Unknown', icon: Sun, recommendation: 'Check local alerts for more information.' };
}
