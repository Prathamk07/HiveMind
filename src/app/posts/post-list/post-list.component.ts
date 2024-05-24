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
  authStatusSub:boolean

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
      if(this.userIsAuthenticated===false){
        this.router.navigate(['login'])
      }
      
   
    }

  
  onDelete(postId: string) {
    this.isLoading = true;
    this.postsService.deletePost(postId);
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub=false
  }
}
