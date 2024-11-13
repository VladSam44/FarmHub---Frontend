import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ResetComponent } from './components/reset/reset.component';
import { ResurseComponent } from './components/resurse/resurse.component';
import { MeteoComponent } from './components/meteo/meteo.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { HartaComponent } from './components/harta/harta.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import { StaffComponent } from './components/staff/staff.component';
import { EchipamentComponent } from './components/echipament/echipament.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {MatIconModule} from '@angular/material/icon';
import { WeatherWidgetComponent } from './components/weather-widget/weather-widget.component';
import { WeatherMapComponent } from './components/weather-map/weather-map.component';
import { DatePipe } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ResetComponent,
    ResurseComponent,
    MeteoComponent,
    NavbarComponent,
    WelcomeComponent,
    HartaComponent,
    StaffComponent,
    EchipamentComponent,
    WeatherWidgetComponent,
    WeatherMapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
    FormsModule,
    GoogleMapsModule,
    BsDatepickerModule,
    MatFormFieldModule,
    MatDialogModule,
    MatIconModule,
    NgxSpinnerModule.forRoot(),
  ],
  providers: [ [DatePipe],
     {

    provide:HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi:true
}, provideAnimationsAsync()],

  bootstrap: [AppComponent]
})
export class AppModule { }
