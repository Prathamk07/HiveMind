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
 Users=new Subject();
 followUser=new Subject()
 onfollowCount=new Subject()
 onunfollowCount=new Subject()
 unfollowUser=new Subject()
 load =0
 user:any
 //imagePath:string;
//  username : string
//  email : string
//  fullname : string
//  emailverified : boolean

 private authStatusListener = new Subject<boolean>();
  userData: any;
  users: {
    // title: post.title,
    username: any; id: any;
  };

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



  createUser(email: string, password: string,fullname:string,dob:string,username:string,imagePath:string) {
    const authData= {
      email: email, 
      password:password, 
      fullname:fullname, 
      dob:dob, 
      username:username, 
      image:imagePath, 
      emailverified:false};

    //post send req to backend (api/user/signup accept request)
    this.http
      .post("http://localhost:3000/api/user/signup", authData)
      .subscribe(response => {
        console.log(response);
        // this.router.navigate['/login']
      });
      this.router.navigate(["/login"]).then(()=>{
        window.location.reload()
      });
  }

  reload(){
    location.reload()
  }

fetchProfile(){
  // const data = {  
  this.http.get<{ message: string; user: any }>("http://localhost:3000/api/user/profile",)
  .pipe(
    map(userData => {
      // return userData.user.map((user: { username: any; email: any; _id: any;fullname: any}) => {
        return {
          // title: post.title,
          id : userData.user.id,
          username: userData.user.username,
          email : userData.user.email,
          fullname : userData.user.fullname,
          emailverified : userData.user.emailverified,
          dob : userData.user.dob,
          imagePath : userData.user.imagePath,
          bio : userData.user.bio
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
  // console.log(this.profile)
  
}
getProfile(){
  const cookie = this.cookieService.get('user')
  if(cookie){

    this.profile=JSON.parse(cookie)
    // console.log(this.profile)
  }
  return this.profile
  
}
getUsers(username:string){
  const currentUser=this.getProfile()
  this.http.get<{ message: string; user: any }>("http://localhost:3000/api/user/profile/"+username+"/"+currentUser.username)
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
          dob:userData.user.dob,
          bio:userData.user.bio,
          imagePath:userData.user.imagePath,
          followers: userData.user.followers,
          following : userData.user.following
        };
      })
    // })
  )
    .subscribe(userData=> {
      // this.profile = userData.user
      // this.cookieService.set('getuser',JSON.stringify(userData))
      // console.log(userData.bio)
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
       
          // console.log(this.user)
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

  updateUser(id:string,fullname:string, username: string, dob:string , bio: string,image: File | string){
    const currentuser=this.getProfile()
    const data = new FormData();
    data.append('id', id);
    data.append('fullname', fullname);
    data.append('username', username);
    data.append('dob', dob);
    data.append('bio', bio);
    data.append('image', image);
     console.log(data)
    // console.log(currentuser)
    // console.log(currentuser)
    this.http.put("http://localhost:3000/api/user/updateuser/"+currentuser.id,data)
    .subscribe()
  }

  getallUser(){
    this.http
    .get<{ message: string; users: any }>("http://localhost:3000/api/user/allusers")
    .pipe(
      map(userData => {
        return userData.users.map((user: { username: any; email: any; _id: any;fullname: any,imagePath:string}) => {
          return {
            // title: post.title,
            email: user.email,
            username: user.username,
            id: user._id,
            imagePath:user.imagePath,

          };
        })
      })
    )
      .subscribe(userData=> {
        this.users=userData
        console.log(userData)
        // this.profile = userData.user
        // this.cookieService.set('getuser',JSON.stringify(userData))
        this.Users.next(userData)
        
      });
  }

  getallUsers() {
    return this.Users.asObservable();
  }

  onFollow(currentUser,followUser){
    const currentUsers=this.getProfile()
    const data={username: currentUsers.username}
    this.http.put<{user:any}>("http://localhost:3000/api/user/follow/"+followUser,data)
    .subscribe(data=>{
      this.followUser.next(data)
      this.onfollowCount.next(data.user.followers)
    })
  }
  onFollowListener(){
    return this.followUser.asObservable()
  }
  onUnfollow(currentUser,followUser){
    const currentUsers=this.getProfile()
    const data={username: currentUsers.username}
    this.http.put<{user:any}>("http://localhost:3000/api/user/unfollow/"+followUser,data)
    .subscribe(follow=>{
      // console.log(follow.user.following)
      this.unfollowUser.next(follow.user.following)
      this.onunfollowCount.next(follow.user.followers)
    })
    
  }
  onUnfollowListener(){
    return this.unfollowUser.asObservable()
  }
  getOnFollowersCount(){
    return this.onfollowCount.asObservable()
  }
  getOnUnFollowersCount(){
    return this.onunfollowCount.asObservable()
  }
}
