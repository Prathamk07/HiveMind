import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
constructor(private authService:AuthService,private router: Router){
  
  if(!this.authService.getIsAuth){
    this.router.navigate(['login'])
  }
}
}
