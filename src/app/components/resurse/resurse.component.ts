import { Component } from '@angular/core';

@Component({
  selector: 'app-resurse',
  templateUrl: './resurse.component.html',
  styleUrl: './resurse.component.scss'
})
export class ResurseComponent {
  showAddProduct: boolean = true;

  toggleAddProduct(): void {
    
    this.showAddProduct = !this.showAddProduct;
  }
}
