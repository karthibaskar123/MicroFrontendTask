import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../service/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {

  postForm: FormGroup;

  constructor(private fb: FormBuilder, private postService: PostService,private router:Router) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  createPost(): void {
    if (this.postForm.valid) {
      const post = {
        ...this.postForm.value,
        author: 'currentUser' // Replace 'currentUser' with actual user
      };
      this.postService.createPost(post).subscribe(() => {
        alert('Post created successfully!');
        this.router.navigate(['/ContentManagement/posts'])
        this.postForm.reset();
      });
    }
  }
  GoBack()
  {
    this.router.navigate(['/ContentManagement/posts'])
  }
}
