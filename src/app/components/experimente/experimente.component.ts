import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import Zoom from 'ol/control/Zoom';
import { Draw, Modify, Snap } from 'ol/interaction';
import { Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';



@Component({
  selector: 'app-experimente',
  templateUrl: './experimente.component.html',
  styleUrl: './experimente.component.scss'
})
export class ExperimenteComponent implements OnInit {

  map: Map | undefined;

  constructor() {}
  
  ngOnInit(): void {
    this.map = new Map({
      view: new View({
        center: [  20, 30],
        zoom: 3,
      }),
       target: 'map',
       controls:[],
       layers: [
         new TileLayer({
           source: new OSM({
             url: 'https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=rMorv9Sv7sziD1neMC04',
             attributions: 'Tiles © <a href="https://www.maptiler.com/">MapTiler</a>',
             maxZoom: 21,
           }),
         }),
       ],
       
       
    });
    this.addCustomZoomControls();
  }
  addCustomZoomControls() {
    this.map!.addControl(new Zoom({
      zoomInLabel: '+',
      zoomOutLabel: '-',
      zoomInTipLabel: 'Zoom in',
      zoomOutTipLabel: 'Zoom out',
      className: 'custom-zoom' 
    }));
  }
}

