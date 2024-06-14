import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';
// import { HttpClient } from "@angular/common/http";
import { Post } from "../post.model";
import { PostsService } from "../posts.service";
import { AuthService } from "../../auth/auth.service";
import { Route, Router } from "@angular/router";
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   { title: "First Post", content: "This is the first post's content" },
  //   { title: "Second Post", content: "This is the second post's content" },
  //   { title: "Third Post", content: "This is the third post's content" }
  // ];
  posts: Post[] = [];
  isLoading = false;
  userIsAuthenticated = false;
  postsSub!: Subscription;
  likeSub : Subscription
  authStatusSub:boolean
  commentToggle=false
  user=this.authService.getProfile()
  auther:string
  postId:string
  liked=false
  likedIcon='border'
  likecount : string
  constructor(public postsService: PostsService, private authService: AuthService,private router : Router) {
    
  }

  ngOnInit() {
    this.isLoading = true;
    this.userIsAuthenticated = this.authService.getIsAuth();

    this.postsService.getPosts();
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
        console.log(this.posts)
      });
      this.postsService.getPostLike();
      this.likeSub=this.postsService.getLikeUpdateListener()
      .subscribe((likes:any)=>{
        this.likecount=likes.length
        
        console.log('Likes : ',likes)
      })
      if(this.userIsAuthenticated===false){
        this.router.navigate(['login'])
      }
      
   
    }

  onCommentToggle(event : any,postId : string){
    if(!this.commentToggle){

      this.commentToggle=event
      this.postId = postId
    }else{
      this.commentToggle=false
    }
  }
  onDelete(postId: string) {
    this.isLoading = true;
    this.postsService.deletePost(postId);
  }
  likeToggle(postId:string){
    if(this.liked){
      this.liked=false;
      this.likedIcon='bi bi-heart'
      this.postsService.onPostDislike(postId,this.user.username)
    }else{
      this.liked=true;
      this.likedIcon='bi bi-heart-fill'
      this.postsService.onPostLike(postId,this.user.username)
    }  
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub=false
  }
}
