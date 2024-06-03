import { Component, NgModule, } from '@angular/core';
import { GoogleMap, MapPolygon, MapPolyline } from '@angular/google-maps';


@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
  standalone: true,
  imports: [GoogleMap, MapPolyline ],
 })
 export class MapsComponent  {
 
  options: google.maps.MapOptions = {
     center: { lat: 45.192711, lng: 28.243429 },
     zoom: 14,
     streetViewControl: false,
     mapTypeControl: false,
     mapTypeId: 'satellite',
     
  };
  vertices: google.maps.LatLngLiteral[] = [
   { lat: 13, lng: 13 },
   { lat: -13, lng: 0 },
   { lat: 13, lng: -13 },
 ];
  drawingEnabled: boolean = false;
  polylinePath: google.maps.LatLngLiteral[] = [];
  constructor() {}

  toggleDrawingMode(): void {
   this.drawingEnabled = !this.drawingEnabled;
   console.log('Drawing mode enabled:', this.drawingEnabled);

   if (this.drawingEnabled) {
      this.polylinePath = [];    
   }
 }
 handleMapClick(event: google.maps.MapMouseEvent): void {
   console.log('Map clicked');
   if (this.drawingEnabled && event.latLng) { 
     const latLngLiteral: google.maps.LatLngLiteral = {
       lat: event.latLng.lat(),
       lng: event.latLng.lng()
     };
     this.polylinePath.push(latLngLiteral); 
     console.log('Polyline Path:', this.polylinePath);
   }
 }
 clearDrawing(): void {
   this.polylinePath = []; 
 }
 }