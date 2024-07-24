import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../service/post.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: any;
  comments: any[] = [];
  newComment: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private authService: UserService
  ) {}

  ngOnInit(): void {
    const postId: string = this.route.snapshot.paramMap.get('id')!;
    this.postService.getPostById(postId).subscribe(
      post => {
        this.post = post;
        this.loadComments(postId);
      },
      error => {
        console.error('Error fetching post:', error);
        this.router.navigate(['/']);
      }
    );
  }

  loadComments(postId: string): void {
    this.postService.getCommentsForPost(postId).subscribe(
      comments => this.comments = comments,
      error => console.error('Error fetching comments:', error)
    );
  }

  addComment(): void {
    if (this.newComment.trim()) {
      const comment = {
        content: this.newComment,
        author: this.authService.getCurrentUser()
      };
      this.postService.addComment(this.post.id, comment).subscribe(
        newComment => { 
          console.log('Added comment:', newComment); // Debugging
          this.comments.push(newComment);
          this.newComment = '';
        },
        error => {
          console.error('Error adding comment:', error);
        }
      );
    }
  }

  deleteComment(commentId: number): void {
    console.log(commentId)
    this.postService.deleteComment(commentId).subscribe(
      () => {
        this.comments = this.comments.filter(c => c.id !== commentId);
        this.loadComments;
        console.log('Deleted comment ID:', commentId); // Debugging
      },
      error => {
        console.error('Error deleting comment:', error);
      }
    );
  }
  GoBack()
  {
    this.router.navigate(['/ContentManagement/posts'])
  }
}
