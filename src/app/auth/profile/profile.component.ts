import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostsService } from '../../posts/posts.service';
import { Post } from '../../posts/post.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  currentuser:any
  username:any
  getuser:any;
  getUserSub: Subscription
  getFollowerCount:Subscription
  posts : any;
  post:any;
  postsSub : Subscription
  postToggle: any;
  fol='Follow';
  followUserSub:Subscription
  unfollowUserSub : Subscription
  // fullname:string
  // email:string
  // emailverified:string
  constructor(private authService : AuthService,private route: ActivatedRoute ,private router: Router,private postService: PostsService){

  }
  // constructor(private authService : AuthService,private route: ActivatedRoute ,private router: Router){}
  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    this.currentuser =this.authService.getProfile()
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.get("username")!==null){
        this.username = paramMap.get("username")
        
        
      this.postService.getUserPosts(this.username)
      this.postsSub=this.postService.getUserPostsUpdateListener()
      .subscribe(data=>{
        this.posts=data
      })
        }
      
    })
      
    this.authService.getUsers(this.username)
    this.getUserSub=this.authService.getUserProfile().subscribe(data=>{
      this.getuser=data
        console.log(this.getuser)
      // this.username = this.getuser.username
      // this.fullname=this.getuser.fullname
      // this.email=this.getuser.email
      // this.emailverified =this.getuser.emailverified
    })
    // this.getFollowerCount=this.authService.getOnFollowersCount().subscribe(data=>{

    //   this.getuser.followers=data
    // })
    // this.getFollowerCount=this.authService.getOnUnFollowersCount().subscribe(data=>{

    //   this.getuser.followers=data
    // })
      this.followUserSub=this.authService.onFollowListener().subscribe(data=>{
        this.getuser.following=data
        console.log(data)
      })
      this.unfollowUserSub=this.authService.onUnfollowListener().subscribe(data=>{
        this.getuser.following=data
      })    
     
    
  }
      
  onEditUser(){
    this.router.navigate(['/editprofile'])
  }
  onPostToggle(event : any,post : string){
    if(!this.postToggle){

      this.postToggle=event
      this.post = post
    }else{
      this.postToggle=false
    }
  }

  onFollow(){
  
    this.authService.onFollow(this.currentuser.username,this.getuser.username)
    // this.fol='following'
    this.getuser.followers = this.getuser.followers+1
  }
  onUnfollow(){
    this.authService.onUnfollow(this.currentuser.username,this.getuser.username)
    this.getuser.followers = this.getuser.followers-1

  }
}
