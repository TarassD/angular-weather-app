import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() { }

  private initialTemperatureUnit = 'F';
  private temperatureUnit$ = new BehaviorSubject<string>(this.initialTemperatureUnit);

  getTemperatureUnit(): Observable<string> {
    return this.temperatureUnit$.asObservable();
  }

  toggleTemperatureUnit(unit: string): void {
    this.temperatureUnit$.next(unit);
  }
}
