import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentHomepageRoutingModule } from './contenthomepage-routing.module';
import { LoginComponent } from './login/login.component';
import { PostComponent } from './post/post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ LoginComponent, PostComponent, PostDetailComponent, CreatePostComponent],
  imports: [
    CommonModule,
    ContentHomepageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ]
})
export class ContentHomepageModule { }
