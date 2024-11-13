import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResurseService {
  private urlResurse = 'https://localhost:7198/api/Resurse/'

constructor( private http: HttpClient) { }

getResurseById(resurseId: number): Observable<any[]>{
  return this.http.get<any[]>(`${this.urlResurse}/${resurseId}`);
}

getAllResurse(): Observable<any[]> {
  return this.http.get<any[]>(`${this.urlResurse}get`);
}

addResurse(data: any): Observable<any>{
  console.log(`mesaj data:`);
  return this.http.post<any>(`${this.urlResurse}create`,{
    tip: data.tip,
    nume: data.nume,
    cantitate: data.cantitate,
    unitatedeMasura: data.unitateDeMasura,
    dataAchizitie: data.dataAchizitie,
    pretAchizitie: data.pretAchizitie,
  })
}

updateResurse(formData: any): Observable<any>{
  if(!formData){
    console.error(`formdata.resurse nedefinit`);
    return throwError(`fromData.resurse nedefinit`);
  }
  return this.http.put<any>(`${this.urlResurse}update`,formData);
}

deleteResurse(resurseId: number): Observable<any>{
  return this.http.delete<any>(`${this.urlResurse}${resurseId}`)
}

}
