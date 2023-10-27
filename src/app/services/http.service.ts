import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IFiveDayForecast, IWeatherAPIResponse } from '../interfaces/weather.interface';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  BASE_URL: string = `https://api.openweathermap.org/data/2.5/weather?zip=`;
  FORECAST_URL: string = `https://api.openweathermap.org/data/2.5/forecast?zip=`;
  appKey: string = `811a88e016f1d73ae8fb49e5a414b1c9`;

  constructor(private http: HttpClient) { }

  getInitialWeather(zipCodes: number[]): Observable<IWeatherAPIResponse[]> {
    let urlstring = '';
    const responses: any[] = zipCodes.map((zip: number) => {
      urlstring = `${this.BASE_URL}${zip},us&appid=${this.appKey}&units=imperial`;
      return this.http.get(urlstring);
    });
    return forkJoin(responses);
  }

  getForecast(zip: number): Observable<IFiveDayForecast> {
    const url = `${this.FORECAST_URL}${zip},us&appid=${this.appKey}&units=imperial`;
    return this.http.get<IFiveDayForecast>(url);
  }
}
