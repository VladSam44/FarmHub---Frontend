import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeesService } from '../../services/employees.service';

@Component({
  selector: 'app-edit-angajati',
  templateUrl: './edit-angajati.component.html',
  styleUrl: './edit-angajati.component.scss'
})
export class EditAngajatiComponent {
  @Input() employee?: Employee;
  @Output() employeesUpdated = new EventEmitter<Employee[]>();


  constructor(private employeeService: EmployeesService) {}

  ngOnInit(): void {}
  
  updateEmp(employee: Employee) {
    
    employee.hireDate = new Date(employee.hireDate).toISOString().split('T')[0];
  
    this.employeeService
      .updateEmployees(employee)
      .subscribe((employees: Employee[]) => this.employeesUpdated.emit(employees));
      this.employee = undefined; //reset formular
  }
  /*updateEmp(employee : Employee) {
    this.employeeService
    .updateEmployees(employee)
    .subscribe((employees: Employee[]) => this.employeesUpdated.emit(employees));
  } */

 /*deleteEmp(employee : Employee) {
    this.employeeService
    .deleteEmployees(employee)
    .subscribe((employees: Employee[]) => this.employeesUpdated.emit(employees));
  } */
  deleteEmp(employee: Employee) {
    // Verificăm dacă id-ul este definit
    if (employee && typeof employee.id === 'number') {
      // Dacă id-ul este definit, procedăm cu   ștergerea
      this.employeeService
        .deleteEmployees(employee.id) // Trimitem ID-ul, nu întregul obiect Employee
        .subscribe((employees: Employee[]) => this.employeesUpdated.emit(employees));
        this.employee = undefined;
    } else {
      // Dacă id-ul nu este definit, afișăm o eroare
      console.error('ID-ul angajatului nu este definit!');
    }
  }
   
  createEmp(employee : Employee) {
   
    this.employeeService.
    createEmployees(employee)
    .subscribe((employees: Employee[]) => this.employeesUpdated.emit(employees));
    this.employee = undefined;
  }
  
}
