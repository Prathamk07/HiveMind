import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy{
 
  userIsAuthenticated = false;
  authListenerSubs:boolean
loggedin=false
user:any;
searchuname: string='';

  constructor(private authService: AuthService,private observer: BreakpointObserver, private router: Router){
    // window.location.reload()
  }
  ngOnInit(): void {

    this.userIsAuthenticated=this.authService.getIsAuth()
    this.user=this.authService.getProfile()
    console.log('current user',this.user)
    if(this.userIsAuthenticated==true){
      this.loggedin=true
      // this.authService.reload()
    }else{
      this.loggedin=false
      // window.location.reload()
      // location.reload()
    }
    this.authService.getallUser();
    this.authService.getallUsers().subscribe(data=>{
      this.user=data;
      console.log(this.user)
  })

    
    
  
  }

  

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.authListenerSubs=false

  }
}
