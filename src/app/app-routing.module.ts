import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { ResetComponent } from './components/reset/reset.component';
import { FinanciarComponent } from './components/financiar/financiar.component';
import { MeteoComponent } from './components/meteo/meteo.component';
import { ResurseComponent } from './components/resurse/resurse.component';
import { ChatBotComponent } from './components/chat-bot/chat-bot.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { HartaComponent } from './components/harta/harta.component';
import { StaffComponent } from './components/staff/staff.component';
import { EchipamentComponent } from './components/echipament/echipament.component';




const routes: Routes = [
  {path:'', redirectTo:'welcome', pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'dashboard', component:DashboardComponent, canActivate:[AuthGuard]},
  {path: 'reset', component:ResetComponent},
  {path: 'financiar', component:FinanciarComponent,canActivate:[AuthGuard]},
  {path: 'meteo', component:MeteoComponent,canActivate:[AuthGuard]},
  {path: 'resurse', component:ResurseComponent,canActivate:[AuthGuard]},
  {path: 'chat', component:ChatBotComponent,canActivate:[AuthGuard]},
  {path: 'welcome', component:WelcomeComponent,canActivate:[AuthGuard]},
  {path: 'harta', component:HartaComponent,canActivate:[AuthGuard]},
  {path: 'staff', component:StaffComponent,canActivate:[AuthGuard]},
  {path: 'echipament', component:EchipamentComponent,canActivate:[AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
