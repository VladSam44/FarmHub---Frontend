import { HttpClient } from '@angular/common/http';
import { EnvironmentInjector, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private empUrl: string = 'environment.apiEmpUrl';

constructor(private http: HttpClient) { }

/*public getEmployees(): Observable<Employee[]> {
  return this.http.get<Employee[]>(environment.apiEmpUrl);
}

public updateEmployees(employee: Employee): Observable<Employee[]> {
  return this.http.put<Employee[]>(environment.apiEmpUrl, employee) ;
}
//${environment.apiUrl}/${this.url}

public createEmployees(employee: Employee): Observable<Employee[]> {
  return this.http.post<Employee[]>(environment.apiEmpUrl, employee) ;
}

/*public deleteEmployees(employee: Employee): Observable<Employee[]> {
  return this.http.delete<Employee[]>(
    `${environment.apiEmpUrl}/${this.empUrl}/${employee.id}`
  );
} 
deleteEmployees(id: number): Observable<Employee[]> {
  // Implementați logica pentru a   șterge angajatul și a returna lista actualizată de angajati
  return this.http.delete<Employee[]>(`${this.empUrl}/${id}`);
}
*/
public getEmployees(): Observable<Employee[]> {
  return this.http.get<Employee[]>(environment.apiEmpUrl);
}

public updateEmployees(employee: Employee): Observable<Employee[]> {
  return this.http.put<Employee[]>(environment.apiEmpUrl, employee);
}

public createEmployees(employee: Employee): Observable<Employee[]> {
  return this.http.post<Employee[]>(environment.apiEmpUrl, employee);
}

public deleteEmployees(id: number): Observable<Employee[]> {
  // Utilizăm direct obiectul de configurare a mediului pentru URL-ul API
  return this.http.delete<Employee[]>(`${environment.apiEmpUrl}/${id}`);
}

}
