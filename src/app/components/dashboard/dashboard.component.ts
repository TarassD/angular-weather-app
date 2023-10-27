import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Weather } from 'src/app/interfaces/weather.interface';
import { HttpService } from 'src/app/services/http.service';
import { StateService } from 'src/app/services/state.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'mw-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  cities!: Weather[];
  zipCodes!: number[];
  subscription!: Subscription;
  unit!: string;

  constructor(public httpService: HttpService, 
              private utils: UtilsService,
              private state: StateService) {}

  ngOnInit() {
    this.cities = [];
    this.zipCodes = [10001, 60642, 94112];
    this.initCityWeatherList();
    this.subscription = this.state.getTemperatureUnit().subscribe(
      response => {
        this.unit = response;
      },
      err => {
        console.error(`An error occurred when getting temperature unit: ${err.message}`);
      }
    );
  }

  initCityWeatherList() {
    this.subscription = this.httpService
      .getInitialWeather(this.zipCodes)
      .subscribe((response) =>
        response.map((data, i) => {
          const cityWeather = this.utils.mapWeatherObject(
            data,
            this.zipCodes[i]
          );
          this.cities.push(cityWeather);
        })
      );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
