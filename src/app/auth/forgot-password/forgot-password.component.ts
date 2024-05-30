import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgForm,ReactiveFormsModule,FormGroup,FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit {
  forgetForm !: FormGroup;
  fb = inject(FormBuilder);

  isLoading = false;
  loggedin=false;

  constructor(private router: Router,public authService: AuthService){}
  
  ngOnInit(): void {
   this.forgetForm = this.fb.group({
     email: ['', Validators.compose([Validators.required, Validators.email])]
     
    })
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loggedin=this.authService.getIsAuth() 
    if(this.loggedin){
      window.alert('Please Log out before logging in again')
      this.router.navigate(['/home'])
    }     
  }

  onForgotPassoword(form: NgForm){
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.forgotpassword(form.value.email);
    console.log(form.value);
    this.isLoading = false;

  }//back to login
  onBackTOLoginClick(){
    this.router.navigate(['/login']);
  }

}
