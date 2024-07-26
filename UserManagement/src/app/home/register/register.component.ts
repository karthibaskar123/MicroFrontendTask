import { Component } from '@angular/core';
import { UserService } from '../../user/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  register(): void {
    if (this.registrationForm.valid) {
      const { username, password } = this.registrationForm.value;
      this.userService.checkUserExists(username).subscribe(exists => {
        if (exists) {
          alert('User is already registered!');
          this.router.navigate(['/ContentManagement/login']); 
        } else {
          this.userService.register(username, password)
            .subscribe(() => {
              alert('Registration successful!');
              this.router.navigate(['/ContentManagement/login']);             
              this.registrationForm.reset({ username: '', password: '' });
            }, error => {
              alert('Registration failed!');
              console.error(error);
            });
        }
      });
    }
  }
}
