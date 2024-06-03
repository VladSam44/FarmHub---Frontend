import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { ResetComponent } from './components/reset/reset.component';
import { FinanciarComponent } from './components/financiar/financiar.component';
import { UtilajeComponent } from './components/utilaje/utilaje.component';
import { MeteoComponent } from './components/meteo/meteo.component';
import { ResurseComponent } from './components/resurse/resurse.component';
import { AngajatiComponent } from './components/angajati/angajati.component';
import { ChatBotComponent } from './components/chat-bot/chat-bot.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ExperimenteComponent } from './components/experimente/experimente.component';
import { HartaComponent } from './components/harta/harta.component';
import { MapsComponent } from './components/maps/maps.component';




const routes: Routes = [
  {path:'', redirectTo:'angajati', pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'dashboard', component:DashboardComponent, canActivate:[AuthGuard]},
  {path: 'reset', component:ResetComponent},
  {path: 'financiar', component:FinanciarComponent},
  {path: 'utilaje', component:UtilajeComponent},
  {path: 'meteo', component:MeteoComponent},
  {path: 'resurse', component:ResurseComponent},
  {path: 'angajati', component:AngajatiComponent},
  {path: 'chat', component:ChatBotComponent},
  {path: 'welcome', component:WelcomeComponent},
  {path: 'experimente', component:ExperimenteComponent},
  {path: 'harta', component:HartaComponent,canActivate:[AuthGuard]},
  {path:  'maps',component:MapsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
