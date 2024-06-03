import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeesService } from '../../services/employees.service';

@Component({
  selector: 'app-angajati',
  templateUrl: './angajati.component.html',
  styleUrl: './angajati.component.scss'
})
export class AngajatiComponent {
  @Input() employee?: Employee;
  @Output() employeesUpdated = new EventEmitter<Employee[]>();
  employees: Employee[] = [];
  employeeToEdit?: Employee;
  showEditModal?: boolean;
  

  constructor(private employeeService: EmployeesService) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((result: Employee[]) => {
      console.log(result); 
      this.employees = result;
    });
  }
  
  updateEmpList(employees: Employee[]) {
    this.employees = employees;
  }

  initNewEmp() {
    this.employeeToEdit = new Employee();
  }

  editEmp(employee: Employee) {
    this.employeeToEdit = employee;
    this.showEditModal = true;
  }
 

  
}
