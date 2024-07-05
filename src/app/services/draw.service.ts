import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class DrawService {

    private apiUrl ='https://localhost:7198/api/Drawing/';

constructor(private http: HttpClient) { }


getDrawingById(drawingId: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/${drawingId}`);
}

getAllDrawings(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}GET`);
}

addDrawing(data: any): Observable<any> {
    const coordinatesJson = JSON.stringify(data.coordinates);
    return this.http.post<any>(`${this.apiUrl}POST`, {
      coordinates: coordinatesJson,
      drawing: data.drawing,
      stareTeren: data.stareTeren,
      tipCultura: data.tipCultura,
      area: data.area,
      ultimaCultura: data.ultimaCultura,
      dateAcquired: data.dateAcquired,
      proprietarArenda: data.proprietarArenda,
    });
  }

  
  updateDrawing(formData: any): Observable<any> {
    if (!formData) {
        console.error('formData.drawing is undefined.');
        return throwError('formData.drawing is undefined.');
    }

    console.log(`mesaj${JSON.stringify(formData)}`)
   
    return this.http.put<any>(`${this.apiUrl}UPDATE`,formData);
}

  deleteDrawing(drawingId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${drawingId}`,);
  }
}
