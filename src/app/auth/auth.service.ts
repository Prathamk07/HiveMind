import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

// import { AuthData } from "./auth-data.model";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class AuthService {
  private isAuthenticated = false;
 private token: string=''
 private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {
    if(localStorage.getItem('token')){
      this.isAuthenticated=true
    }
  }
 //use token and store
  getToken() {
    this.token=localStorage.getItem('token')
   return this.token;
  }

  getIsAuth(){
   console.log('is auth?', this.isAuthenticated)
    return this.isAuthenticated
  }

  getAuthStatusListener(){

    return this.isAuthenticated;
  }

  createUser(email: string, password: string) {
    const authData= {email: email, password: password};
    //post send req to backend (api/user/signup accept request)
    this.http
      .post("http://localhost:3000/api/user/signup", authData)
      .subscribe(response => {
        console.log(response);
      });
  }

  login(email: string, password: string) {
    const authData = {email: email, password: password};
    this.http
      .post<{token: string}>("http://localhost:3000/api/user/login", authData)
      .subscribe(response => {
        const token = response.token;
        
        // this.token = token;
        if (token!==''){
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.saveAuthData(token);
          this.router.navigate(["/home"]);
          // this.token=token
        }
        else{
          alert('no token')
        }
      });
  }

    logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(["/login"]);
    localStorage.removeItem('token')
  }

  private saveAuthData(token: string){
    localStorage.setItem("token", token);
    this.token=token
  
  }
}
