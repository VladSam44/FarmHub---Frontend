import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import ValidateForm from '../../helpers/validateform';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ConfirmPasswordValidator } from '../../helpers/confirm-password.validator';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  errorMessages: { [key: string]: string } = {};
  type: string ="password";
  isText: boolean = false;
  eyeIcon: string = " fa-eye-slash";
  signUpForm!: FormGroup;
  public passwordError: string ='';
  constructor(private fb: FormBuilder, 
    private auth: AuthService, 
    private  router: Router,
    private toast: NgToastService,
    private apiService: ApiService,
    
    ){}


  ngOnInit():void{
    this.signUpForm = this.fb.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      userName: ['', [Validators.required]],
      email:new FormControl ('', [ Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8),
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),]),
    });
    
    
  }
  checkPasswordStrength(password: string): string[] {
    const messages: string[] = [];
    
    if (password.length < 8) {
      messages.push('Parola trebuie să aibă cel puțin 8 caractere');
    }
    if (!/[a-z]/.test(password)) {
      messages.push('Parola trebuie să conțină cel puțin o literă mică');
    }
    if (!/[A-Z]/.test(password)) {
      messages.push('Parola trebuie să conțină cel puțin o literă mare');
    }
    if (!/\d/.test(password)) {
      messages.push('Parola trebuie să conțină cel puțin un număr');
    }
    if (!/[@$!%*?&]/.test(password)) {
      messages.push('Parola trebuie să conțină cel puțin un caracter special');
    }
    
    return messages;
  }

  
 

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
  
  onSubmit() {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
      let signUpObj = {
        ...this.signUpForm.value,
        role:'',
        token:''
      }
      this.auth.signUp(signUpObj)
      .subscribe({
        next:(res=>{
          console.log(res.message);
          this.signUpForm.reset();
          this.router.navigate(['login']);
          alert(res.message)
        }),
        error:(err=>{
          alert(err?.error.message)
        })
      })
    } else {
      ValidateForm.validateAllFormFileds(this.signUpForm); //{7}
    }
  }
  

}
