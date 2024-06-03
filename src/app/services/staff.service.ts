import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  private apiUrl = 'https://localhost:7198/api/Angajati/'

  constructor(private http: HttpClient) { }

  getAngajatById(angajatId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${angajatId}`);
  }
  getAllAngajati(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}get`);
  }
  
  addAngajat(data: any): Observable<any>{
    console.log(`mesaj data:`);
    return this.http.post<any>(`${this.apiUrl}create`,{
      angajat: data.angajat,
      nume: data.nume,
      pozitie: data.pozitie,
      salariu: data.salariu,
      hiredate: data.hiredate,
      expirareContract: data.expirareContract,
    });
  }
  
  updateAngajat(formData: any): Observable<any>{
    if(!formData){
      console.error(`formdata.angajat nedefinit`);
      return throwError(`formData.angajat nedefinit`);
    }
    console.log(`mesaj${JSON.stringify(formData)}`)
    return this.http.put<any>(`${this.apiUrl}update`,formData);
  }
  deleteAngajat(angajatId: number): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}${angajatId}`)
  }
}

