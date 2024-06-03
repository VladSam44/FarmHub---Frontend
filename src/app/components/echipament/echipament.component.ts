import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EchipamentService } from '../../services/echipament.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';


@Component({
  selector: 'app-echipament',
  templateUrl: './echipament.component.html',
  styleUrl: './echipament.component.scss'
})
export class EchipamentComponent implements OnInit {
  utilaje: any[] = [];
  vehicule: any[] = [];
  transport: any[] = [];
  utilajForm: FormGroup;
  vehiculForm: FormGroup;
  transportForm: FormGroup;
  selectedUtilaj: any = null;
  selectedVehicul: any = null;
  selectedTransport: any = null;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private echipamentService: EchipamentService, private fb: FormBuilder) {
    this.bsConfig = Object.assign({}, { dateInputFormat: 'YYYY-MM-DD' });

    this.utilajForm = this.fb.group({
      categorie: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      putereNecesara: ['', Validators.required],
      greutate: ['', Validators.required],
      anFabricatie: ['', Validators.required],
      oreFunctionare: ['', Validators.required],
      dataAchizitie: ['', Validators.required],
      pretAchizitie: ['', Validators.required],
      ultimaMentenanta: ['', Validators.required],
    });

    this.vehiculForm = this.fb.group({
      categorie: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      putere: ['', Validators.required],
      greutate: ['', Validators.required],
      anFabricatie: ['', Validators.required],
      oreFunctionare: ['', Validators.required],
      dataAchizitie: ['', Validators.required],
      pretAchizitie: ['', Validators.required],
      ultimaMentenanta: ['', Validators.required],
    });

    this.transportForm = this.fb.group({
      categorie: ['', Validators.required],
      brand: ['', Validators.required],
      capacitate: ['', Validators.required],
      anFabricatie: ['', Validators.required],
      tipAtasament: ['', Validators.required],
      dataAchizitie: ['', Validators.required],
      pretAchizitie: ['', Validators.required],
      ultimaMentenanta: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAllUtilaje();
    this.getAllVehicule();
    this.getAllTransport();
  }

  getAllUtilaje(): void {
    this.echipamentService.getAllUtilaje().subscribe(
      data => {
        this.utilaje = data;
      },
      error => {
        console.error('Error fetching utilaje', error);
      }
    );
  }

  getAllVehicule(): void {
    this.echipamentService.getAllVehicule().subscribe(
      data => {
        this.vehicule = data;
      },
      error => {
        console.error('Error fetching vehicule', error);
      }
    );
  }

  getAllTransport(): void {
    this.echipamentService.getAllTransport().subscribe(
      data => {
        this.transport = data;
      },
      error => {
        console.error('Error fetching transport', error);
      }
    );
  }

  addUtilaj(): void {
    if (this.utilajForm.valid) {
      this.echipamentService.addUtilaje(this.utilajForm.value).subscribe(
        data => {
          console.log('Utilaj added successfully');
          this.getAllUtilaje();
          this.utilajForm.reset();
        },
        error => {
          console.error('Error adding utilaj', error);
        }
      );
    }
  }

  editUtilaj(utilaj: any): void {
    this.selectedUtilaj = utilaj;
    this.utilajForm.patchValue(utilaj);
  }

  updateUtilaj(): void {
    if (this.utilajForm.valid && this.selectedUtilaj) {
      const formData = { ...this.utilajForm.value, id: this.selectedUtilaj.id };
      this.echipamentService.updateUtilaje(formData).subscribe(
        data => {
          console.log('Utilaj updated successfully');
          this.getAllUtilaje();
          this.utilajForm.reset();
          this.selectedUtilaj = null;
        },
        error => {
          console.error('Error updating utilaj', error);
        }
      );
    }
  }

  deleteUtilaj(utilajeId: number): void {
    if (confirm('Are you sure you want to delete this utilaj?')) {
      this.echipamentService.deleteUtilaje(utilajeId).subscribe(
        data => {
          console.log('Utilaj deleted successfully');
          this.getAllUtilaje();
        },
        error => {
          console.error('Error deleting utilaj', error);
        }
      );
    }
  }


  addVehicul(): void {
    if (this.vehiculForm.valid) {
      this.echipamentService.addVehicule(this.vehiculForm.value).subscribe(
        data => {
          console.log('Vehicul added successfully');
          this.getAllVehicule();
          this.vehiculForm.reset();
        },
        error => {
          console.error('Error adding vehicul', error);
        }
      );
    }
  }

  editVehicul(vehicul: any): void {
    this.selectedVehicul = vehicul;
    this.vehiculForm.patchValue(vehicul);
  }

  updateVehicul(): void {
    if (this.vehiculForm.valid && this.selectedVehicul) {
      const formData = { ...this.vehiculForm.value, id: this.selectedVehicul.id };
      this.echipamentService.updateVehicule(formData).subscribe(
        data => {
          console.log('Vehicul updated successfully');
          this.getAllVehicule();
          this.vehiculForm.reset();
          this.selectedVehicul = null;
        },
        error => {
          console.error('Error updating vehicul', error);
        }
      );
    }
  }

  deleteVehicul(vehiculeId: number): void {
    if (confirm('Are you sure you want to delete this vehicul?')) {
      this.echipamentService.deleteVehicule(vehiculeId).subscribe(
        data => {
          console.log('Vehicul deleted successfully');
          this.getAllVehicule();
        },
        error => {
          console.error('Error deleting vehicul', error);
        }
      );
    }
  }

  addTransport(): void {
    if (this.transportForm.valid) {
      this.echipamentService.addTransport(this.transportForm.value).subscribe(
        data => {
          console.log('Transport added successfully');
          this.getAllTransport();
          this.transportForm.reset();
        },
        error => {
          console.error('Error adding transport', error);
        }
      );
    }
  }

  editTransport(transport: any): void {
    this.selectedTransport = transport;
    this.transportForm.patchValue(transport);
  }

  updateTransport(): void {
    if (this.transportForm.valid && this.selectedTransport) {
      const formData = { ...this.transportForm.value, id: this.selectedTransport.id };
      this.echipamentService.updateTransport(formData).subscribe(
        data => {
          console.log('Transport updated successfully');
          this.getAllTransport();
          this.transportForm.reset();
          this.selectedTransport = null;
        },
        error => {
          console.error('Error updating transport', error);
        }
      );
    }
  }

  deleteTransport(transportId: number): void {
    if (confirm('Are you sure you want to delete this transport?')) {
      this.echipamentService.deleteTransport(transportId).subscribe(
        data => {
          console.log('Transport deleted successfully');
          this.getAllTransport();
        },
        error => {
          console.error('Error deleting transport', error);
        }
      );
    }
  }
}