import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  isLoading = false;
  loggedin=false  

  constructor(public authService: AuthService,private router : Router) {
 
  }
  ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      this.loggedin=this.authService.getIsAuth() 
      if(this.loggedin){
        window.alert('Please Log out before logging in again')
        this.router.navigate(['/home'])
      }     
    }
  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password);
  }

  onCreateAccountClick(){
    this.router.navigate(['/signup'])
  }

  onForgotPasswordClick(){
    this.router.navigate(['forgot-password'])
  }

  signInWithGoogle(){
  }
  
}
