import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { UserService } from '../../service/user.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('UserService', ['login']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, HttpClientModule],
      providers: [
        FormBuilder,
        { provide: UserService, useValue: mockUserService },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login on UserService and navigate on successful login', () => {
    const username = 'testuser';
    component.loginForm.controls['username'].setValue(username);
    mockUserService.login.and.returnValue(of(true)); 

    component.login();

    expect(mockUserService.login).toHaveBeenCalledWith(username);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/UserManagement/userlist']);
  });

  it('should show alert on login failure', () => {
    const username = 'testuser';
    component.loginForm.controls['username'].setValue(username);
    mockUserService.login.and.returnValue(of(false));

    spyOn(window, 'alert'); 

    component.login();

    expect(mockUserService.login).toHaveBeenCalledWith(username);
    expect(window.alert).toHaveBeenCalledWith('Login failed. User not found.');
  });

  it('should handle error from UserService and show alert', () => {
    const username = 'testuser';
    component.loginForm.controls['username'].setValue(username);
    mockUserService.login.and.returnValue(throwError(() => new Error('Network error'))); 

    spyOn(window, 'alert');

    component.login();

    expect(mockUserService.login).toHaveBeenCalledWith(username);
    expect(window.alert).toHaveBeenCalledWith('Login failed!');
  });
});
