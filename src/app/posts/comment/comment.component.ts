import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommentsService } from './comments.service';
import { PostsService } from "../posts.service";
import { Post } from '../post.model';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Comment } from './comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {

  
  constructor(public commentsService: CommentsService,public authService:AuthService,public router : Router){}
  @Output() toggleCommentEvent = new EventEmitter<boolean>();
  onToggleComment(){
    this.toggleCommentEvent.emit(false)
  }
  @Input() post : any;
  enteredComment = "";
  private mode = "create";
  private commentId: string='';
  user=this.authService.getProfile()
  comments: Comment[]=[]
  private commentSub: Subscription;
  authStatusSub: boolean;
  userIsAuthenticated: boolean;


  ngOnInit(): void{
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.commentsService.getPostComment(this.post.id);
    this.commentSub = this.commentsService.getCommentUpdateListener()
    .subscribe((comments : Comment[])=>{
      // this.isLoading = false;
        this.comments = comments;
        console.log('comments :',this.comments)
    });
    if(this.userIsAuthenticated===false){
      this.router.navigate(['login'])
    }
    
  }

  PostComment(form: NgForm){
    if (form.invalid) {
      return;
    }
    this.commentsService.addPostcomment(this.user.username,form.value.comment,this.post.id);
    form.resetForm();
  }

  onClickDelete(commentId: string){
     this.commentsService.deletePostcomment(commentId);
   }

  ngOnDestroy(){
    this.commentSub.unsubscribe();
    this.authStatusSub=false

  }
}
