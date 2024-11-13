import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  implements OnInit{
  title = 'HubDigital';
  showNavbar: boolean = false;

  constructor(private router: Router,private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log(event.url);
       
        this.showNavbar = !['/login', '/signup', '/reset','/welcome'].includes(event.url);
      }
    });
    this.spinner.show();
    setTimeout(() => {
    
      this.spinner.hide();
    }, 2000);
  }
  
}
