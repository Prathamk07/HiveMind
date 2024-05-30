import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.css'
})
export class ResetComponent {
  resetForm !: FormGroup;
  fb = inject(FormBuilder);

  isLoading = false;
  // loggedin;

  constructor(private router: Router,public authService: AuthService){}
  
  ngOnInit(): void {
   this.resetForm = this.fb.group({
     password: ['', Validators.compose([Validators.required])]
     
    })
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.loggedin=this.authService.getIsAuth() 
    // if(this.loggedin){
    //   window.alert('Please Log out before logging in again')
    //   this.router.navigate(['/home'])
    // }     
  }


  onResetPassword=(form : NgForm)=>{
    console.log(form.value.password)
    this.authService.resetPassword(form.value.password)
  }

}
