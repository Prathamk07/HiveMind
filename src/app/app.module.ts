import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { FormsModule, NgModel } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

import { RouterModule } from '@angular/router';
import { CdkVirtualScrollViewport, ScrollingModule } from "@angular/cdk/scrolling";
import {CookieService} from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HeaderComponent } from './header/header.component'
import { PostListComponent } from './posts/post-list/post-list.component'
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
// import { FormsModule, NgModel } from '@angular/forms';
// import {MatAccordion, MatExpansionModule} from '@angular/material/expansion'
// import { HttpClientModule } from '@angular/common/http';
import { HomepageComponent } from './homepage/homepage.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetComponent } from './auth/reset/reset.component';
import { CommentComponent } from './posts/comment/comment.component';

import { MessagesComponent } from './chat/messages/messages.component';
import { EditProfileComponent } from './auth/edit-profile/edit-profile.component';
import { UsernameComponent } from './chat/username/username.component';
// import { ChattingComponent } from './chatting/chatting.component';

// import { EditProfileComponent } from './auth/edit-profile/edit-profile.component';

// import { AuthInterceptor} from './auth/auth-interceptor';




// import { type } from "@material-tailwind/html";

@NgModule({
  declarations: [
    AppComponent,
    CreatePostComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    PostListComponent,
    HomepageComponent,
    ProfileComponent,
    ForgotPasswordComponent,
    ResetComponent,
    CommentComponent,
    MessagesComponent,
    EditProfileComponent,
    // ChattingComponent,

    EditProfileComponent,
    UsernameComponent,
    // ThemeProvider,
    
    // NgModel,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,

    ReactiveFormsModule,

    CdkVirtualScrollViewport,
    ScrollingModule,
    // CookieService
   
  ],
  providers: [ 
    provideAnimationsAsync(),
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
