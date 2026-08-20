export interface GeocodeResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

export interface GeocodeResponse {
  results?: GeocodeResult[];
}

export interface CurrentWeather {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  is_day: number;
  time: string;
}

export interface DailyForecast {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weathercode: number[];
}

export interface ForecastResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  current_weather: CurrentWeather;
  daily: DailyForecast;
}
