import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: 'UserManagement/register',pathMatch:'full'},
  {
    path: 'UserManagement',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:5001/remoteEntry.js',
        exposedModule: 'HomeModule',
      }).then((m) => m.HomeModule),
  },
  {
    path: 'ContentManagement',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:5002/remoteEntry.js',
        exposedModule: 'ContentHomepageModule',
      }).then((m) => m.ContentHomepageModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
