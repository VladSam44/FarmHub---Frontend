// weather-widget.component.ts
import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.css']
})
export class WeatherWidgetComponent implements OnInit {
  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit(): void {
    this.loadWidget();
  }

  loadWidget(): void {
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://weatherwidget.io/js/widget.min.js';
    this.renderer.appendChild(this.el.nativeElement, script);
  }
}
