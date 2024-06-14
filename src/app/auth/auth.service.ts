import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

// import { AuthData } from "./auth-data.model";
import { Subject, map } from "rxjs";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Injectable({ providedIn: "root" })
export class AuthService {
  private isAuthenticated = false;
 private token: string=''
 resetToken=''
 profile : any
 getUser=new Subject()
 load =0
 user:any
//  username : string
//  email : string
//  fullname : string
//  emailverified : boolean

 private authStatusListener = new Subject<boolean>();
  userData: any;

  constructor(private http: HttpClient, private router: Router, private cookieService : CookieService) {
    if(cookieService.get('token')){
      this.user=this.getProfile()
      this.fetchProfile()
      this.isAuthenticated=true
    }
    else{
      this.isAuthenticated=false
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


  createUser(email: string, password: string,fullname:string,dob:string,username:string,) {
    const authData= {email: email, password: password,fullname:fullname,dob:dob,username:username,emailverified:false};
    //post send req to backend (api/user/signup accept request)
    this.http
      .post("http://localhost:3000/api/user/signup", authData)
      .subscribe(response => {
        console.log(response);
      });
      this.router.navigate['/login']
  }

  reload(){
    location.reload()
  }

fetchProfile(){
  
  this.http.get<{ message: string; user: any }>("http://localhost:3000/api/user/profile")
  .pipe(
    map(userData => {
      // return userData.user.map((user: { username: any; email: any; _id: any;fullname: any}) => {
        return {
          // title: post.title,
          username: userData.user.username,
          id: userData.user._id,
          email: userData.user.email,
          fullname : userData.user.fullname,
          emailverified : userData.user.emailverified,
          dob:userData.user.dob
        };
      })
    // })
  )
    .subscribe(userData=> {
      // this.profile = userData.user
      this.cookieService.set('user',JSON.stringify(userData))
      
    });
  }

setProfile(userData){
  this.profile=userData
  console.log(this.profile)
  
}
getProfile(){
  const cookie = this.cookieService.get('user')
  if(cookie){

    this.profile=JSON.parse(cookie)
    console.log(this.profile)
  }
  return this.profile
  
}
getUsers(username:string){
  this.http.get<{ message: string; user: any }>("http://localhost:3000/api/user/profile/"+username)
  .pipe(
    map(userData => {
      // return userData.user.map((user: { username: any; email: any; _id: any;fullname: any}) => {
        return {
          // title: post.title,
          username: userData.user.username,
          id: userData.user._id,
          email: userData.user.email,
          fullname : userData.user.fullname,
          emailverified : userData.user.emailverified,
          dob:userData.user.dob
        };
      })
    // })
  )
    .subscribe(userData=> {
      // this.profile = userData.user
      // this.cookieService.set('getuser',JSON.stringify(userData))
      this.getUser.next(userData)
      
    });
}
getUserProfile() {
  return this.getUser.asObservable();
}
clearuserscookie(){
  // this.cookieService.delete('getuser')
}

  login(email: string, password: string) {
    const authData = {email: email, password: password};
    this.http
      .post<{token: string}>("http://localhost:3000/api/user/login", authData)
      .subscribe(response => {
        const token = response.token;
        // console.log(token)
        // this.token = token;
        if (token!==''){
          this.cookieService.set('token',token)
          this.isAuthenticated = true;
          // this.authStatusListener.next(true);
          // this.saveAuthData(token);
          this.load=0
       
          console.log(this.user)
          this.router.navigate(["/home"]).then(()=>{
            window.location.reload()
          });
          // window.location.reload();
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
    this.cookieService.delete('token')
    this.load=0
    this.router.navigate(["/login"]).then(()=>{
      window.location.reload()
    });
    
  }

  forgotpassword(email: string){
    const authData = {email: email};
    this.http
    .post<{token: string}>("http://localhost:3000/api/user/forgotpassword", authData)
    .subscribe(response => {
      this.resetToken = response.token;
      if (this.resetToken!==''){
        this.cookieService.set('resetToken',this.resetToken)
        this.isAuthenticated = true;
        this.load=0
  
        // this.router.navigate(["/resetpassword"]).then(()=>{
          // window.location.reload()
          // });
          }
          else{
            alert('no token')
            }
  });
  }

  resetPassword(password : string){
    const authData = {password: password};
    // console.log(this.user.email)
    // const resetToken=
const token=this.router.url
// console.log()
    this.http
    .put("http://localhost:3000/api/user"+token, authData)
    .subscribe(response => {
      // const token = response.token;
      // if (token!==''){
      //   this.cookieService.set('token',token)
      //   this.isAuthenticated = true;
      //   this.load=0
  
      //   // this.router.navigate(["/resetpassword"]).then(()=>{
      //     // window.location.reload()
      //     // });
      //     }
      //     else{
      //       alert('no token')
      //       }
      alert("Password has been resetted. You can log in again")
  });
  }

  updateUser(fullname:string, username: string, dob:string ){

  }
  
}
