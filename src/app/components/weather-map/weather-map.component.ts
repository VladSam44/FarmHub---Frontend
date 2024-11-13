import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-weather-map',
  templateUrl: './weather-map.component.html',
  styleUrls: ['./weather-map.component.css']
})
export class WeatherMapComponent implements OnInit {
  mapUrl: SafeResourceUrl | undefined;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const unsafeUrl = `https://www.meteoblue.com/ro/weather/maps/widget?lat=${lat}&lon=${lon}&windAnimation=0&windAnimation=1&gust=0&gust=1&satellite=0&satellite=1&cloudsAndPrecipitation=0&cloudsAndPrecipitation=1&temperature=0&temperature=1&sunshine=0&sunshine=1&extremeForecastIndex=0&extremeForecastIndex=1&geoloc=fixed&tempunit=C&windunit=km%252Fh&lengthunit=metric&zoom=7&autowidth=auto`;
        this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
      });
    }
  }
  
}
