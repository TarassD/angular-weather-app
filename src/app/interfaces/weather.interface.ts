export interface IWeatherAPIResponse {
  coord: Coord;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: Main;
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  dt_txt?: string;
  sys: {
    type: number
    id: number;
    message: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  id: number;
  name: string;
  cod: number;
}

export interface Coord {
  lon: number;
  lat: number;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface Weather {
  zip: number;
  name?: string;
  tempC: number;
  tempF: number;
  icon: string;
  forecast: string;
  tempHighC: number;
  tempLowC: number;
  tempHighF: number;
  tempLowF: number;
  date?: string;
}

export interface IFiveDayForecast {
  cod: number;
  cnt: number;
  list: IWeatherAPIResponse[];
  city: City;
}

export interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
}

export interface IWeatherDetails {
  name: string;
  fiveDayForecast: Weather[];
}
