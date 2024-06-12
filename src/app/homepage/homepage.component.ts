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
constructor(private authService:AuthService,private router: Router){
  
  if(!this.authService.getIsAuth){
    this.router.navigate(['login'])
    this.authEvent.emit(false)

  }else{
    this.authEvent.emit(true)
  }
  
}


}
