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
import { AngajatiComponent } from './components/angajati/angajati.component';
import { FinanciarComponent } from './components/financiar/financiar.component';
import { EditAngajatiComponent } from './components/edit-angajati/edit-angajati.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ChatBotComponent } from './components/chat-bot/chat-bot.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ExperimenteComponent } from './components/experimente/experimente.component';
import { MapsComponent } from './components/maps/maps.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { HartaComponent } from './components/harta/harta.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';





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
    AngajatiComponent,
    FinanciarComponent,
    EditAngajatiComponent,
    NavbarComponent,
    ChatBotComponent,
    WelcomeComponent,
    ExperimenteComponent,
    HartaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
    FormsModule,
    GoogleMapsModule,
    MapsComponent,
    BsDatepickerModule
  ],
  providers: [ {
    provide:HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi:true
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
