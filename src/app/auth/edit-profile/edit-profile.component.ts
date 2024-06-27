import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {
  isLoading = false;
  form: FormGroup;
  user: any;
  username: string;

  constructor(    
    public route: ActivatedRoute,
    public authService:AuthService,
    public router : Router
  ){
   
  }
  
  ngOnInit(){
  
  
    if(!this.authService.getIsAuth()){
      this.router.navigate(['/login'])
    }
    this.form = new FormGroup({
      fullname: new FormControl(),
      username: new FormControl(),
      bio: new FormControl(),
      dob: new FormControl(),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.get("username")!==null){
        this.username = paramMap.get("username")
        console.log('params',paramMap.get("username"))
        this.isLoading = true;
        this.authService.getUsers(this.username)
        this.authService.getUserProfile().subscribe(data=>{
          this.user=data
          console.log(data)
        this.form.setValue({
          fullname: this.user.fullname,
          username: this.user.username,
          dob: this.user.dob,
          bio: this.user.bio,
          });
        })
        this.isLoading = false;
      }
      
    })
  }

  getProfile(){
    this.user=this.authService.getProfile()
    // console.log(this.user.userId)
  }

  onSubmit(){
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    this.getProfile()
    const currentuser= this.authService.getProfile()
    this.authService.updateUser(
      currentuser.id,
      this.form.value.fullname,
      this.form.value.username,
      this.form.value.dob,
      this.form.value.bio,
    );
    console.log(currentuser.id)
    this.form.reset();
  }
}