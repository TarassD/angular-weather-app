import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IWeatherDetails } from 'src/app/interfaces/weather.interface';
import { HttpService } from 'src/app/services/http.service';
import { StateService } from 'src/app/services/state.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'mw-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  weatherDetails!: IWeatherDetails;
  subscription!: Subscription;
  unit!: string;

  constructor(private route: ActivatedRoute,
              private http: HttpService,
              private utils: UtilsService,
              private state: StateService) { }

  ngOnInit() {
    this.weatherDetails = {
      name: '',
      fiveDayForecast: []
    };
    this.route.params.subscribe( args => {
      this.getForecastByZip(args['id']);
    });
    this.subscription = this.state.getTemperatureUnit().subscribe(
      response => {
        this.unit = response;
      },
      err => {
        console.error(`An error occurred when getting temperature unit: ${err.message}`);
      }
    );
  }

  getForecastByZip(zip: number) {
    this.http.getForecast(zip)
      .subscribe(data => {
        this.weatherDetails = {
          name: data.city.name,
          fiveDayForecast: this.utils.mapForcastObject(data.list, zip)
        };
      }, error => {
        console.error(`An error occurred when retrieving weather data: ${error.message}`);
      });
  }
}
