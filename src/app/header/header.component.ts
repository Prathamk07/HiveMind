import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy{
  sidenav!: MatSidenav;
  userIsAuthenticated = false;
  authListenerSubs:boolean
loggedin=false

  constructor(private authService: AuthService,private observer: BreakpointObserver, private router: Router){
    // window.location.reload()
  }
  ngOnInit(): void {
    this.userIsAuthenticated=this.authService.getIsAuth()
    if(this.userIsAuthenticated==true){
      this.loggedin=true
      // this.authService.reload()
    }else{
      this.loggedin=false
      // window.location.reload()
      // location.reload()
    }
    
    
  
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.authListenerSubs=false

  }
}
