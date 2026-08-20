import { GeocodeResponse, ForecastResponse } from './types';

export async function fetchWeatherData(city: string) {
    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
    if (!geoRes.ok) throw new Error("Failed to fetch location data");
    const geoData: GeocodeResponse = await geoRes.json();
    
    if (!geoData.results || geoData.results.length === 0) {
        throw new Error("City not found. Please try another name.");
    }
    
    const location = geoData.results[0];
    
    const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`);
    if (!weatherRes.ok) throw new Error("Failed to fetch weather data");
    const weatherData: ForecastResponse = await weatherRes.json();
    
    return { location, weatherData };
}
