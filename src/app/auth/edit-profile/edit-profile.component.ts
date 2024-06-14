import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { mimeType } from './mime-type.validator1';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit{
//public title: string;
// public status: string;
form: FormGroup;
imagePreview: string;

constructor(public authService: AuthService,private router:Router) {}

ngOnInit() {
  this.form = new FormGroup({
    image: new FormControl(null, {
      validators: [Validators.required],
      asyncValidators: [mimeType]
    }),
  })
}

fileChangeEvent(event: Event){
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
  }

 // fileChangeEvent(fileInput: any){
   // this.filesToUpload = <Array<File>>fileInput.target.files;
//}
}
