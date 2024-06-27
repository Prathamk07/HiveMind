import { CommonModule, Location } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet ,ParamMap, ActivatedRoute} from '@angular/router';
import { io } from 'socket.io-client';
import { AuthService } from './auth/auth.service';

@Component({
  // imports : [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // socket=io()
  title = 'client';
  events: string[] = [];
  opened: boolean;
  userAuth : boolean=false
  logged: boolean
  user:any
  // authEvent
  constructor(private authService : AuthService, private router : Router, private route: ActivatedRoute, private location : Location){
    

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const path = this.location.path()
    console.log(path)
    if(path === '/login' || path === "/signup" || path === "/forgot-password" || path === "/reset-password"){
      this.logged = false
    }else{
      this.logged = true
    }
    this.user=this.authService.getProfile()
  }
  loggedin(){

    this.userAuth=true
    console.log("User loggedin", this.userAuth)
  }
  onLogout(){
    this.authService.logout();
  }

}
