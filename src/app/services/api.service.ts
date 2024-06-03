import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',

})

export class ApiService {
    private baseUrl: string =  'https://localhost:7198/api/User/';
    constructor (private http: HttpClient) {}


getUsers() {
    return this.http.get<any>(this.baseUrl);
}

  checkUsernameExist(username: string): Observable<boolean> {
    const url = `${this.baseUrl}checkUsernameExist?username=${username}`;
    return this.http.get<boolean>(url);
}
checkEmailExist(email: string): Observable<boolean> {
    const url = `${this.baseUrl}checkEmailExist/${email}`;
    return this.http.get<boolean>(url);
  }
  


}