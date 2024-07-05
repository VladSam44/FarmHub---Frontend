import { Injectable } from '@angular/core';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { TokenApiModel } from '../models/token-api.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  
  constructor (private auth: AuthService, private toast: NgToastService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const myToken = this.auth.getToken();

    if(myToken){
      request = request.clone ({
        setHeaders: {Authorization: `Bearer ${myToken}` }
      })
    };

    return next.handle(request).pipe(
      catchError((err:any)=>{
        if(err instanceof HttpErrorResponse) {
          if(err.status === 401) {
            return this.handleUnAuthorizedError(request, next);
          }
        }
        return throwError(()=> new Error ("Eroare"))
      })
    );
  }

  handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler){
    
    let tokeApiModel = new TokenApiModel();
    tokeApiModel.accessToken = this.auth.getToken()!;
    tokeApiModel.refreshToken = this.auth.getRefreshToken()!;
    return this.auth.renewToken(tokeApiModel)
    .pipe(
      switchMap((data:TokenApiModel)=> {
        this.auth.storeRefreshToken(data.refreshToken);
        this.auth.storeToken(data.accessToken);
        req = req.clone ({
          setHeaders: {Authorization: `Bearer ${data.accessToken}` }
        })
        return next.handle(req)
      }),
      catchError((err)=>{
        return throwError(()=>{
          this.toast.warning({detail:"Warning", summary:"Token is expired, Login again"});
          this.router.navigate(['login'])
        })
      })
    )
  }
}