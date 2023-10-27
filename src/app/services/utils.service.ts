import { Injectable } from '@angular/core';
import { IFiveDayForecast, IWeatherAPIResponse } from '../interfaces/weather.interface';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  mapWeatherObject(data: IWeatherAPIResponse, zip: number) {
    let date = '';
    // if (data.hasOwnProperty('dt_txt')) {
    //   date = data.dt_txt.split(' ')[0].slice(5);
    // }
    const cityData = {
      zip,
      name: data['name'],
      tempF: data['main']['temp'],
      tempC: this.convertToCelsius(data['main']['temp']),
      icon: data['weather'][0]['main'],
      forecast: data['weather'][0]['description'],
      tempHighF: data['main']['temp_max'],
      tempHighC: this.convertToCelsius(data['main']['temp_max']),
      tempLowF: data['main']['temp_min'],
      tempLowC: this.convertToCelsius(data['main']['temp_min']),
      humidity: data['main']['humidity'],
      date: date,
    };
    return cityData;
  }

  convertToCelsius(unit: number) {
    return Math.round((unit - 32) * 5 / 9);
  }

  mapForcastObject(forecast: IWeatherAPIResponse[], zip: number) {
    const formatedForcast = [];
    for (let i = 4; i < forecast.length; i += 7) {
        const tempObj = this.mapWeatherObject(forecast[i], zip);
        formatedForcast.push(tempObj);
    }

    return formatedForcast;
  }
}
