import { Component } from '@angular/core';
import { StateService } from './services/state.service';

@Component({
  selector: 'mw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MyWeather App';
  isFahrenheit: boolean;

  constructor(private state: StateService){
    this.isFahrenheit = true;
  }

  setCelsius(): void {
    this.state.toggleTemperatureUnit('C');
    this.isFahrenheit = false;
  }

  setFahrenheit(): void {
    this.state.toggleTemperatureUnit('F');
    this.isFahrenheit = true;
  }
}
