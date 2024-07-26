import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService,private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const  username  = this.loginForm.get('username')?.value;
      this.userService.login(username)
        .subscribe(users => {
          if (users) {            
            alert(`Hello, ${username}! Login successful!`);
            this.router.navigate(['/UserManagement/userlist']);
          } else {
            alert('Login failed. User not found.');
          }
        }, error => {
          alert('Login failed!');
          console.error(error);
        });
    }
  }
}
