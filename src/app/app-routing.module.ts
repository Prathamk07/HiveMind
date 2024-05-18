import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  {path:"", redirectTo:'posts', pathMatch:'full'},
  {path:'posts', component:CreatePostComponent},
  {path:'home', component:HomepageComponent},
  {path : 'edit/:id', component : CreatePostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
