
import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.css']
})
export class WeatherWidgetComponent implements OnInit {

  constructor(private renderer: Renderer2, private el: ElementRef,private sanitizer: DomSanitizer) { }
  locationUrl: SafeResourceUrl | undefined;
  
  ngOnInit(): void {
    this.loadWidget();
    this.getLocation();
  }

  loadWidget(): void {
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://weatherwidget.io/js/widget.min.js';
    this.renderer.appendChild(this.el.nativeElement, script);
  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const unsafeUrl = `https://www.meteoblue.com/ro/weather/widget/daily?lat=${lat}&lon=${lon}&geoloc=fixed&days=7&tempunit=CELSIUS&windunit=KILOMETER_PER_HOUR&precipunit=MILLIMETER&coloured=coloured&pictoicon=0&pictoicon=1&maxtemperature=0&maxtemperature=1&mintemperature=0&mintemperature=1&windspeed=0&windspeed=1&windgust=0&windgust=1&winddirection=0&uv=0&humidity=0&precipitation=0&precipitation=1&precipitationprobability=0&precipitationprobability=1&spot=0&pressure=0&layout=light`;
        this.locationUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
      });
    }
  }
}
