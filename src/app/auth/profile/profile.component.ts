import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  currentuser:any
  username:any
  getuser:any;
  getUserSub: Subscription
  // fullname:string
  // email:string
  // emailverified:string
  constructor(private authService : AuthService,private route: ActivatedRoute ,private router: Router){

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  this.currentuser =this.authService.getProfile()
  this.route.paramMap.subscribe((paramMap: ParamMap)=>{
    if(paramMap.get("username")!==null){
      this.username=paramMap.get('username')
      }
      })
      
      this.authService.getUsers(this.username)
      this.getUserSub=this.authService.getUserProfile().subscribe(data=>{
        this.getuser=data
        //  console.log(this.getuser)
        // this.username = this.getuser.username
        // this.fullname=this.getuser.fullname
        // this.email=this.getuser.email
        // this.emailverified =this.getuser.emailverified
        })
        
      }
      
      
   
}
