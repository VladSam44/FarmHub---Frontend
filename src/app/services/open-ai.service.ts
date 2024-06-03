import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenAiService {

  constructor(private http: HttpClient) { }

  getData(input: string): Observable<any>{
    return this.http.get('https://localhost:7198/api/OpenAi/GetData?input='+input,{responseType:'text'});
  }
}

