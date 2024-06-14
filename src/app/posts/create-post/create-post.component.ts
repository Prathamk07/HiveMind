import { Component, OnInit } from "@angular/core";
import { NgForm ,FormGroup, Validator, FormControl, Validators} from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { AuthService } from "../../auth/auth.service";
import { PostsService } from "../posts.service";
import { Post } from "../post.model";
import { Title } from "@angular/platform-browser";
import { mimeType } from "./mime-type.validator"; 

@Component({
  selector: "app-post-create",
  templateUrl: "./create-post.component.html",
  styleUrls: ["./create-post.component.css"]
})
export class CreatePostComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private mode = "create";
  private postId: string;
   post : Post;

  user:any
  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute,
    public authService:AuthService,
    public router : Router
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      content : new FormControl(),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
    
    }),
      
      
    });
  
        
    if(!this.authService.getIsAuth()){
      this.router.navigate(['/login'])
    }
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.get('postId')){
        this.mode = "edit";
        this.postId = paramMap.get('postId');

       // console.log('params',paramMap.get("id"))
        this.isLoading = true;

        this.post = (this.postsService.getPost(this.postId))
        this.isLoading = false;
        this.form.setValue({
          // title: this.post.title,
          content: this.post.content,
          image: this.post.imagePath
        })
      } else {
        this.mode = "create";
        console.log('create')
        this.postId = null;
      }
    });
  }

  getProfile(){
    this.user=this.authService.getProfile()
    console.log(this.user.userId)
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
     this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
      this.isLoading = true;
      this.getProfile()
      if (this.mode === "create") {
        this.postsService.addPost(
          this.user.username,
          // this.form.value.title, 
          this.form.value.content,
          this.form.value.image,
          '0',
        );
        console.log(this.user.userId)
      } else {
        console.log(this.form.value.content),
        this.postsService.updatePost(
          this.postId,
          // this.form.value.title,
          this.user.username,
          this.form.value.content,
          this.form.value.image,
          '0'
          // '0'
        );
      }
      this.form.reset();
    }

  }

