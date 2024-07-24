import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './contenthomepage/post/post.component';
import { LoginComponent } from './contenthomepage/login/login.component';

const routes: Routes = [

  // { path: '', component:PostComponent },
  {path:'', loadChildren: () => import('./contenthomepage/contenthomepage.module').then(m => m.ContentHomepageModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
