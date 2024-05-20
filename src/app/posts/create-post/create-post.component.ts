import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { PostsService } from "../posts.service";
import { Post } from "../post.model";

@Component({
  selector: "app-post-create",
  templateUrl: "./create-post.component.html",
  styleUrls: ["./create-post.component.css"]
})
export class CreatePostComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";

  post : Post;
  mode = "create";
  postId: string='';

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.get("id")!==null){
        this.mode = "edit";
        // console.log("edit")
        this.postId = paramMap.get('id')
        // console.log('params',paramMap.get("id"))
        
        this.post = (this.postsService.getPost(this.post.id))
      } else {
        this.mode = "create";
        console.log('create')
        this.postId = '';
      }
    });
  }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    else{

      if (this.mode === "create") {
        this.postsService.addPost(form.value.title, form.value.content);
        console.log('create mode')
      } else {
        console.log(this.postId),
        this.postsService.updatePost(
          this.postId,
          form.value.title,
          form.value.content
        );
      }
    }
    form.resetForm();
  }
}
