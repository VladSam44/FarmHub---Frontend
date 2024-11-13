import { Component, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxDraw from '@mapbox/mapbox-gl-draw';
import * as turf from '@turf/turf';
import { DrawService } from '../../services/draw.service';
import { AuthService } from '../../services/auth.service';
import { UserStoreService } from '../../services/user-store.service';
import { Drawing } from '../../models/drawing';

@Component({
  selector: 'app-harta',
  templateUrl: './harta.component.html',
  styleUrls: ['./harta.component.scss']
})
export class HartaComponent implements OnInit {
  @ViewChild('drawingForm') drawingForm: any;
  map: mapboxgl.Map | any;
  draw: any;  
  areaElement: HTMLElement | null = null;
  currentUser: any = { name: '' };
  formData: any = {
    stareTeren: '',
    tipCultura: '',
    area: '',
    ultimaCultura: '',
    proprietarArenda: '',
  };
  drawings: Drawing[] = [];
  calculatedArea: number = 0;
  selectedDrawing: any;
  showEditModal: boolean = false;
  showAddForm: boolean = false; 
  
  constructor(
    private drawService: DrawService,
    private authService: AuthService,
    private userStoreService: UserStoreService
  ) {
    this.draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
    });
  }
  
  ngOnInit() {

    const defaultCenter = [28.23333, 45.18333];

    this.map = new mapboxgl.Map({
      accessToken: 'pk.eyJ1IjoidmxhZHNhbTQ0IiwiYSI6ImNsdThjc2UzdjBkc3oyaW8zMTVhNTYwZDgifQ._OUBKGc5U_BlU_sdNZ7QGA',
      container: 'map',
      style: 'mapbox://styles/mapbox/satellite-streets-v12', 
      center: defaultCenter,  
      zoom: 12 
    });

    this.map.addControl(this.draw, 'bottom-right');
    this.areaElement = document.getElementById('calculated-area');

    if (this.areaElement) { 
      this.map.on('draw.create', this.updateArea);
      this.map.on('draw.delete', this.updateArea);
      this.map.on('draw.update', this.updateArea);
    } else {
      console.error('Element with ID "calculated-area" not found in your HTML.');
    }

    const userId = this.authService.getUserId();
    if (userId) {
      this.loadDrawings();
    } else {
      console.error('userId is missing.');
    }
    this.setUserLocation();
  }
  
  setUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = [position.coords.longitude, position.coords.latitude];
          this.map.setCenter(userLocation);
          this.map.setZoom(14); 
        },
        (error) => {
          console.error('Erroare locatie user:', error);
        }
      );
    } else {
      console.error('Geolocation nesuportata de browser.');
    }
  }

  loadDrawings() {
    this.drawService.getAllDrawings().subscribe(
      (drawings: any[]) => {
        this.drawings = drawings;
        console.log(drawings);
      },
      (error) => {
        console.error('Error retrieving drawings:', error);
      }
    );
  }

  selectDrawing(drawing: any) {
    this.selectedDrawing = drawing;
    this.showDrawing(drawing); 
  }

  showDrawing(drawing: any) {
    if (!drawing) {
      console.error('No drawing provided.');
      return;
    }
  
    let coordinates;
    try {
      coordinates = JSON.parse(drawing.coordinates);
    } catch (error) {
      console.error('Error parsing coordinates:', error);
      return;
    }
    
    if (!Array.isArray(coordinates)) {
      console.error('Parsed coordinates is not an array.');
      return;
    }
  
    const geojson: any = {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: coordinates
      },
      properties: {
        id: drawing.id 
      }
    };
  
    const layerId = 'drawing-' + drawing.id;
    const existingLayer = this.map.getLayer(layerId);
  
    
    let fillColor = '#0080ff'; 
    switch (drawing.tipCultura) {
      case 'Orz':
        fillColor = '#f0e68c'; 
        break;
      case 'Grau':
        fillColor = '#daa520'; 
        break;
      case 'Porumb':
        fillColor = '#ff8c00'; 
        break;
      case 'Rapiță':
        fillColor = '#000000'; 
        break;
      case 'Floarea soarelui':
        fillColor = '#ffd700'; 
        break;
      case 'Cartofi':
        fillColor = '#321414'; 
        break;
      case 'Ovăz':
        fillColor = '#808080'; 
        break;
      case 'Mazăre':
        fillColor = '#ffffff'; 
        break;
      case 'Lucernă':
        fillColor = '#006400'; 
        break;
      default:
        fillColor = '#0080ff'; 
        break;
    }
  
    
    let lineColor = '#000'; 
    const proprietarArenda = this.formData.proprietarArenda;
    if (proprietarArenda === 'Arendă agricolă') {
      lineColor = '#ffffff'; 
    } else if (proprietarArenda === 'Proprietate privată') {
      lineColor = '#808080'; 
    }
    
    if (existingLayer) {
      this.map.setPaintProperty(layerId + '-outline', 'line-color', lineColor);
      this.map.setPaintProperty(layerId, 'fill-color', fillColor);
      this.map.getSource(layerId).setData(geojson);
    } else {
      this.map.addLayer({
        'id': layerId,
        'type': 'fill',
        'source': {
          'type': 'geojson',
          'data': geojson
        },
        'layout': {},
        'paint': {
          'fill-color': fillColor,
          'fill-opacity': 0.5,
        }
      });
  
      this.map.addLayer({
        'id': layerId + '-outline',
        'type': 'line',
        'source': {
          'type': 'geojson',
          'data': geojson
        },
        'layout': {},
        'paint': {
          'line-color': lineColor,
          'line-width': 2,
          'line-opacity': 0.8
        }
      });
  

      this.map.addLayer({
        'id': layerId + '-id',
        'type': 'symbol',
        'source': {
          'type': 'geojson',
          'data': geojson
        },
        'layout': {
          'text-field': '{id}', 
          'text-size': 12,
          'text-font': ['Open Sans Regular'],
          'text-anchor': 'center'
        },
        'paint': {
          'text-color': lineColor,
        }
      });
    }
  
    const bounds = turf.bbox(geojson);   
    if (!bounds || bounds.length !== 4) {
      console.error('Invalid bounds:', bounds);
      return;
    }
  
    this.map.fitBounds(bounds, {
      padding: 20, 
      maxZoom: 15, 
    });
  }
  
  

  updateArea = (e: any) => {
    const data = this.draw.getAll();

    if (this.areaElement && data.features.length > 0) {
      const areaSquareMeters = turf.area(data);
      const areaHectares = areaSquareMeters / 10000; 
      this.calculatedArea = Math.round(areaHectares * 100) / 100;
      this.areaElement.innerHTML = `
        <p><strong>${this.calculatedArea}</strong>HA</p>
      `;
    } 
  }

  saveDrawing() {
    const data = this.draw.getAll();
    if (data.features.length > 0) {
      const coordinates = data.features[0].geometry.coordinates;       
      const formData = {
        coordinates: coordinates,
        drawing: this.formData,
        stareTeren: this.formData.stareTeren,
        tipCultura: this.formData.tipCultura,
        area: this.calculatedArea,
        ultimaCultura: this.formData.ultimaCultura,
        proprietarArenda: this.formData.proprietarArenda,
        dateAcquired: this.formData.dateAcquired,
      };
      console.log('formData:', JSON.stringify(this.formData));

      this.drawService.addDrawing(formData).subscribe(
        () => {
          console.log('Drawing saved successfully!');
          // this.drawingForm.resetForm();
          window.location.reload();
          this.loadDrawings();
        },
        (error) => {
          console.error('Error saving drawing:', error);
        }
      );
    } else {
      console.error('No polygon drawn.');
    }
  }

  clearDrawing() {
    this.draw.deleteAll();
    if (this.areaElement) {
      this.areaElement.innerHTML = '<p>No polygon drawn.</p>';
    }
  }

  hideForms() {
    this.showAddForm = false;
    this.showEditModal = false;
  }

  editDrawing(drawing: any) {
    this.selectedDrawing = drawing;
    this.showEditModal = true; 
    this.formData = {
      stareTeren: this.selectedDrawing.stareTeren,
      tipCultura: this.selectedDrawing.tipCultura,
      ultimaCultura: this.selectedDrawing.ultimaCultura,
      propritarArenda: this.formData.proprietarArenda,
      dateAcquired: this.formData.dateAcquired,
    };
  }

  updateDrawing() {
    console.log('Selected Drawing:', this.selectedDrawing);
    console.log('Form Data:', this.formData);

    if (this.selectedDrawing) {
      let updatedDrawing = this.selectedDrawing;
      updatedDrawing.stareTeren = this.formData.stareTeren;
      updatedDrawing.tipCultura = this.formData.tipCultura;
      updatedDrawing.ultimaCultura = this.formData.ultimaCultura;

      this.drawService.updateDrawing(updatedDrawing).subscribe(
        () => {
          console.log('Drawing updated successfully!');
          this.showEditModal = false; 
          this.loadDrawings();
        },
        (error) => {
          console.error('Error updating drawing:', error);
        }
      );
    } else {
      console.error('No drawing selected.');
    }
  }

  deleteDrawing(drawingId: number) {
    if (confirm('Are you sure you want to delete this drawing?')) {
      this.drawService.deleteDrawing(drawingId).subscribe(
        () => {
          console.log('Drawing deleted successfully!');
          this.drawings = this.drawings.filter(drawing => drawing.id !== drawingId);
          this.selectedDrawing = null;
          this.removeDrawingFromMap(drawingId);
        },
        (error) => {
          console.error('Error deleting drawing:', error);
        }
      );
    }
  }

  removeDrawingFromMap(drawingId: number) {
    const layerId = 'drawing-' + drawingId;
    const outlineLayerId = layerId + '-outline';

    if (this.map.getLayer(layerId)) {
      this.map.removeLayer(layerId);
    }
    if (this.map.getSource(layerId)) {
      this.map.removeSource(layerId);
    }
    if (this.map.getLayer(outlineLayerId)) {
      this.map.removeLayer(outlineLayerId);
    }
    if (this.map.getSource(outlineLayerId)) {
      this.map.removeSource(outlineLayerId);
    }
  }
}
