import { Injectable } from '@angular/core';
import { Subject, map} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private userposts : Post[]=[];
  userPostsUpdated=new Subject();
  likeId:string
  likes:any
  likesUpdated=new Subject();
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
    .get<{ message: string; posts: any }>("http://localhost:3000/api/posts/all")
    .pipe(
      map(postData => {
        return postData.posts.map((post: { title: any; username:any,caption: any; _id: any; imagePath:any,likes:any }) => {
          return {
            // title: post.title,
            username : post.username,
            content: post.caption,
            id: post._id,
            imagePath: post.imagePath,
            likes:post.likes
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
    getUserPosts(username:string){
        this.http.get<{message : string, posts:any}>("http://localhost:3000/api/posts/userposts/"+username)
        .pipe(
          map(postData=>{

            return postData.posts.map((post: { title: any; username:any,caption: any; _id: any; imagePath:any,likes:any }) => {
              return {
                // title: post.title,
                username : post.username,
                content: post.caption,
                id: post._id,
                imagePath: post.imagePath,
                likes:post.likes
              };
            });
          }
          )
        )
        .subscribe(data=>{
          console.log(data)
          this.userposts=data
          this.userPostsUpdated.next([...data])

       }

        )
    }

    getUserPostsUpdateListener(){
      return this.userPostsUpdated.asObservable();
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
  getLikeUpdateListener() {
    return this.likesUpdated.asObservable();
  }

  updatePost(id: string, username:string, content: string, image: File | string,likes:string) {
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
        postData = {
          id: id,
          // title: title,
          username : username,
          content: content,
          imagePath: image,
          likes : likes
          };
          }
          console.log(postData)
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
          imagePath: "response.imagePath",
          likes : likes
          };
          updatedPosts[oldPostIndex] = post;
          this.posts = updatedPosts;
          this.postsUpdated.next([...this.posts]);
          this.router.navigate(["/"]);
          });
          }
          
          
          addPost(username:string,content: string, image: File,likes:string) {
            const postData = new FormData();
            // postData.append("title", title);
            postData.append("username",username);
            postData.append("content", content);
            postData.append("image", image);
            postData.append("likes",likes)
            console.log('postdata :',postData)
            this.http
            .post<{
              username: string;
              post: Post; message: string}>(
                "http://localhost:3000/api/posts",
                postData
                )
                .subscribe(responseData => {
                  console.log(responseData)
                  const post: Post ={
                    
                    id: responseData.post.id,
                    // title: title,
                    username : username,
                    content: content,
                    imagePath: responseData.post.imagePath,
                    likes:responseData.post.likes
                    };
                    // console.log(post)
                    this.posts.push(post);
                    this.postsUpdated.next([...this.posts]);
                    this.router.navigate(["/"]);
                    });
                    }
                    onPostLike(postId:string,username:string){
                      console.log('liked by :',username,postId)
                      const likeData={postId:postId, username:username}
                      this.http.post<{message:string,likedby:any}>("http://localhost:3000/api/like/" + postId, likeData)
                      // .pipe(
                        //   map(responseData=>{
                          //     return responseData.likedby.map((likes:{postId:any , _id:any, likedby:any })=>{
                            //       return {
                              //         postId : likes.postId,
    //         likeId : likes._id,
    //         likedBy : likes.likedby,
    //       }
    //     })
    //   })
    // )
    .subscribe(data=>{
      this.likeId=data.likedby._id
      this.likesUpdated.next([...this.likeId]);

      // console.log(data.likedby._id)
      // this.likeId=responseData.response._id
    })
  } 
  getPostLike(){
    this.http.get<{message:string,likes:any}>("http://localhost:3000/api/like")
    .pipe(
      map(likesData => {
        return likesData.likes.map((likes: { postId: any; username:any,_id: any;}) => {
          return {
            // title: post.title,
            username : likes.username,
            // content: post.caption,
            id: likes._id,
            postId : likes.postId
            // imagePath: post.imagePath,
            // likes:post.likes
          };
        });
        })
        )
          .subscribe(data=>{
            this.likes=data
            this.likesUpdated.next([...data])
            // console.log('likes',this.likesUpdated)
          })
  }

  onPostDislike(postId:string,userId:string){
    // console.log(this.likeId)
    // console.log('unliked by:', userId,postId)
    this.http.delete("http://localhost:3000/api/like/"+this.likeId)
    
  }
}


