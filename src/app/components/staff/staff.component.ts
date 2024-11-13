import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { StaffService } from '../../services/staff.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.scss'
})
export class StaffComponent implements OnInit {
  angajati: any[] = [];
  angajatForm: FormGroup;
  selectedAngajat: any = null;
  bsConfig: Partial<BsDatepickerConfig>;


  addAngajatModal: boolean = false;
  editAngajatModal: boolean = false;

  constructor(private staffService: StaffService, private fb: FormBuilder,) {
    this.bsConfig = Object.assign({}, { dateInputFormat: 'YYYY-MM-DD' });
    this.angajatForm = this.fb.group({
      nume: ['', Validators.required],
      pozitie: ['', Validators.required],
      salariu: ['', Validators.required],
      hiredate: ['', Validators.required],
      expirareContract: ['', Validators.required],
    });
  }
 

  ngOnInit(): void {
    this.getAllAngajati();
  }


  getAllAngajati(): void {
    this.staffService.getAllAngajati().subscribe(
      data => {
        console.log(data);
        this.angajati = data;
      },
      error => {
        console.error('Error fetching angajati', error);
      }
    );
  }


  get totalAngajati(): number {
    return this.angajati.length;
  }
  addAngajat(): void {
    if (this.angajatForm.valid) {
      this.staffService.addAngajat(this.angajatForm.value).subscribe(
        data => {
          console.log('Angajat added successfully');
          this.getAllAngajati();
          this.angajatForm.reset();
          this.addAngajatModal = false;
        },
        error => {
          console.error('Error adding angajat', error);
        }
      );
    }
  }

  editAngajat(angajat: any): void {
    this.selectedAngajat = angajat;
    this.angajatForm.patchValue({
      ...angajat,
    });    this.editAngajatModal = true;
  }

  updateAngajat(): void {
    console.log('Form value before update:', this.angajatForm.value);
    if (this.angajatForm.valid && this.selectedAngajat) {
      const formData = { ...this.angajatForm.value, id: this.selectedAngajat.id, 
      };
      this.staffService.updateAngajat(formData).subscribe(
        data => {
          console.log('Angajat updated successfully');
          this.getAllAngajati();
          this.angajatForm.reset();
          this.selectedAngajat = null;
          this.editAngajatModal = false;
        },
        error => {
          console.error('Error updating angajat', error);
        }
      );
    }
  }

  deleteAngajat(angajatId: number): void {
    if (confirm('Are you sure you want to delete this angajat?')) {
      this.staffService.deleteAngajat(angajatId).subscribe(
        data => {
          console.log('Angajat deleted successfully');
          this.getAllAngajati();
        },
        error => {
          console.error('Error deleting angajat', error);
        }
      );
    }
  }
}
