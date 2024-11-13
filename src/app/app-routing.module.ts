import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';
import { ResetComponent } from './components/reset/reset.component';
import { MeteoComponent } from './components/meteo/meteo.component';
import { ResurseComponent } from './components/resurse/resurse.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { HartaComponent } from './components/harta/harta.component';
import { StaffComponent } from './components/staff/staff.component';
import { EchipamentComponent } from './components/echipament/echipament.component';




const routes: Routes = [
  {path:'', redirectTo:'welcome', pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'reset', component:ResetComponent},
  {path: 'meteo', component:MeteoComponent,canActivate:[AuthGuard]},
  {path: 'resurse', component:ResurseComponent,canActivate:[AuthGuard]},
  {path: 'welcome', component:WelcomeComponent},
  {path: 'harta', component:HartaComponent,canActivate:[AuthGuard]},
  {path: 'staff', component:StaffComponent,canActivate:[AuthGuard]},
  {path: 'echipament', component:EchipamentComponent,canActivate:[AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
