import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthService } from './auth/auth.service';
import { ProfileComponent } from './auth/profile/profile.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
// import { AuthGuard } from './auth/auth.guard';
import { ResetComponent } from './auth/reset/reset.component';
import { MessagesComponent } from './chat/messages/messages.component';
import { EditProfileComponent } from './auth/edit-profile/edit-profile.component';
// import { MessagesComponent } from './chatting/messages/messages.component';
const routes: Routes = [
  { path : '' , redirectTo:'home', pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'reset/:token', component: ResetComponent},
  { path: 'posts', component: CreatePostComponent},
  { path: 'edit/:id', component: CreatePostComponent  },
  { path: 'home', component: HomepageComponent  },
  // {path: 'profile', component : ProfileComponent},
  { path:'profile/:username',component:ProfileComponent},
  { path: 'edit/:username', component: EditProfileComponent},
  { path:'messages', component: MessagesComponent},
  { path: 'editprofile/:username', component : EditProfileComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { 
  
  constructor(private authService : AuthService){

  }
 }
