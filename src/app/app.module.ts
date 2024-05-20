import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { FormsModule, NgModel } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

import { MatPaginatorModule} from '@angular/material/paginator';
import { MatCardModule} from '@angular/material/card'
import { MatFormFieldModule, } from '@angular/material/form-field'
import { MatButtonModule} from '@angular/material/button'
import { MatInputModule} from '@angular/material/input';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatToolbarModule} from '@angular/material/toolbar';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HeaderComponent } from './header/header.component'
import { PostListComponent } from './posts/post-list/post-list.component'
import { AuthInterceptor} from './auth/auth-interceptor';




// import { type } from "@material-tailwind/html";

@NgModule({
  declarations: [
    AppComponent,
    CreatePostComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    PostListComponent,
    // ThemeProvider,
    // NgModel,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatExpansionModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatAccordion
  ],
  providers: [ 
    provideAnimationsAsync(),
    {provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
