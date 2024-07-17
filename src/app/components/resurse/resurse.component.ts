import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResurseService } from '../../services/resurse.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-resurse',
  templateUrl: './resurse.component.html',
  styleUrl: './resurse.component.scss'
})
export class ResurseComponent implements OnInit {
  resurse: any[] = [];
  resurseForm: FormGroup;
  selectedResursa: any = null;

  isCollapsed: boolean = true;
  bsConfig: Partial<BsDatepickerConfig>;

  addResursaModal: boolean = false;
  editResursaModal: boolean = false;
  resursaToDelete: number | null = null;

  constructor(
    private resurseService: ResurseService,
    private fb: FormBuilder,
    private toast: NgToastService
  ) {
    this.bsConfig = Object.assign({}, { dateInputFormat: 'YYYY-MM-DD' });

    this.resurseForm = this.fb.group({
      tip: ['', Validators.required],
      nume: ['', Validators.required],
      cantitate: ['', Validators.required],
      unitateDeMasura: ['', Validators.required],
      dataAchizitie: ['', Validators.required],
      pretAchizitie: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllResurse();
  }

  getAllResurse(): void {
    this.resurseService.getAllResurse().subscribe(
      data => {
        this.resurse = data;
      },
      error => {
        console.error('Error fetching resurse', error);
      }
    );
  }

  addResursa(): void {
    if (this.resurseForm.valid) {
      this.resurseService.addResurse(this.resurseForm.value).subscribe(
        data => {
          console.log('Resursa adaugata');
          this.toast.success({ detail: "Adăugat", summary: "Resursa adăugată cu succes", duration: 6000 });
          this.getAllResurse();
          this.resurseForm.reset();
          this.addResursaModal = false;
        },
        error => {
          console.error('Error adaugare resursa', error);
        }
      );
    }
  }

  editResursa(resursa: any): void {
    this.selectedResursa = resursa;
    this.resurseForm.patchValue(resursa);
    this.editResursaModal = true;
  }

  updateResursa(): void {
    if (this.resurseForm.valid && this.selectedResursa) {
      const formData = { ...this.resurseForm.value, id: this.selectedResursa.id };
      this.resurseService.updateResurse(formData).subscribe(
        data => {
          console.log('Resursa updatata');
          this.toast.success({ detail: "Actualizare", summary: "Modificarea s-a realizat cu succes!", duration: 7000 });
          this.getAllResurse();
          this.resurseForm.reset();
          this.editResursaModal = false;
          this.selectedResursa = null;
        },
        error => {
          console.error('Error editare resursa', error);
        }
      );
    }
  }

  deleteResursa(resurseId: number): void {
    this.resurseService.deleteResurse(resurseId).subscribe(
      data => {
        console.log('Resursa stearsa');
        this.toast.success({ detail: "Ștergere", summary: "Ștergerea s-a realizat cu succes", duration: 7000 });
        this.getAllResurse();
      },
      error => {
        console.error('Error stergere resursa', error);
        this.toast.error({ detail: "EROARE", summary: "Nu s-a putut realiza ștergerea", duration: 7000 });
      }
    );
  }
}
