import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { mimeType } from '../../posts/create-post/mime-type.validator';

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
  imagePreview: string;

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
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
    }),
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
          image: this.user.imagePath
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

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
     this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
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
      this.form.value.image
    );
    console.log(currentuser.id)
    this.form.reset();
  }


}
