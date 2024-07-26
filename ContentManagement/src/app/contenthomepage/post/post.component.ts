import { Component, OnInit } from '@angular/core';
import { PostService } from '../../service/post.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  posts: any[] = [];

  constructor(private postService: PostService,private router:Router) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }
  Gotopost()
  {
    this.router.navigate(['/UserManagement/userlist'])
  }
}
