import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import {Comment} from './comment.model';
import { Subject, map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CommentsService {
    private comments: Comment[] = [];
    private commentsUpdated=new Subject<Comment[]> ;

constructor(private http:HttpClient, private router: Router){ }

getPostComment(postId:string) {
    this.http
      .get<{comment: any; message: string; }>("http://localhost:3000/api/comment/"+postId)
      .pipe(
        map(postcommentData => {
        return postcommentData.comment
        .map((comments:{userId : any,username:any,comment:any,_id:any})=>{
          return {
            userId : comments.userId,
            username : comments.username,
            comment: comments.comment,
            id: comments._id,
          };
        });
      }))
      .subscribe(postcommentData => {
        // console.log('transformed Commments',postcommentData)
        this.comments= postcommentData;
        this.commentsUpdated.next([...postcommentData]);
        // console.log('commentsUpdated',this.commentsUpdated)
        // return this.comments
      });
  }
  

getCommentUpdateListener() {
    return this.commentsUpdated.asObservable()
  }

addPostcomment(username:string,comment:string,postId){
    const postcomment: Comment = {
        id: null, postId:postId,comment:comment, username: username}
      // console.log(postcomment)
    this.http
    .post<{ userId: string;
        message: string, commentId: string }>("http://localhost:3000/api/posts/comment", postcomment)
    .subscribe(responseData => {
      const id = responseData.commentId;
      
      postcomment.id = id;
      this.comments.push(postcomment);
      this.commentsUpdated.next([...this.comments]);
      this.router.navigate(["/"]);
  });
}

deletePostcomment(commentId: string) {
    this.http.delete("http://localhost:3000/api" + commentId)
      .subscribe(() => {
        const commentsUpdated = this.comments.filter(postcomment => postcomment.id  !== commentId);
        this.comments = commentsUpdated;
        this.commentsUpdated.next([...this.comments]);
        console.log(this.comments)
      });
  }

}