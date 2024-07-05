import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EchipamentService {
  private urlUtilaje = 'https://localhost:7198/api/Utilaje/'
  private urlVehicule = 'https://localhost:7198/api/Vehicule/'
  private urlTransport = 'https://localhost:7198/api/Transport/'
  constructor(private http: HttpClient) { }

  getUtilajById(utilajeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlUtilaje}/${utilajeId}`);
  }
  getAllUtilaje(): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlUtilaje}get`);
  }
  addUtilaje(data: any): Observable<any>{
    console.log(`mesaj data:`);
    return this.http.post<any>(`${this.urlUtilaje}create`,{
      categorie: data.categorie,
      brand: data.brand,
      model: data.model,
      putereNecesara: data.putereNecesara,
      greutate: data.greutate,
      anFabricatie: data.anFabricatie,
      oreFunctionare: data.oreFunctionare,
      dataAchizitie: data.dataAchizitie,
      pretAchizitie: data.pretAchizitie,
      ultimaMentenanta: data.ultimaMentenanta,
    });
  }
  updateUtilaje(formData: any): Observable<any>{
    if(!formData){
      console.error(`formdata.utilaje nedefinit`);
      return throwError(`formData.utilaje nedefinit`);
    }
    console.log(`mesaj${JSON.stringify(formData)}`)
    return this.http.put<any>(`${this.urlUtilaje}update`,formData);
  }
  deleteUtilaje(utilajeId: number): Observable<any>{
    return this.http.delete<any>(`${this.urlUtilaje}${utilajeId}`)
  }

  //vehicule

  getVehiculeById(vehiculeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlVehicule}/${vehiculeId}`);
  }
  getAllVehicule(): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlVehicule}get`);
  }
  addVehicule(data: any): Observable<any>{
    console.log(`mesaj data:`);
    return this.http.post<any>(`${this.urlVehicule}create`,{
      categorie: data.categorie,
      brand: data.brand,
      model: data.model,
      putere: data.putere,
      anFabricatie: data.anFabricatie,
      oreFunctionare: data.oreFunctionare,
      dataAchizitie: data.dataAchizitie,
      pretAchizitie: data.pretAchizitie,
      ultimaMentenanta: data.ultimaMentenanta,
    });
  }
  updateVehicule(formData: any): Observable<any>{
    if(!formData){
      console.error(`formdata.vehicul nedefinit`);
      return throwError(`formData.vehicul nedefinit`);
    }
    console.log(`mesaj${JSON.stringify(formData)}`)
    return this.http.put<any>(`${this.urlVehicule}update`,formData);
  }
  deleteVehicule(vehiculeId: number): Observable<any>{
    return this.http.delete<any>(`${this.urlVehicule}${vehiculeId}`)
  }

  //transport
  getTransportById(transportId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlTransport}/${transportId}`);
  }
  getAllTransport(): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlTransport}get`);
  }
  addTransport(data: any): Observable<any>{
    console.log(`mesaj data:`);
    return this.http.post<any>(`${this.urlTransport}create`,{
      categorie: data.categorie,
      brand: data.brand,
      capacitate: data.capacitate,
      anFabricatie: data.anFabricatie,
      tipAtasament: data.tipAtasament,
      dataAchizitie: data.dataAchizitie,
      pretAchizitie: data.pretAchizitie,
      ultimaMentenanta: data.ultimaMentenanta,
    });
  }
  updateTransport(formData: any): Observable<any>{
    if(!formData){
      console.error(`formdata.trs nedefinit`);
      return throwError(`formData.trs nedefinit`);
    }
    console.log(`mesaj${JSON.stringify(formData)}`)
    return this.http.put<any>(`${this.urlTransport}update`,formData);
  }
  deleteTransport(vehiculeId: number): Observable<any>{
    return this.http.delete<any>(`${this.urlTransport}${vehiculeId}`)
  }
}
