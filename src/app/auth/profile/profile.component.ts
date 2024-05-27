import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  username='Pratham'
  fullname="Pratham Kalra"
  email='prathamkalra418@gmail.com'
  emailverified =false
}
