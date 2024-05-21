import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path : '' , redirectTo:'home', pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'posts', component: CreatePostComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: CreatePostComponent, canActivate: [AuthGuard]  },
  { path: 'home', component: HomepageComponent, canActivate: [AuthGuard]  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
