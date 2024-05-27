import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent {
  isLoading = false;
  loggedin=false
//connect to authsevice to sigh comp.
  constructor(public authService: AuthService,private router:Router) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loggedin=this.authService.getIsAuth() 
    if(this.loggedin){
      window.alert('Please Log out before logging in again')
      this.router.navigate(['/home'])
    }     
  }
  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.createUser(form.value.email, form.value.password,form.value.fullname,form.value.dob,form.value.username);
  }
}
