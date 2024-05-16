import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatCardModule} from '@angular/material/card'
import {MatFormFieldModule, } from '@angular/material/form-field'
import { MatButtonModule} from '@angular/material/button'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import {MatInputModule} from '@angular/material/input';
import { LoginpageComponent } from './users/loginpage/loginpage.component';
import { RegisterpageComponent } from './users/registerpage/registerpage.component';
import { HeaderComponent } from './header/header.component'
// import {MatLayoutModule} from '@angular/'
import {MatToolbarModule} from '@angular/material/toolbar';
// import {MatLabelModule} from '@angular/material/'
import { PostListComponent } from './posts/post-list/post-list.component'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { FormsModule, NgModel } from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion'
import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { type } from "@material-tailwind/html";

@NgModule({
  declarations: [
    AppComponent,
    CreatePostComponent,
    LoginpageComponent,
    RegisterpageComponent,
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
    // MatLabelModule,
    BrowserAnimationsModule
    // LoginpageComponent,

  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
