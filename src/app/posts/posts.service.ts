import { Injectable } from '@angular/core';
import { Subject, map} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  constructor(private http:HttpClient, private router: Router){ }

  deletePost(postId: string) {
    this.http.delete("http://localhost:3000/api/posts/" + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPosts() {
    this.http
    .get<{ message: string; posts: any }>("http://localhost:3000/api/posts")
    .pipe(
      map(postData => {
        return postData.posts.map((post: { title: any; username:any,caption: any; _id: any; imagePath:any }) => {
          return {
            // title: post.title,
            username : post.username,
            content: post.caption,
            id: post._id,
            imagePath: post.imagePath
          };
        });
      })
    )
    .subscribe(transformedPosts => {
      this.posts = transformedPosts;
      this.postsUpdated.next([...this.posts]);
    });
}

getPost(id: string) {
  return { ...this.posts.find(p => p.id === id) };
}

/*getPost(id: string) {
  return this.http.get<{
    _id: string;
    title: string;
    content: string;
    imagePath: string;
  }>("http://localhost:3000/api/posts/" + id);
}*/

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  updatePost(id: string, username:string, content: string, image: File | string) {
    let postData: Post | FormData;
    console.log('userid',username)
    if (typeof(image) === 'object') {
      postData = new FormData();
      postData.append("id", id);
      postData.append("username",username)
      // postData.append("title", title);
      postData.append("content", content);
      postData.append("image", image);
    }else{
      const postData : Post = {
        id: id,
        // title: title,
        username : username,
        content: content,
        imagePath: image
      };
    }
    this.http
      .put("http://localhost:3000/api/posts/" + id, postData)
      .subscribe(response => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === id);
        const post: Post ={
          id: id,
          // title: title,
          username:username,
          content: content,
          imagePath: "response.imagePath"
        };
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }


  addPost(username:string,content: string, image: File) {
    const postData = new FormData();
    // postData.append("title", title);
    postData.append("username",username);
    postData.append("content", content);
    postData.append("image", image);
    console.log('postdata :',postData)
    this.http
      .post<{
        username: string;
        post: Post; message: string}>(
        "http://localhost:3000/api/posts",
         postData
        )
      .subscribe(responseData => {
        const post: Post ={
          id: responseData.post.id,
          // title: title,
          username : username,
          content: content,
          imagePath: responseData.post.imagePath
        };
        console.log(post)
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }
}


