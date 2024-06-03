import { Component, NgModule } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private auth:AuthService) {}

  logout(){
    this.auth.signOut();
  }
}

