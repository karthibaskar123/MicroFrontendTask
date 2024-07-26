import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PostComponent } from './post/post.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { CreatePostComponent } from './create-post/create-post.component';

const routes: Routes = [
  { path: 'login', component:LoginComponent },  
  { path: 'posts', component: PostComponent },
  { path: 'posts/:id', component: PostDetailComponent },
  { path: 'create-post', component: CreatePostComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentHomepageRoutingModule { }
