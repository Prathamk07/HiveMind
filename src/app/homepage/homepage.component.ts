import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';
import { PostListComponent } from '../posts/post-list/post-list.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {
  @Output() authEvent = new EventEmitter<boolean>();
  user:any
  userList : []
  isLoading = false;

constructor(private authService:AuthService,private router: Router){
  
  if(!this.authService.getIsAuth){
    this.router.navigate(['login'])
    this.authEvent.emit(false)

  }else{
    this.authEvent.emit(true)
  }
  
}
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.user=this.authService.getProfile()
  this.userList = []

  this.authService.getallUser();
  this.authService.getallUsers().subscribe(data=>{
    this.isLoading = false;
    this.user=data;
    console.log(this.user)
    })
}



}
