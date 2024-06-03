import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  private googleMapsLoaded = false;
  private googleMapsCallback = '__googleMapsLoaded';

  constructor(private http: HttpClient) {
    this.loadGoogleMaps();
  }

  private loadGoogleMaps(): void {
    if (this.googleMapsLoaded) {
      return;
    }

    window[this.googleMapsCallback] = () => {
      this.googleMapsLoaded = true;
      window[this.googleMapsCallback] = null;
    };

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAsaoG7YvpuYrgVjXpPLVlJkYXPFBUpFUc&callback=${this.googleMapsCallback}`;
    script.async = true;
    document.body.appendChild(script);
  }

  public isLoaded(): boolean {
    return this.googleMapsLoaded;
  }
}
