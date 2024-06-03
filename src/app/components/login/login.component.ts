import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import ValidateForm from '../../helpers/validateform';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UserStoreService } from '../../services/user-store.service';
import { NgModel } from '@angular/forms';
import { ResetPasswordService } from '../../services/reset-password.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public loginForm!: FormGroup;
  type: string ="password";
  isText: boolean = false;
  eyeIcon: string = " fa-eye-slash";
  public resetPasswordEmail!: string;
  public isValidEmail!: boolean;
 

  constructor(
    private fb: FormBuilder, 
    private auth: AuthService, 
    private router: Router,
    private toast: NgToastService,
    private userStore: UserStoreService,
    private resetService : ResetPasswordService
    ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onLogin(){
    if(this.loginForm.valid){
    
      console.log(this.loginForm.value)

      this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res)=> {
          this.auth.storeToken(res.accessToken);
          this.auth.storeRefreshToken(res.refreshToken);
          const tokenPayLoad = this.auth.decodedToken();
          this.userStore.setFullNameForStore(tokenPayLoad.name);
          this.userStore.setRoleForStore(tokenPayLoad.role);
          this.toast.success({detail:"Reusit", summary:"Logare cu succes!", duration: 7000});
          this.loginForm.reset();
          this.router.navigate(['dashboard'])
        },
        error:(err)=>{
          this.toast.error({detail:"EROARE", summary:"Nume de utilizator sau parola gresite!", duration: 7000});
          console.log(err);
        }
      })

    }
    else{

      ValidateForm.validateAllFormFileds(this.loginForm);
      
      this.toast.info({detail: "Completati ambele formulare!", summary: "Incomplet", duration: 7000});
    }
  }

  checkValidEmail(event: string) {
    const value = event;
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;
  }

  confirmToSend() {
    if(this.checkValidEmail(this.resetPasswordEmail)){
      console.log(this.resetPasswordEmail);
      
      //un apel la fratele api

      this.resetService.sendResetPasswordLink(this.resetPasswordEmail)
      .subscribe({
        next:(res)=>{
          this.toast.success({
            detail: 'Trimis!',
            summary:'Mail-ul de resetare a parolei trimis cu succes!',
            duration: 7000,
            
          });
        this.resetPasswordEmail = "";
        const buttonRef = document.getElementById("closeBtn");
         buttonRef?.click();
        },
        error:(err)=>{
          this.toast.error({
            detail: 'Eroare',
            summary:'Email-ul introdus nu exista!',
            duration: 7000,
            
          });
        }
      })
    }
  }
  
}
