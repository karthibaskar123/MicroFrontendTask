import { Component } from '@angular/core';
import { UserService } from '../../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.css'
})
export class UserlistComponent {
  users: any[] = [];

  constructor(private userService: UserService,private router:Router) { }

  ngOnInit(): void {
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users;
      }, error => {
        console.error('Error fetching users:', error);
      });
  }
  Gotopost()
  {
    this.router.navigate(['/ContentManagement/posts'])
  }

}
