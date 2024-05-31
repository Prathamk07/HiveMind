import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(private authService : AuthService){

  }
  profile =this.authService.getProfile()
  
  username : string = this.profile.username
  fullname=this.profile.fullname
  email=this.profile.email
  emailverified =this.profile.emailverified
}
