import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgToastModule } from 'ng-angular-popup';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ResetComponent } from './components/reset/reset.component';
import { ResurseComponent } from './components/resurse/resurse.component';
import { MeteoComponent } from './components/meteo/meteo.component';
import { UtilajeComponent } from './components/utilaje/utilaje.component';
import { FinanciarComponent } from './components/financiar/financiar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ChatBotComponent } from './components/chat-bot/chat-bot.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ExperimenteComponent } from './components/experimente/experimente.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { HartaComponent } from './components/harta/harta.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import { StaffComponent } from './components/staff/staff.component';
import { EchipamentComponent } from './components/echipament/echipament.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    ResetComponent,
    ResurseComponent,
    MeteoComponent,
    UtilajeComponent,
    FinanciarComponent,
    NavbarComponent,
    ChatBotComponent,
    WelcomeComponent,
    ExperimenteComponent,
    HartaComponent,
    StaffComponent,
    EchipamentComponent,
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

  ],
  providers: [ {
    provide:HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi:true
}, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
