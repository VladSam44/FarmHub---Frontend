import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetPassword } from '../../models/reset-password.model';
import { ConfirmPasswordValidator } from '../../helpers/confirm-password.validator';
import { ActivatedRoute, Router } from '@angular/router';
import ValidateForm from '../../helpers/validateform';
import { ResetPasswordService } from '../../services/reset-password.service';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.scss'
})
export class ResetComponent {

  resetPasswordForm!: FormGroup;
  emailToReset!: string;
  emailToken!: string;
  
  resetPasswordObj = new ResetPassword();

  constructor (private toast:NgToastService ,private fb: FormBuilder, private aactivatedRoute: ActivatedRoute, 
    private resetService: ResetPasswordService, private  router: Router
    ){}
    

  ngOnInit():void{
    this.resetPasswordForm = this.fb.group({
      password: [null, Validators.required],
      confirmPassword:[ null, Validators.required]
    },{
      validator: ConfirmPasswordValidator("password","confirmPassword")
    });

    this.aactivatedRoute.queryParams.subscribe(val=>{
      this.emailToReset = val['email'];
      let uriToken = val['code'];
      this.emailToken = uriToken.replace(/ /g,'+');  //Pt baza de date==
      console.log(this.emailToken);
      console.log(this.emailToReset);
    })
  }

  reset(){
    if(this.resetPasswordForm.valid){
      this.resetPasswordObj.email = this.emailToReset;
      this.resetPasswordObj.newPassword = this.resetPasswordForm.value.password;
      this.resetPasswordObj.confirmPassword = this.resetPasswordForm.value.confirmPassword;
      this.resetPasswordObj.emailToken = this.emailToken;

      this.resetService.resetPassword(this.resetPasswordObj)
      .subscribe({
        next:(res)=>{
          this.toast.success({
            detail:'Succes',
            summary: "Parola schimbata cu succes!",
            duration: 5000,
          });
          this.router.navigate(['login']);
        },
        error:(err)=>{
          this.toast.error({
            detail:"Eroare",
            summary:'Ceva nu a mers bine!',
            duration: 5000,
          });
        }
      })
    }else{
      ValidateForm.validateAllFormFileds(this.resetPasswordForm);
    }
  }
 


}
