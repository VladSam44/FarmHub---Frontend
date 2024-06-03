import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenApiModel } from '../models/token-api.model';
import { UserStoreService } from './user-store.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = "https://localhost:7198/api/User";
  private userPayload:any;
  constructor(private http: HttpClient, private router: Router,private userStore: UserStoreService) { 
    this.userPayload = this.decodedToken();
    
  }

  signUp(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}/inregistrare`, userObj).pipe(
      tap(response => {
        if (response && response.accessToken && response.userId) {
          this.storeToken(response.accessToken);
          this.userStore.setFullNameForStore(userObj.name);
        }
      })
    );
  }

  
  login(loginObj: any) {
    return this.http.post<any>(`${this.baseUrl}/login`,loginObj).pipe(
      tap(response  => {
        if (response && response.accessToken && response.userId) {
          console.log(response);
          this.storeToken(response.accessToken);
          this.userStore.setUserIdForStore(response.userId);  
          this.userStore.setFullNameForStore(response.fullName); 
          this.userStore.setRoleForStore(response.role); 
          localStorage.setItem('userId', response.userId); 
          localStorage.setItem('fullName', response.fullName); 
          localStorage.setItem('role', response.role); 
        }
      })
    )
  }

  getUser() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    return jwtHelper.decodeToken(token);
  }
  getUserId() {
    return this.userPayload.userId;
  }
  
  getName(){
    return this.userPayload.name
  }
 
  signOut(){
    localStorage.clear();
    this.router.navigate(['login'])
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }
  storeRefreshToken(tokenValue: string){
    localStorage.setItem('refreshToken', tokenValue)
  }

  getToken(){
    return localStorage.getItem('token')
  }
  getRefreshToken(){
    return localStorage.getItem('refreshToken')
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token')
  }
  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;

    console.log(jwtHelper.decodeToken(token))

    return jwtHelper.decodeToken(token)
  }
  getfullNameFromToken(){
    if(this.userPayload)
    return this.userPayload.name;
  }

  getRoleFromToken(){
    if(this.userPayload)
    return this.userPayload.role;
  }

  renewToken(tokenApi : TokenApiModel){
    return this.http.post<any>(`${this.baseUrl}/refresh1`, tokenApi)
  }
}
