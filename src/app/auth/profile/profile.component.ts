import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(private authService : AuthService,private router : Router){

  }
  profile =this.authService.getProfile()
  
  username : string = this.profile.username
  fullname=this.profile.fullname
  email=this.profile.email
  emailverified =this.profile.emailverified

  onEditUser(){
    this.router.navigate(['/editprofile'])
  }
}
